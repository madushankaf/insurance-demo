
// In-memory storage for claims (mutable so newly submitted claims can be tracked)
map<ClaimStatusResponse> CLAIMS_STORE = {
    "CLM-5001": {
        claimId: "CLM-5001",
        policyNumber: "POL-9001",
        customerName: "John Doe",
        incidentType: "auto-accident",
        status: "Review",
        lastUpdated: "2026-03-06T10:30:00Z",
        timeline: [
            {stage: "Submitted", status: "completed"},
            {stage: "Review", status: "in-progress"},
            {stage: "Inspection", status: "pending"},
            {stage: "Settlement", status: "pending"}
        ]
    },
    "CLM-5002": {
        claimId: "CLM-5002",
        policyNumber: "POL-9002",
        customerName: "Jane Smith",
        incidentType: "property-damage",
        status: "Inspection",
        lastUpdated: "2026-03-05T14:20:00Z",
        timeline: [
            {stage: "Submitted", status: "completed"},
            {stage: "Review", status: "completed"},
            {stage: "Inspection", status: "in-progress"},
            {stage: "Settlement", status: "pending"}
        ]
    }
};

// Counter for generating unique claim IDs (demo only)
int claimIdCounter = 5003;

// Helper function to generate a mock claim ID
// TODO: Replace with actual ID generation from backend system
public function generateClaimId() returns string {
    claimIdCounter = claimIdCounter + 1;
    return string `CLM-${claimIdCounter}`;
}

// Helper function to build initial timeline for new claim
// TODO: Replace with actual workflow engine integration
public function buildInitialTimeline() returns TimelineStage[] {
    return [
        {stage: "Submitted", status: "completed"},
        {stage: "Review", status: "in-progress"},
        {stage: "Inspection", status: "pending"},
        {stage: "Settlement", status: "pending"}
    ];
}

// Helper function to get current timestamp in ISO format
// TODO: Replace with actual timestamp generation
public function getCurrentTimestamp() returns string {
    // For demo purposes, return a hardcoded timestamp
    // In production, use time:utcNow() and format appropriately
    return "2026-03-06T10:30:00Z";
}

// Helper function to validate claim submission request
public function validateClaimRequest(ClaimSubmissionRequest request) returns string? {
    if (request.policyNumber == "") {
        return "Policy number is required";
    }
    if (request.customerName == "") {
        return "Customer name is required";
    }
    if (request.incidentType == "") {
        return "Incident type is required";
    }
    if (request.incidentDate == "") {
        return "Incident date is required";
    }
    if (request.description == "") {
        return "Description is required";
    }
    if (request.location == "") {
        return "Location is required";
    }
    return ();
}

// Helper function to get claim by ID
// TODO: Replace with actual database query
public function getClaimById(string claimId) returns ClaimStatusResponse? {
    return CLAIMS_STORE[claimId];
}

// Store a new claim in memory so it can be retrieved later
public function storeClaim(ClaimStatusResponse claim) {
    CLAIMS_STORE[claim.claimId] = claim;
}
