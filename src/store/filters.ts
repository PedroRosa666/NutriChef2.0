import { create } from 'zustand';

interface FiltersState {
  category: string;
  searchQuery: string;
  difficulty: string | null;
  prepTimeRange: [number, number] | null;
  sortBy: string;
  setCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setDifficulty: (difficulty: string | null) => void;
  setPrepTimeRange: (range: [number, number] | null) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  category: 'All', // Valor inicial (será substituído pelo valor traduzido no App.tsx)
  searchQuery: '',
  difficulty: null,
  prepTimeRange: null,
  sortBy: '',
  setCategory: (category) => set({ category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setPrepTimeRange: (range) => set({ prepTimeRange: range }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set({
    category: 'All', // Reseta para "All" (será substituído pelo valor traduzido no App.tsx)
    searchQuery: '',
    difficulty: null,
    prepTimeRange: null,
    sortBy: ''
  }),
}));