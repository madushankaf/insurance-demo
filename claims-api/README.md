# Claims API

A Ballerina-based REST API for filing insurance claims and tracking claim status.

## Overview

This API provides claim submission and status tracking services for insurance customers. It's designed as a standalone, independently deployable service that can be published and managed through an API Management (APIM) platform.

## Use Case

**Customer Self-Service / Claim Journey**: This API supports the post-purchase customer experience where existing policyholders file claims and track their status. This enables self-service capabilities, reducing call center load and improving customer satisfaction through real-time status updates.

## Prerequisites

- Ballerina installed (version 2201.8.0 or later)
- Terminal/Command prompt access

## Running the Service

1. Navigate to the `claims-api` directory:
   ```bash
   cd claims-api
   ```

2. Run the service:
   ```bash
   bal run
   ```

3. The service will start on port `8081` by default. You can configure a different port by setting the `servicePort` configurable value in `main.bal`.

## API Endpoints

### POST /api/v1/claims

Submits a new insurance claim and returns a claim reference with status timeline.

**Request Body:**
```json
{
  "policyNumber": "POL-9001",
  "customerName": "John Doe",
  "incidentType": "auto-accident",
  "incidentDate": "2026-03-01",
  "description": "Minor rear-end collision in traffic.",
  "location": "Los Angeles, CA"
}
```

**Response (201 Created):**
```json
{
  "claimId": "CLM-5001",
  "status": "Submitted",
  "message": "Claim submitted successfully.",
  "timeline": [
    {
      "stage": "Submitted",
      "status": "completed"
    },
    {
      "stage": "Review",
      "status": "in-progress"
    },
    {
      "stage": "Inspection",
      "status": "pending"
    },
    {
      "stage": "Settlement",
      "status": "pending"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid payload or validation failure

### GET /api/v1/claims/{claimId}

Retrieves the current status and timeline for a specific claim.

**Response (200 OK):**
```json
{
  "claimId": "CLM-5001",
  "policyNumber": "POL-9001",
  "customerName": "John Doe",
  "incidentType": "auto-accident",
  "status": "Review",
  "lastUpdated": "2026-03-06T10:30:00Z",
  "timeline": [
    {
      "stage": "Submitted",
      "status": "completed"
    },
    {
      "stage": "Review",
      "status": "in-progress"
    },
    {
      "stage": "Inspection",
      "status": "pending"
    },
    {
      "stage": "Settlement",
      "status": "pending"
    }
  ]
}
```

**Error Responses:**
- `404 Not Found`: Claim ID does not exist

## Sample cURL Commands

### Submit a New Claim

```bash
curl -X POST http://localhost:8081/api/v1/claims \
  -H "Content-Type: application/json" \
  -d '{
    "policyNumber": "POL-9001",
    "customerName": "John Doe",
    "incidentType": "auto-accident",
    "incidentDate": "2026-03-01",
    "description": "Minor rear-end collision in traffic.",
    "location": "Los Angeles, CA"
  }'
```

### Retrieve Claim Status

```bash
curl -X GET http://localhost:8081/api/v1/claims/CLM-5001
```

### Retrieve Another Claim Status

```bash
curl -X GET http://localhost:8081/api/v1/claims/CLM-5002
```

## Hardcoded Claims for Demo

The following claim IDs are available for GET requests:

- **CLM-5001**: Auto accident claim in "Review" status
- **CLM-5002**: Property damage claim in "Inspection" status

## Claim Status Timeline

Claims progress through the following stages:

1. **Submitted**: Initial claim submission (status: completed)
2. **Review**: Claim under review by adjuster (status: in-progress/pending)
3. **Inspection**: Physical inspection scheduled/completed (status: in-progress/pending)
4. **Settlement**: Final settlement and payment (status: pending)

## APIM Integration

This API is designed to be published through an API Management platform for:

1. **Authentication**: Secure access to customer claim data
2. **Rate Limiting**: Prevent abuse and ensure fair resource usage
3. **Analytics**: Track claim submission patterns and processing times
4. **Versioning**: Manage API versions as claim workflows evolve
5. **Transformation**: Adapt responses for different client applications (web, mobile, partner systems)
6. **Caching**: Cache claim status for frequently accessed claims
7. **Webhooks**: Notify external systems when claim status changes

The standalone nature of this service allows it to be independently deployed, scaled, and managed through APIM without affecting other services like quote generation.

## OpenAPI Specification

An OpenAPI 3.0 specification is available at `openapi.yaml` for importing into WSO2 API Manager.

### Importing to WSO2 APIM

1. **Via Publisher Portal:**
   - Log into WSO2 API Manager Publisher Portal
   - Navigate to "APIs" → "Create New API" → "Import OpenAPI"
   - Upload or paste the contents of `openapi.yaml`
   - Configure API settings (endpoint, security, throttling, etc.)
   - Publish the API

2. **Via REST API:**
   ```bash
   curl -X POST "https://<apim-host>:9443/api/am/publisher/v4/apis/import-openapi" \
     -H "Authorization: Bearer <access-token>" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@openapi.yaml"
   ```

3. **Configuration Notes:**
   - Update the `servers` section in `openapi.yaml` with your actual backend endpoint
   - Configure authentication/authorization (OAuth2 recommended for claim data)
   - Set up rate limiting to prevent abuse
   - Enable analytics for claim submission and status tracking metrics
   - Configure caching for frequently accessed claim statuses
   - Set up webhook subscriptions for claim status change notifications (if needed)

## Project Structure

```
claims-api/
├── Ballerina.toml    # Project configuration
├── main.bal          # HTTP service and routes
├── types.bal         # Request/response type definitions
├── helpers.bal       # Business logic and helper functions
├── openapi.yaml      # OpenAPI 3.0 specification for WSO2 APIM
└── README.md         # This file
```

## Notes

- All data is hardcoded in memory (no database)
- Claim IDs are generated using timestamp-based logic
- Two sample claims (CLM-5001 and CLM-5002) are pre-loaded for demo purposes
- Business logic is clearly marked with TODO comments for future integration points
- The service is designed to be demo-friendly and easy to extend
