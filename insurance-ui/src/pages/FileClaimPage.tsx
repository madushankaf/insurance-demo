import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { claimsApi, ClaimSubmissionRequest, ClaimSubmissionResponse } from '../api/claimsApi';
import ClaimTimeline from '../components/ClaimTimeline';

export default function FileClaimPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClaimSubmissionRequest>({
    policyNumber: '',
    customerName: '',
    incidentType: '',
    incidentDate: '',
    description: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [claim, setClaim] = useState<ClaimSubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setClaim(null);

    try {
      const result = await claimsApi.submitClaim(formData);
      setClaim(result);
    } catch (err: any) {
      setError(err.message || 'Failed to submit claim');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const fillSampleData = () => {
    setFormData({
      policyNumber: 'POL-9001',
      customerName: 'John Doe',
      incidentType: 'auto-accident',
      incidentDate: new Date().toISOString().split('T')[0],
      description: 'Minor rear-end collision in traffic.',
      location: 'Los Angeles, CA',
    });
  };

  if (claim) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Claim Submitted Successfully!</h2>
            <p className="text-gray-600 mb-4">{claim.message}</p>
            <div className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-lg font-semibold">
              Claim ID: {claim.claimId}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Claim Status Timeline</h3>
            <ClaimTimeline timeline={claim.timeline} currentStatus={claim.status} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate(`/claims/track?claimId=${claim.claimId}`)}
              className="btn-primary flex-1"
            >
              Track This Claim
            </button>
            <button
              onClick={() => {
                setClaim(null);
                setError(null);
                setFormData({
                  policyNumber: '',
                  customerName: '',
                  incidentType: '',
                  incidentDate: '',
                  description: '',
                  location: '',
                });
              }}
              className="btn-outline flex-1"
            >
              File Another Claim
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">File a Claim</h1>
        <p className="text-xl text-gray-600">Submit your claim online and track its progress in real-time.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Policy Number</label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                className="input-field"
                placeholder="POL-XXXX"
                required
              />
            </div>
            <div>
              <label className="label">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Incident Type</label>
              <select
                name="incidentType"
                value={formData.incidentType}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select incident type</option>
                <option value="auto-accident">Auto Accident</option>
                <option value="property-damage">Property Damage</option>
                <option value="theft">Theft</option>
                <option value="vandalism">Vandalism</option>
                <option value="weather-damage">Weather Damage</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Incident Date</label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="City, State"
              required
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              rows={4}
              placeholder="Please provide a detailed description of the incident..."
              required
            />
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
              onClick={fillSampleData}
              className="btn-outline flex-1"
            >
              Fill Sample Data
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting Claim...' : 'Submit Claim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
