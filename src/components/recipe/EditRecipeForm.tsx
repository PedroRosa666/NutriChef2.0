import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useRecipesStore } from '../../store/recipes';
import { cn } from '../../lib/utils';
import type { Recipe } from '../../types/recipe';

interface EditRecipeFormProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export function EditRecipeForm({ recipe, isOpen, onClose }: EditRecipeFormProps) {
  const { updateRecipe } = useRecipesStore();
  const [loading, setLoading] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState<Recipe>(recipe);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateRecipe(editedRecipe);
      onClose();
    } catch (error) {
      console.error('Error updating recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArrayInput = (
    field: 'ingredients' | 'instructions',
    index: number,
    value: string
  ) => {
    setEditedRecipe(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setEditedRecipe(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'instructions', index: number) => {
    setEditedRecipe(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Recipe</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editedRecipe.title}
                onChange={(e) => setEditedRecipe(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={editedRecipe.image}
                onChange={(e) => setEditedRecipe(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editedRecipe.description}
              onChange={(e) => setEditedRecipe(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={3}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                value={editedRecipe.prepTime}
                onChange={(e) => setEditedRecipe(prev => ({ ...prev, prepTime: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={editedRecipe.difficulty}
                onChange={(e) => setEditedRecipe(prev => ({ ...prev, difficulty: e.target.value as Recipe['difficulty'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={editedRecipe.category}
                onChange={(e) => setEditedRecipe(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="All">All</option>
                <option value="Vegan">Vegan</option>
                <option value="Low Carb">Low Carb</option>
                <option value="High Protein">High Protein</option>
                <option value="Gluten Free">Gluten Free</option>
                <option value="Vegetarian">Vegetarian</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            {editedRecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayInput('ingredients', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 2 cups flour"
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
              <Plus className="w-4 h-4" /> Add Ingredient
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            {editedRecipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => handleArrayInput('instructions', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`Step ${index + 1}`}
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
              <Plus className="w-4 h-4" /> Add Step
            </button>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Nutrition Facts</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(editedRecipe.nutritionFacts).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm text-gray-600 mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setEditedRecipe(prev => ({
                      ...prev,
                      nutritionFacts: {
                        ...prev.nutritionFacts,
                        [key]: Number(e.target.value)
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3 rounded-lg text-white font-medium transition-colors",
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            )}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}