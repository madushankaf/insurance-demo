// Request and response types for the Quote API

// Request payload for quote submission
public type QuoteRequest record {
    string firstName;
    string lastName;
    int age;
    string vehicleType;
    int vehicleYear;
    string state;
    boolean hasHomeInsurance;
    boolean hasRentersInsurance;
};

// Response payload for quote
public type QuoteResponse record {
    string quoteId;
    string product;
    float monthlyPremium;
    string currency;
    boolean eligibleForBundle;
    string? recommendedBundleProduct;
    float? estimatedBundleSavings;
    string message;
};

// Timeline stage for bundle recommendation
public type TimelineStage record {
    string stage;
    string status;
};
