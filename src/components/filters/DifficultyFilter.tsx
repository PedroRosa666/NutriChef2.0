import React from 'react';
import { useFiltersStore } from '../../store/filters';
import { cn } from '../../lib/utils';

export function DifficultyFilter() {
  const { difficulty, setDifficulty } = useFiltersStore();
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="flex gap-2">
      {difficulties.map((level) => (
        <button
          key={level}
          onClick={() => setDifficulty(difficulty === level ? null : level)}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
            difficulty === level
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  );
}