import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryState {
  searches: string[];
  addSearch: (query: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      searches: [],
      addSearch: (query) =>
        set((state) => ({
          searches: [
            query,
            ...state.searches.filter((s) => s !== query)
          ].slice(0, 10)
        })),
      clearHistory: () => set({ searches: [] })
    }),
    {
      name: 'search-history'
    }
  )
);