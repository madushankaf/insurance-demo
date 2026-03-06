import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SavingsCard from '../components/SavingsCard';
import QuickAccessCard from '../components/QuickAccessCard';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      
      {/* Savings Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why choose SafeCover?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SavingsCard
              icon="💰"
              title="Bundle and Save"
              description="Combine auto and home insurance to save up to $225 per year on your premiums."
              highlight="Save up to $225/year"
            />
            <SavingsCard
              icon="⚡"
              title="Fast Digital Claims"
              description="File and track claims online with our streamlined digital process. Get updates in real-time."
              highlight="24/7 Online"
            />
            <SavingsCard
              icon="🛡️"
              title="Multi-Policy Savings"
              description="Protect multiple assets and enjoy significant discounts when you bundle policies together."
              highlight="Up to 25% off"
            />
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Get started in minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAccessCard
              icon="📋"
              title="Get a Quote"
              description="Get a personalized auto insurance quote in just a few minutes."
              link="/quote"
              buttonText="Get Quote"
            />
            <QuickAccessCard
              icon="📝"
              title="File a Claim"
              description="Submit your claim online and track its progress in real-time."
              link="/claims/file"
              buttonText="File Claim"
            />
            <QuickAccessCard
              icon="🔍"
              title="Track a Claim"
              description="Check the status of your existing claim anytime, anywhere."
              link="/claims/track"
              buttonText="Track Claim"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to protect what matters most?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get a quote today and discover how much you could save.
          </p>
          <Link to="/quote" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg inline-block">
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
