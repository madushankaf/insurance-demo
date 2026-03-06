import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Protect your car, home, and future
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
            Get a personalized quote in minutes or manage your claims online. 
            Simple, fast, and designed to keep you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/quote" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg text-center">
              Get a Quote
            </Link>
            <Link to="/claims/file" className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors border-2 border-white text-center">
              File a Claim
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
