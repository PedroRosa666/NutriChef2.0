import { useFiltersStore } from '../../store/filters';
import { Clock } from 'lucide-react';

export function TimeRangeFilter() {
  const { prepTimeRange, setPrepTimeRange } = useFiltersStore();
  
  const timeRanges = [
    { label: '< 30 min', range: [0, 30] },
    { label: '30-60 min', range: [30, 60] },
    { label: '> 60 min', range: [60, Infinity] }
  ];

  return (
    <div className="flex items-center gap-4">
      <Clock className="w-4 h-4 text-gray-500" />
      <div className="flex gap-2">
        {timeRanges.map(({ label, range }) => (
          <button
            key={label}
            onClick={() => setPrepTimeRange(
              prepTimeRange?.[0] === range[0] ? null : range as [number, number]
            )}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
              ${prepTimeRange?.[0] === range[0]
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}