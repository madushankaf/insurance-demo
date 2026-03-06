import { Link } from 'react-router-dom';

interface QuickAccessCardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
  buttonText: string;
}

export default function QuickAccessCard({ title, description, link, icon, buttonText }: QuickAccessCardProps) {
  return (
    <div className="card hover:shadow-xl transition-shadow">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <Link to={link} className="btn-primary inline-block">
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
