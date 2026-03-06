import axios from 'axios';

const BASE_URL = import.meta.env.VITE_QUOTE_API_BASE_URL || 'http://localhost:8080';

export interface QuoteRequest {
  firstName: string;
  lastName: string;
  age: number;
  vehicleType: string;
  vehicleYear: number;
  state: string;
  hasHomeInsurance: boolean;
  hasRentersInsurance: boolean;
}

export interface QuoteResponse {
  quoteId: string;
  product: string;
  monthlyPremium: number;
  currency: string;
  eligibleForBundle: boolean;
  recommendedBundleProduct?: string | null;
  estimatedBundleSavings?: number | null;
  message: string;
}

export interface ApiError {
  error: string;
  message: string;
}

export const quoteApi = {
  async generateQuote(request: QuoteRequest): Promise<QuoteResponse> {
    try {
      const response = await axios.post<QuoteResponse>(
        `${BASE_URL}/api/v1/quotes/auto`,
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
        throw new Error(error.response.data.message || 'Failed to generate quote');
      }
      throw new Error('Network error: Could not connect to quote service');
    }
  },
};
