import { ArrowUpDown } from 'lucide-react';
import { useFiltersStore } from '../../store/filters';

export function SortingOptions() {
  const { sortBy, setSortBy } = useFiltersStore();

  const options = [
    { value: 'rating', label: 'Rating' },
    { value: 'prepTime', label: 'Prep Time' },
    { value: 'newest', label: 'Newest' }
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-1 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Sort by</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}