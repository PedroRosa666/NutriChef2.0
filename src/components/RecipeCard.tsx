import React from 'react';
import { Clock, ChefHat, Star, Heart, HeartOff } from 'lucide-react';
import { cn } from '../lib/utils';
import { useRecipesStore } from '../store/recipes';
import { useAuthStore } from '../store/auth';
import { useTranslation } from '../hooks/useTranslation';
import type { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const { favoriteRecipes, addToFavorites, removeFromFavorites } = useRecipesStore();
  const { isAuthenticated } = useAuthStore();
  const t = useTranslation();

  // Para dificuldade
  const difficultyTranslations = t.recipe.difficultyLevels;
  const translatedDifficulty = difficultyTranslations[recipe.difficulty as keyof typeof difficultyTranslations] || recipe.difficulty;

  // Para categorias
  // Dentro do componente RecipeCard, modifique a parte das categorias:
  const categoryTranslations = t.categories;

  const normalizeCategoryKey = (category: string) => {
    return category
      .toLowerCase()
      .split(' ')
      .map((word, index) =>
        index === 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join('');
  };

  const translatedCategory = categoryTranslations[
    normalizeCategoryKey(recipe.category) as keyof typeof categoryTranslations
  ] || recipe.category;

  // Adicione para debug:
  console.log('Chave normalizada:', normalizeCategoryKey(recipe.category));

  const isFavorite = favoriteRecipes.includes(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) return;

    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe.id);
    }
  };


  // Dentro do componente, antes do return:
  console.log('Categoria crua:', recipe.category);
  console.log('Tradução encontrada:', translatedCategory);
  console.log('Lista de categorias:', categoryTranslations);

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          {translatedCategory} {/* Alteração aqui */}
        </span>
        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-4 left-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md",
              isFavorite ? "text-red-500" : "text-gray-400"
            )}
          >
            {isFavorite ? <HeartOff className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
          </button>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{recipe.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime}min</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4" />
            <span className={cn(
              "capitalize",
              recipe.difficulty === 'easy' && "text-green-500",
              recipe.difficulty === 'medium' && "text-yellow-500",
              recipe.difficulty === 'hard' && "text-red-500"
            )}>
              {translatedDifficulty} {/* Alteração aqui */}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{recipe.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}