interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('completed') || lowerStatus === 'submitted') {
      return 'bg-green-100 text-green-800';
    }
    if (lowerStatus.includes('progress') || lowerStatus === 'review' || lowerStatus === 'inspection') {
      return 'bg-blue-100 text-blue-800';
    }
    if (lowerStatus === 'pending') {
      return 'bg-gray-100 text-gray-800';
    }
    return 'bg-primary-100 text-primary-800';
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}
