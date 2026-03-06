import ballerina/http;
import ballerina/log;

// Service port configuration
configurable int servicePort = 8080;

// HTTP service for Quote API
service /api/v1 on new http:Listener(servicePort) {
    
    resource function post quotes/auto(http:Request req) returns http:Response {
        // Parse request payload
        json|error payload = req.getJsonPayload();
        if (payload is error) {
            log:printError("Failed to parse request payload", payload);
            return createErrorResponse(400, "Invalid JSON payload", payload.message());
        }
        
        // Convert JSON to QuoteRequest record
        QuoteRequest|error quoteRequest = payload.fromJsonWithType();
        if (quoteRequest is error) {
            log:printError("Failed to deserialize request", quoteRequest);
            return createErrorResponse(400, "Invalid request structure", quoteRequest.message());
        }
        
        // Validate request
        string? validationError = validateQuoteRequest(quoteRequest);
        if (validationError is string) {
            log:printError("Validation failed", validationError = validationError);
            return createErrorResponse(400, "Validation failed", validationError);
        }
        
        // Calculate premium using hardcoded business logic
        // TODO: Replace with actual pricing engine call
        float premium = calculatePremium(quoteRequest);
        
        // Get bundle recommendation
        // TODO: Replace with actual bundle recommendation service call
        record {|
            boolean eligibleForBundle;
            string? recommendedBundleProduct;
            float? estimatedBundleSavings;
        |} bundleInfo = getBundleRecommendation(quoteRequest);
        
        // Generate quote ID
        // TODO: Replace with actual ID generation from backend
        string quoteId = generateQuoteId();
        
        // Build response message
        string message = buildMessage(bundleInfo.eligibleForBundle, bundleInfo.recommendedBundleProduct);
        
        // Build response
        QuoteResponse response = {
            quoteId: quoteId,
            product: "auto",
            monthlyPremium: premium,
            currency: "USD",
            eligibleForBundle: bundleInfo.eligibleForBundle,
            recommendedBundleProduct: bundleInfo.recommendedBundleProduct,
            estimatedBundleSavings: bundleInfo.estimatedBundleSavings,
            message: message
        };
        
        log:printInfo("Quote generated successfully", quoteId = quoteId, premium = premium);
        
        return createJsonResponse(200, response);
    }
}

// Helper function to create JSON response
function createJsonResponse(int statusCode, anydata body) returns http:Response {
    http:Response res = new;
    res.statusCode = statusCode;
    res.setJsonPayload(<json>body);
    return res;
}

// Helper function to create error response
function createErrorResponse(int statusCode, string errorMsg, string message) returns http:Response {
    http:Response res = new;
    res.statusCode = statusCode;
    map<string> errorBody = {
        "error": errorMsg,
        "message": message
    };
    res.setJsonPayload(<json>errorBody);
    return res;
}
