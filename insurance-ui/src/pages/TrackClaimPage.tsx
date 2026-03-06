import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { claimsApi, ClaimStatusResponse } from '../api/claimsApi';
import ClaimTimeline from '../components/ClaimTimeline';
import StatusBadge from '../components/StatusBadge';

export default function TrackClaimPage() {
  const [searchParams] = useSearchParams();
  const [claimId, setClaimId] = useState(searchParams.get('claimId') || '');
  const [loading, setLoading] = useState(false);
  const [claim, setClaim] = useState<ClaimStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialClaimId = searchParams.get('claimId');
    if (initialClaimId) {
      setClaimId(initialClaimId);
      handleFetch(initialClaimId);
    }
  }, [searchParams]);

  const handleFetch = async (id?: string) => {
    const idToFetch = id || claimId;
    if (!idToFetch.trim()) {
      setError('Please enter a claim ID');
      return;
    }

    setLoading(true);
    setError(null);
    setClaim(null);

    try {
      const result = await claimsApi.getClaimStatus(idToFetch);
      setClaim(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch claim status');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFetch();
  };

  const fillSampleClaimId = () => {
    setClaimId('CLM-5001');
  };

  if (claim) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Claim Details</h2>
              <p className="text-gray-600">Claim ID: {claim.claimId}</p>
            </div>
            <StatusBadge status={claim.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Policy Number</p>
              <p className="font-semibold text-gray-900">{claim.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Customer Name</p>
              <p className="font-semibold text-gray-900">{claim.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Incident Type</p>
              <p className="font-semibold text-gray-900 capitalize">{claim.incidentType.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Updated</p>
              <p className="font-semibold text-gray-900">
                {new Date(claim.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Claim Status Timeline</h3>
          <ClaimTimeline timeline={claim.timeline} currentStatus={claim.status} />
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              setClaim(null);
              setError(null);
              setClaimId('');
            }}
            className="btn-outline w-full sm:w-auto"
          >
            Track Another Claim
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Claim</h1>
        <p className="text-xl text-gray-600">Enter your claim ID to view the current status and timeline.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Claim ID</label>
            <input
              type="text"
              value={claimId}
              onChange={(e) => setClaimId(e.target.value)}
              className="input-field"
              placeholder="e.g., CLM-5001"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              You can find your claim ID in the confirmation email or receipt.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={fillSampleClaimId}
              className="btn-outline flex-1"
            >
              Use Sample Claim ID
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Fetching Claim...' : 'Track Claim'}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Demo Tip:</strong> Try using claim IDs <code className="bg-blue-100 px-2 py-1 rounded">CLM-5001</code> or <code className="bg-blue-100 px-2 py-1 rounded">CLM-5002</code> to see sample claim statuses.
          </p>
        </div>
      </div>
    </div>
  );
}
