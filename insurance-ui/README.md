# SafeCover Insurance UI

A modern, demo-friendly frontend application for an insurance API management demonstration. This React application integrates with two backend APIs (quote-api and claims-api) to provide a polished insurance customer experience.

## Overview

This frontend application demonstrates:
- **Quote Generation**: Get personalized auto insurance quotes with bundle recommendations
- **Claim Filing**: Submit insurance claims online
- **Claim Tracking**: Track claim status with real-time timeline updates

The UI is inspired by premium insurance websites with a clean, professional design that emphasizes trust and ease of use.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend services running:
  - `quote-api` on port 8080
  - `claims-api` on port 8081

## Installation

1. Navigate to the project directory:
   ```bash
   cd insurance-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env` file (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Configure API endpoints in `.env`:
   ```env
   VITE_QUOTE_API_BASE_URL=http://localhost:8080
   VITE_CLAIMS_API_BASE_URL=http://localhost:8081
   ```

## Running the Application

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Build the application:
```bash
npm run build
# or
yarn build
# or
pnpm build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

```
insurance-ui/
├── src/
│   ├── api/              # API integration layer
│   │   ├── quoteApi.ts   # Quote API client
│   │   └── claimsApi.ts # Claims API client
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SavingsCard.tsx
│   │   ├── QuickAccessCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── ClaimTimeline.tsx
│   │   └── Footer.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── QuotePage.tsx
│   │   ├── FileClaimPage.tsx
│   │   └── TrackClaimPage.tsx
│   ├── layouts/          # Layout components
│   │   └── MainLayout.tsx
│   ├── styles/           # Global styles
│   │   └── index.css
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── .env.example          # Example environment variables
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## API Integration

### Quote API

The frontend calls `POST /api/v1/quotes/auto` to generate quotes:

- **Endpoint**: Configured via `VITE_QUOTE_API_BASE_URL`
- **Request**: QuoteRequest (firstName, lastName, age, vehicleType, vehicleYear, state, hasHomeInsurance, hasRentersInsurance)
- **Response**: QuoteResponse (quoteId, monthlyPremium, bundle recommendations, etc.)

### Claims API

The frontend calls two endpoints:

1. **POST /api/v1/claims** - Submit a new claim
   - **Endpoint**: Configured via `VITE_CLAIMS_API_BASE_URL`
   - **Request**: ClaimSubmissionRequest (policyNumber, customerName, incidentType, etc.)
   - **Response**: ClaimSubmissionResponse (claimId, status, timeline)

2. **GET /api/v1/claims/{claimId}** - Track claim status
   - **Endpoint**: Configured via `VITE_CLAIMS_API_BASE_URL`
   - **Response**: ClaimStatusResponse (claim details, status, timeline)

## Demo Flow

### 1. Homepage
- Navigate to `http://localhost:3000`
- View the hero section and savings cards
- Click "Get a Quote" or "File a Claim" CTAs

### 2. Get a Quote
- Navigate to `/quote` or click "Get a Quote" button
- Fill in the quote form (or use "Fill Sample Data" for quick demo)
- Submit to generate a quote
- View the quote result with premium and bundle recommendations
- Option to edit details or get another quote

### 3. File a Claim
- Navigate to `/claims/file` or click "File a Claim" button
- Fill in the claim form (or use "Fill Sample Data" for quick demo)
- Submit the claim
- View the success message with claim ID and timeline
- Click "Track This Claim" to view claim status

### 4. Track a Claim
- Navigate to `/claims/track` or click "Track a Claim" button
- Enter a claim ID (e.g., `CLM-5001` or `CLM-5002` for demo)
- View claim details and status timeline
- See current stage highlighted in the timeline

## Sample Data

The application includes "Fill Sample Data" buttons on forms for quick demos:

**Quote Sample Data:**
- Name: John Doe
- Age: 34
- Vehicle: 2022 Sedan
- State: CA
- No home insurance, has renters insurance

**Claim Sample Data:**
- Policy: POL-9001
- Customer: John Doe
- Incident: Auto accident
- Location: Los Angeles, CA

**Demo Claim IDs:**
- `CLM-5001` - Auto accident claim in Review status
- `CLM-5002` - Property damage claim in Inspection status

## Design System

The application uses a custom design system inspired by premium insurance websites:

- **Primary Color**: Insurance-style blue (`primary-600`)
- **Accent Colors**: Green for savings/success highlights
- **Typography**: Inter font family
- **Components**: Rounded cards, soft shadows, spacious layouts
- **Responsive**: Mobile-friendly with desktop-first approach

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_QUOTE_API_BASE_URL` | Base URL for quote API | `http://localhost:8080` |
| `VITE_CLAIMS_API_BASE_URL` | Base URL for claims API | `http://localhost:8081` |

## Troubleshooting

### API Connection Issues

If you see "Network error" messages:

1. Verify backend services are running:
   ```bash
   # Check quote-api
   curl http://localhost:8080/api/v1/quotes/auto
   
   # Check claims-api
   curl http://localhost:8081/api/v1/claims/CLM-5001
   ```

2. Verify environment variables in `.env` file

3. Check browser console for CORS errors (if APIs are on different ports)

### Build Issues

If you encounter build errors:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Verify Node.js version (18+ required)

## Features

- ✅ Responsive design (mobile and desktop)
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling with friendly messages
- ✅ Sample data fillers for quick demos
- ✅ Timeline visualization for claim status
- ✅ Bundle recommendation highlights
- ✅ Clean, professional insurance-style UI

## License

This is a demonstration application for API management purposes.
