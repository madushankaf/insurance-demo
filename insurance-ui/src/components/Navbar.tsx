import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SafeCover</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Insurance
            </Link>
            <Link to="/claims/file" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Claims
            </Link>
            <Link to="/claims/track" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Track Claim
            </Link>
            <Link to="/quote" className="btn-primary">
              Get a Quote
            </Link>
          </div>

          <div className="md:hidden">
            <Link to="/quote" className="btn-primary text-sm px-4 py-2">
              Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
