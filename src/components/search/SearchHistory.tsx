import { Clock } from 'lucide-react';
import { useSearchHistoryStore } from '../../store/search-history';
import { useFiltersStore } from '../../store/filters';

export function SearchHistory() {
  const { searches, clearHistory } = useSearchHistoryStore();
  const { setSearchQuery } = useFiltersStore();

  if (searches.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
        <button
          onClick={clearHistory}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear History
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            onClick={() => setSearchQuery(search)}
            className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
          >
            <Clock className="w-3 h-3" />
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}