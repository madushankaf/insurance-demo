// Request and response types for the Claims API

// Request payload for claim submission
public type ClaimSubmissionRequest record {
    string policyNumber;
    string customerName;
    string incidentType;
    string incidentDate;
    string description;
    string location;
};

// Response payload for claim submission
public type ClaimSubmissionResponse record {
    string claimId;
    string status;
    string message;
    TimelineStage[] timeline;
};

// Response payload for claim retrieval
public type ClaimStatusResponse record {
    string claimId;
    string policyNumber;
    string customerName;
    string incidentType;
    string status;
    string lastUpdated;
    TimelineStage[] timeline;
};

// Timeline stage for claim status tracking
public type TimelineStage record {
    string stage;
    string status;
};
