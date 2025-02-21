import React, { useState } from 'react';
import { Star, Clock, ChefHat, Heart, HeartOff, Edit, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useRecipesStore } from '../store/recipes';
import { EditRecipeForm } from './recipe/EditRecipeForm';
import type { Recipe } from '../types/recipe';
import { cn } from '../lib/utils';
import { useTranslation } from '../hooks/useTranslation';

interface RecipeDetailsProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeDetails({ recipe, onClose }: RecipeDetailsProps) {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { favoriteRecipes, addToFavorites, removeFromFavorites, addReview, deleteRecipe } = useRecipesStore();
  const t = useTranslation();

  const difficultyTranslations = t.recipe.difficultyLevels;
  const translatedDifficulty = difficultyTranslations[recipe.difficulty as keyof typeof difficultyTranslations] || recipe.difficulty;

  const isFavorite = favoriteRecipes.includes(recipe.id);
  const isAuthor = user?.id === recipe.authorId;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addReview(recipe.id, {
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    });
    setNewReview({ rating: 5, comment: '' });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await deleteRecipe(recipe.id);
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative text-gray-600 dark:text-white dark:bg-gray-800">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div>
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
                  <div className="flex gap-2">
                    {isAuthenticated && (
                      <button
                        onClick={() => isFavorite ? removeFromFavorites(recipe.id) : addToFavorites(recipe.id)}
                        className={cn(
                          "p-2 rounded-full",
                          isFavorite ? "text-red-500" : "text-gray-400"
                        )}
                      >
                        {isFavorite ? <HeartOff /> : <Heart />}
                      </button>
                    )}
                    {isAuthor && (
                      <>
                        <button
                          onClick={() => setIsEditModalOpen(true)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleDelete}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 dark:text-white">
                  <div className="flex items-center gap-1 dark:text-white">
                    <Clock className="w-4 h-4 dark:text-white" />
                    <span>{recipe.prepTime}min</span>
                  </div>
                  <div className="flex items-center gap-1 dark:text-white">
                    <ChefHat className="w-4 h-4" />
                    <span className={cn(
                      "capitalize",
                      recipe.difficulty === 'easy' && "text-green-500",
                      recipe.difficulty === 'medium' && "text-yellow-500",
                      recipe.difficulty === 'hard' && "text-red-500"
                    )}>{translatedDifficulty} {/* Alteração aqui */}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 dark:text-white">{recipe.description}</p>

                {/* Seção de fatos nutricionais */}
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2 dark:text-black">{t.recipe.nutritionFacts}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm dark:text-black">
                    <div>{t.profile.nutritionGoalsnames.calories}: {recipe.nutritionFacts.calories}</div>
                    <div>{t.profile.nutritionGoalsnames.protein}: {recipe.nutritionFacts.protein}g</div>
                    <div>{t.profile.nutritionGoalsnames.carbs}: {recipe.nutritionFacts.carbs}g</div>
                    <div>{t.profile.nutritionGoalsnames.fat}: {recipe.nutritionFacts.fat}g</div>
                    <div>{t.profile.nutritionGoalsnames.fiber}: {recipe.nutritionFacts.fiber}g</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold mb-2">{t.recipe.ingredients}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-600 dark:text-white">{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t.recipe.instructions}</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-600 dark:text-white">{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">{t.recipe.reviews}</h3>
              {isAuthenticated ? (
                <form onSubmit={handleAddReview} className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{t.recipe.rating}:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className={cn(
                          "text-2xl",
                          star <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                        )}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder={t.recipe.writeReview}
                    className="w-full p-2 border rounded-lg mb-2"
                    rows={3}
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    {t.recipe.submitReview}
                  </button>
                </form>
              ) : (
                <p className="text-gray-500 mb-4">{t.recipe.signInToReview}</p>
              )}

              <div className="space-y-4">
                {recipe.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              "text-lg",
                              i < review.rating ? "text-yellow-400" : "text-gray-300"
                            )}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <span className="text-sm text-gray-400">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditRecipeForm
          recipe={recipe}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}