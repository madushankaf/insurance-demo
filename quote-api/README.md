# Quote API

A Ballerina-based REST API for generating auto insurance quotes and bundle recommendations.

## Overview

This API provides a quote generation service for auto insurance with bundle recommendation capabilities. It's designed as a standalone, independently deployable service that can be published and managed through an API Management (APIM) platform.

## Use Case

**Customer Acquisition / Quote Journey**: This API supports the initial customer engagement phase where potential customers request insurance quotes. The bundle recommendation feature helps cross-sell additional insurance products, improving customer lifetime value.

## Prerequisites

- Ballerina installed (version 2201.8.0 or later)
- Terminal/Command prompt access

## Running the Service

1. Navigate to the `quote-api` directory:
   ```bash
   cd quote-api
   ```

2. Run the service:
   ```bash
   bal run
   ```

3. The service will start on port `8080` by default. You can configure a different port by setting the `servicePort` configurable value in `main.bal`.

## API Endpoints

### POST /api/v1/quotes/auto

Generates an auto insurance quote with bundle recommendations.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 34,
  "vehicleType": "sedan",
  "vehicleYear": 2022,
  "state": "CA",
  "hasHomeInsurance": false,
  "hasRentersInsurance": true
}
```

**Response (200 OK):**
```json
{
  "quoteId": "Q-1001",
  "product": "auto",
  "monthlyPremium": 145.50,
  "currency": "USD",
  "eligibleForBundle": true,
  "recommendedBundleProduct": "home",
  "estimatedBundleSavings": 18.75,
  "message": "Customer is eligible for bundling auto with home insurance."
}
```

**Error Responses:**
- `400 Bad Request`: Invalid payload or validation failure
- `404 Not Found`: Invalid endpoint

## Sample cURL Commands

### Generate a Quote

```bash
curl -X POST http://localhost:8080/api/v1/quotes/auto \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "age": 34,
    "vehicleType": "sedan",
    "vehicleYear": 2022,
    "state": "CA",
    "hasHomeInsurance": false,
    "hasRentersInsurance": true
  }'
```

### Generate a Quote (No Bundle Eligible)

```bash
curl -X POST http://localhost:8080/api/v1/quotes/auto \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "age": 45,
    "vehicleType": "sedan",
    "vehicleYear": 2023,
    "state": "NY",
    "hasHomeInsurance": true,
    "hasRentersInsurance": true
  }'
```

## Business Logic

The quote calculation uses the following hardcoded rules:

- **Base Premium**: $120.00
- **Age Adjustment**: +$20.00 if age < 25
- **Vehicle Year Adjustment**: +$15.00 if vehicle year < 2020
- **Vehicle Type Adjustment**: +$10.00 if vehicle type is "suv"

Bundle recommendations:
- If customer doesn't have home insurance → recommend "home" bundle (savings: $18.75)
- If customer has home insurance but not renters → recommend "renters" bundle (savings: $12.50)
- Otherwise → no bundle recommendation

## APIM Integration

This API is designed to be published through an API Management platform for:

1. **Rate Limiting**: Control quote request volumes
2. **Analytics**: Track quote generation metrics and conversion rates
3. **Security**: Add authentication/authorization layers
4. **Versioning**: Manage API versions as business rules evolve
5. **Transformation**: Modify requests/responses for different client needs
6. **Caching**: Cache quote calculations for similar requests

The standalone nature of this service allows it to be independently deployed, scaled, and managed through APIM without affecting other services.

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
   - Configure security policies (OAuth2, API Key, etc.) as needed
   - Set up rate limiting and throttling policies
   - Enable analytics for quote generation metrics
   - Configure caching if applicable

## Project Structure

```
quote-api/
├── Ballerina.toml    # Project configuration
├── main.bal          # HTTP service and routes
├── types.bal         # Request/response type definitions
├── helpers.bal       # Business logic and helper functions
├── openapi.yaml      # OpenAPI 3.0 specification for WSO2 APIM
└── README.md         # This file
```

## Notes

- All data is hardcoded in memory (no database)
- Quote IDs are generated using timestamp-based logic
- Business rules are clearly marked with TODO comments for future integration points
- The service is designed to be demo-friendly and easy to extend
