import React from 'react';
import { useAuthStore } from '../../store/auth';
import { useRecipesStore } from '../../store/recipes';
import { RecipeCard } from '../RecipeCard';

export function UserProfile() {
  const { user } = useAuthStore();
  const { recipes, favoriteRecipes } = useRecipesStore();
  
  const userFavorites = recipes.filter(recipe => 
    favoriteRecipes.includes(recipe.id)
  );

  const userRecipes = recipes.filter(recipe => 
    recipe.authorId === user?.id
  );

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Account Type</p>
            <p className="font-medium capitalize">{user.type}</p>
          </div>
        </div>
      </div>

      {user.type === 'nutritionist' && userRecipes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">My Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={function (): void {
                throw new Error('Function not implemented.');
              } } />
            ))}
          </div>
        </div>
      )}

      {userFavorites.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Favorite Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userFavorites.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={function (): void {
                throw new Error('Function not implemented.');
              } } />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}