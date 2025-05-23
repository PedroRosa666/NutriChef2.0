import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useRecipesStore } from '../store/recipes';
import { useAuthStore } from '../store/auth';
import { useTranslation } from '../hooks/useTranslation'; // Importe o hook de tradução
import { cn } from '../lib/utils';
import type { Recipe } from '../types/recipe';

type CategoryKey = keyof ReturnType<typeof useTranslation>['categories'];
interface CreateRecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateRecipeForm({ isOpen, onClose }: CreateRecipeFormProps) {
  const { user } = useAuthStore();
  const { createRecipe } = useRecipesStore();
  const translations = useTranslation(); // Use o hook de tradução
  const [loading, setLoading] = useState(false);

  // Estado inicial corrigido
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    title: '',
    description: '',
    image: '',
    prepTime: 30,
    difficulty: 'medium',
    category: 'all', // Chave original corrigida
    ingredients: [''],
    instructions: [''],
    nutritionFacts: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    },
  });

  // Traduções
  const NewRecipe = translations.recipe.CreateNewRecipe;
  const easy = translations.recipe.difficultyLevels.easy;
  const medium = translations.recipe.difficultyLevels.medium;
  const hard = translations.recipe.difficultyLevels.hard;
  const title = translations.recipe.recipeTitle;
  const description = translations.recipe.recipeDescription;
  const imageURL = translations.recipe.recipeImageURL;
  const prepTime = translations.recipe.prepTime;
  const difficulty = translations.recipe.difficulty;
  const category = translations.recipe.recipeCategory;
  const ingredients = translations.recipe.ingredients;
  const instructions = translations.recipe.instructions;
  const nutritionFacts = translations.recipe.nutritionFacts;
  const addIngredient = translations.recipe.addIngredient;
  const addStep = translations.recipe.addStep;
  const CreateRecipe = translations.recipe.CreateRecipe;

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRecipe({
        ...recipe,
        rating: 0,
        reviews: [],
      } as Recipe);
      onClose();
    } catch (error) {
      console.error('Error creating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArrayInput = (
    field: 'ingredients' | 'instructions',
    index: number,
    value: string
  ) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: prev[field]?.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setRecipe((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ''],
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'instructions', index: number) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index),
    }));
  };

  // Mapeia as categorias traduzidas para o formato { valor: 'original', label: 'traduzido' }
  const translatedCategories = (Object.keys(translations.categories) as CategoryKey[]).map((key) => ({
    value: key,
    label: translations.categories[key],
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-400 rounded-xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">{NewRecipe}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {title}
              </label>
              <input
                type="text"
                value={recipe.title}
                onChange={(e) => setRecipe((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {imageURL}
              </label>
              <input
                type="url"
                value={recipe.image}
                onChange={(e) => setRecipe((prev) => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              {description}
            </label>
            <textarea
              value={recipe.description}
              onChange={(e) => setRecipe((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {prepTime}
              </label>
              <input
                type="number"
                value={recipe.prepTime}
                onChange={(e) => setRecipe((prev) => ({ ...prev, prepTime: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {difficulty}
              </label>
              <select
                value={recipe.difficulty}
                onChange={(e) => setRecipe((prev) => ({ ...prev, difficulty: e.target.value as Recipe['difficulty'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="easy">{easy}</option>
                <option value="medium">{medium}</option>
                <option value="hard">{hard}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                {category}
              </label>
              <select
                value={recipe.category}
                onChange={(e) => setRecipe((prev) => ({
                  ...prev,
                  category: e.target.value as CategoryKey
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                {translatedCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
              {ingredients}
            </label>
            {recipe.ingredients?.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayInput('ingredients', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`${translations.recipe.example}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('ingredients', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('ingredients')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <Plus className="w-4 h-4" /> {addIngredient}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
              {instructions}
            </label>
            {recipe.instructions?.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => handleArrayInput('instructions', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`${translations.recipe.Step} ${index + 1}`} // Tradução aplicada aqui
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('instructions', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('instructions')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <Plus className="w-4 h-4" /> {addStep}
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-white">
              {nutritionFacts}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(recipe.nutritionFacts || {}).map(([key, value]) => {
                // Garantir que `key` seja uma das chaves válidas de `nutritionGoalsnames`
                const nutritionKey = key as keyof typeof translations.profile.nutritionGoalsnames;

                return (
                  <div key={key}>
                    <label className="block text-sm text-gray-600 mb-1 capitalize dark:text-white">
                      {translations.profile.nutritionGoalsnames[nutritionKey]} {/* Acesso seguro */}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        setRecipe((prev) => {
                          // Garantir que `nutritionFacts` sempre tenha valores padrão
                          const updatedNutritionFacts = {
                            calories: prev.nutritionFacts?.calories || 0,
                            protein: prev.nutritionFacts?.protein || 0,
                            carbs: prev.nutritionFacts?.carbs || 0,
                            fat: prev.nutritionFacts?.fat || 0,
                            fiber: prev.nutritionFacts?.fiber || 0,
                            [key]: Number(e.target.value) || 0, // Atualizar o valor do campo atual
                          };

                          return {
                            ...prev,
                            nutritionFacts: updatedNutritionFacts, // Garantir que `nutritionFacts` não seja undefined
                          };
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="0"
                      required
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full py-3 rounded-lg text-white font-medium transition-colors',
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            )}
          >
            {loading ? 'Creating...' : CreateRecipe}
          </button>
        </form>
      </div>
    </div>
  );
}