import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white">SafeCover</span>
            </div>
            <p className="text-sm text-gray-400">
              Protecting what matters most to you.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Insurance</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/quote" className="hover:text-white transition-colors">Get a Quote</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Auto Insurance</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Home Insurance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Claims</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/claims/file" className="hover:text-white transition-colors">File a Claim</Link></li>
              <li><Link to="/claims/track" className="hover:text-white transition-colors">Track a Claim</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} SafeCover Insurance. All rights reserved.</p>
          <p className="mt-2">This is a demonstration application for API management purposes.</p>
        </div>
      </div>
    </footer>
  );
}
