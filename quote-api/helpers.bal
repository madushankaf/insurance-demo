
// Helper function to calculate base premium with hardcoded rules
// TODO: Replace with actual pricing engine integration
public function calculatePremium(QuoteRequest request) returns float {
    float premium = 120.0; // Base premium
    
    // Age-based adjustment
    if (request.age < 25) {
        premium = premium + 20.0;
    }
    
    // Vehicle year adjustment
    if (request.vehicleYear < 2020) {
        premium = premium + 15.0;
    }
    
    // Vehicle type adjustment
    if (request.vehicleType == "suv") {
        premium = premium + 10.0;
    }
    
    return premium;
}

// Helper function to determine bundle recommendation
// TODO: Replace with actual bundle recommendation engine
public function getBundleRecommendation(QuoteRequest request) returns record {|
    boolean eligibleForBundle;
    string? recommendedBundleProduct;
    float? estimatedBundleSavings;
|} {
    boolean eligible = false;
    string? bundleProduct = ();
    float? savings = ();
    
    if (!request.hasHomeInsurance) {
        eligible = true;
        bundleProduct = "home";
        savings = 18.75;
    } else if (!request.hasRentersInsurance) {
        eligible = true;
        bundleProduct = "renters";
        savings = 12.50;
    }
    
    return {
        eligibleForBundle: eligible,
        recommendedBundleProduct: bundleProduct,
        estimatedBundleSavings: savings
    };
}

// Counter for generating unique quote IDs (demo only)
int quoteIdCounter = 1001;

// Helper function to generate a mock quote ID
// TODO: Replace with actual ID generation from backend system
public function generateQuoteId() returns string {
    quoteIdCounter = quoteIdCounter + 1;
    return string `Q-${quoteIdCounter}`;
}

// Helper function to build response message
public function buildMessage(boolean eligibleForBundle, string? bundleProduct) returns string {
    if (eligibleForBundle && bundleProduct is string) {
        return "Customer is eligible for bundling auto with " + bundleProduct + " insurance.";
    }
    return "Quote generated successfully.";
}

// Helper function to validate quote request
public function validateQuoteRequest(QuoteRequest request) returns string? {
    if (request.firstName == "" || request.lastName == "") {
        return "First name and last name are required";
    }
    if (request.age < 18 || request.age > 100) {
        return "Age must be between 18 and 100";
    }
    if (request.vehicleYear < 1900 || request.vehicleYear > 2030) {
        return "Vehicle year must be between 1900 and 2030";
    }
    if (request.vehicleType == "") {
        return "Vehicle type is required";
    }
    if (request.state == "") {
        return "State is required";
    }
    return ();
}
