import ballerina/http;
import ballerina/log;
import ballerina/lang.value;

// Service port configuration
configurable int servicePort = 8081;

// HTTP service for Claims API
service / on new http:Listener(servicePort) {
    
    resource function post claims(http:Request req) returns http:Response {
        // Parse request payload
        json|error payload = req.getJsonPayload();
        if (payload is error) {
            log:printError("Failed to parse request payload", payload);
            return createErrorResponse(400, "Invalid JSON payload", payload.message());
        }
        
        // Convert JSON to ClaimSubmissionRequest record
        ClaimSubmissionRequest|error claimRequest = payload.fromJsonWithType();
        if (claimRequest is error) {
            log:printError("Failed to deserialize request", claimRequest);
            return createErrorResponse(400, "Invalid request structure", claimRequest.message());
        }
        
        // Validate request
        string? validationError = validateClaimRequest(claimRequest);
        if (validationError is string) {
            log:printError("Validation failed", validationError = validationError);
            return createErrorResponse(400, "Validation failed", validationError);
        }
        
        // Generate claim ID
        // TODO: Replace with actual ID generation from backend
        string claimId = generateClaimId();
        
        // Build initial timeline
        // TODO: Replace with actual workflow engine call
        TimelineStage[] timeline = buildInitialTimeline();
        
        // Build submission response
        ClaimSubmissionResponse response = {
            claimId: claimId,
            status: "Submitted",
            message: "Claim submitted successfully.",
            timeline: timeline
        };

        // Persist the claim in memory so it can be retrieved via GET /claims/{claimId}
        ClaimStatusResponse claimRecord = {
            claimId: claimId,
            policyNumber: claimRequest.policyNumber,
            customerName: claimRequest.customerName,
            incidentType: claimRequest.incidentType,
            status: "Submitted",
            lastUpdated: getCurrentTimestamp(),
            timeline: timeline
        };
        storeClaim(claimRecord);
        
        log:printInfo("Claim submitted successfully", claimId = claimId, policyNumber = claimRequest.policyNumber);
        
        return createJsonResponse(201, response);
    }
    
    resource function get claims/[string claimId](http:Request req) returns http:Response {
        // Retrieve claim by ID
        // TODO: Replace with actual database query
        ClaimStatusResponse? claim = getClaimById(claimId);
        
        if (claim is ClaimStatusResponse) {
            log:printInfo("Claim retrieved successfully", claimId = claimId);
            return createJsonResponse(200, claim);
        } else {
            log:printWarn("Claim not found", claimId = claimId);
            return createErrorResponse(404, "Claim not found", "No claim found with ID: " + claimId);
        }
    }
}

// Helper function to create JSON response
function createJsonResponse(int statusCode, anydata body) returns http:Response {
    http:Response res = new;
    res.statusCode = statusCode;
    json|error jsonPayload = value:toJson(body);
    if (jsonPayload is error) {
        log:printError("Failed to convert response to JSON", jsonPayload);
        res.statusCode = 500;
        res.setJsonPayload({
            "error": "Internal server error",
            "message": "Failed to serialize response"
        });
    } else {
        res.setJsonPayload(jsonPayload);
    }
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
