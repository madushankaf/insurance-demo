import { TimelineStage } from '../api/claimsApi';
import StatusBadge from './StatusBadge';

interface ClaimTimelineProps {
  timeline: TimelineStage[];
  currentStatus?: string;
}

export default function ClaimTimeline({ timeline, currentStatus }: ClaimTimelineProps) {
  const getStageStatus = (stage: TimelineStage) => {
    if (stage.status === 'completed') {
      return 'completed';
    }
    if (stage.status === 'in-progress') {
      return 'active';
    }
    return 'pending';
  };

  return (
    <div className="space-y-4">
      {timeline.map((stage, index) => {
        const status = getStageStatus(stage);
        const isLast = index === timeline.length - 1;
        
        return (
          <div key={index} className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  status === 'completed'
                    ? 'bg-green-500 text-white'
                    : status === 'active'
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {status === 'completed' ? '✓' : index + 1}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 h-16 mt-2 ${
                    status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center space-x-3 mb-1">
                <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                <StatusBadge status={stage.status} />
              </div>
              {currentStatus && stage.stage === currentStatus && (
                <p className="text-sm text-gray-600 mt-1">Current stage</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
