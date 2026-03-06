import axios from 'axios';

const BASE_URL = import.meta.env.VITE_CLAIMS_API_BASE_URL || 'http://localhost:8081';

export interface ClaimSubmissionRequest {
  policyNumber: string;
  customerName: string;
  incidentType: string;
  incidentDate: string;
  description: string;
  location: string;
}

export interface TimelineStage {
  stage: string;
  status: string;
}

export interface ClaimSubmissionResponse {
  claimId: string;
  status: string;
  message: string;
  timeline: TimelineStage[];
}

export interface ClaimStatusResponse {
  claimId: string;
  policyNumber: string;
  customerName: string;
  incidentType: string;
  status: string;
  lastUpdated: string;
  timeline: TimelineStage[];
}

export interface ApiError {
  error: string;
  message: string;
}

export const claimsApi = {
  async submitClaim(request: ClaimSubmissionRequest): Promise<ClaimSubmissionResponse> {
    try {
      const response = await axios.post<ClaimSubmissionResponse>(
        `${BASE_URL}/api/v1/claims`,
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data.message || 'Failed to submit claim');
      }
      throw new Error('Network error: Could not connect to claims service');
    }
  },

  async getClaimStatus(claimId: string): Promise<ClaimStatusResponse> {
    try {
      const response = await axios.get<ClaimStatusResponse>(
        `${BASE_URL}/api/v1/claims/${claimId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Claim not found');
      }
      if (error.response?.data) {
        throw new Error(error.response.data.message || 'Failed to fetch claim status');
      }
      throw new Error('Network error: Could not connect to claims service');
    }
  },
};
