import React from 'react';
import { User, Settings, BookOpen, Heart } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useRecipesStore } from '../../store/recipes';

export function ProfileCard() {
  const { user } = useAuthStore();
  const { recipes, favoriteRecipes } = useRecipesStore();
  
  const userRecipes = recipes.filter((recipe: { authorId: any; }) => recipe.authorId === user?.id);
  
  if (!user) return null;
}