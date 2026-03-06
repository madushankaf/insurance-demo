import { useState } from 'react';
import { quoteApi, QuoteRequest, QuoteResponse } from '../api/quoteApi';

export default function QuotePage() {
  const [formData, setFormData] = useState<QuoteRequest>({
    firstName: '',
    lastName: '',
    age: 0,
    vehicleType: '',
    vehicleYear: new Date().getFullYear(),
    state: '',
    hasHomeInsurance: false,
    hasRentersInsurance: false,
  });

  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      const result = await quoteApi.generateQuote(formData);
      setQuote(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate quote');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const fillSampleData = () => {
    setFormData({
      firstName: 'John',
      lastName: 'Doe',
      age: 34,
      vehicleType: 'sedan',
      vehicleYear: 2022,
      state: 'CA',
      hasHomeInsurance: false,
      hasRentersInsurance: true,
    });
  };

  if (quote) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Quote is Ready!</h2>
            <p className="text-gray-600">Quote ID: {quote.quoteId}</p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Monthly Premium</p>
              <p className="text-5xl font-bold text-primary-600 mb-1">
                ${quote.monthlyPremium.toFixed(2)}
              </p>
              <p className="text-gray-600">per month in {quote.currency}</p>
            </div>
          </div>

          {quote.eligibleForBundle && quote.recommendedBundleProduct && (
            <div className="bg-accent-green-light border-2 border-accent-green rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">🎁</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Bundle Recommendation
                  </h3>
                  <p className="text-gray-700 mb-2">
                    You're eligible to bundle auto with <strong>{quote.recommendedBundleProduct}</strong> insurance!
                  </p>
                  {quote.estimatedBundleSavings && (
                    <p className="text-2xl font-bold text-accent-green">
                      Save ${quote.estimatedBundleSavings.toFixed(2)}/month
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Why this recommendation?</h3>
            <p className="text-gray-700">{quote.message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setQuote(null);
                setError(null);
              }}
              className="btn-outline flex-1"
            >
              Edit Details
            </button>
            <button
              onClick={() => {
                setQuote(null);
                setError(null);
                setFormData({
                  firstName: '',
                  lastName: '',
                  age: 0,
                  vehicleType: '',
                  vehicleYear: new Date().getFullYear(),
                  state: '',
                  hasHomeInsurance: false,
                  hasRentersInsurance: false,
                });
              }}
              className="btn-primary flex-1"
            >
              Get Another Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Auto Insurance Quote</h1>
        <p className="text-xl text-gray-600">Fill in your details below to get a personalized quote in minutes.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age || ''}
                onChange={handleChange}
                className="input-field"
                min="18"
                max="100"
                required
              />
            </div>
            <div>
              <label className="label">Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select vehicle type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="coupe">Coupe</option>
                <option value="hatchback">Hatchback</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">Vehicle Year</label>
              <input
                type="number"
                name="vehicleYear"
                value={formData.vehicleYear || ''}
                onChange={handleChange}
                className="input-field"
                min="1900"
                max="2030"
                required
              />
            </div>
            <div>
              <label className="label">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., CA, NY, TX"
                maxLength={2}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="label">Current Insurance Coverage</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasHomeInsurance"
                  checked={formData.hasHomeInsurance}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-gray-700">I currently have home insurance</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasRentersInsurance"
                  checked={formData.hasRentersInsurance}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-gray-700">I currently have renters insurance</span>
              </label>
            </div>
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
              {loading ? 'Generating Quote...' : 'Get My Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
