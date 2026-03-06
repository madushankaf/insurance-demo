interface SavingsCardProps {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export default function SavingsCard({ title, description, icon, highlight }: SavingsCardProps) {
  return (
    <div className="card hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          {highlight && (
            <div className="inline-block bg-accent-green-light text-accent-green px-3 py-1 rounded-full text-sm font-semibold">
              {highlight}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
