import { create } from 'zustand';
import type { Recipe } from '../types/recipe';

interface RecipesState {
  recipes: Recipe[];
  favoriteRecipes: number[];
  loading: boolean;
  addToFavorites: (recipeId: number) => void;
  removeFromFavorites: (recipeId: number) => void;
  addReview: (recipeId: number, review: Omit<Recipe['reviews'][0], 'id'>) => void;
  createRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<void>;
  updateRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (recipeId: number) => Promise<void>;
}

const INITIAL_RECIPES: Recipe[] = [
  {
    id: 1,
    title: 'Quinoa Buddha Bowl',
    description: 'A nutritious bowl packed with quinoa, roasted vegetables, and tahini dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    prepTime: 25,
    difficulty: 'easy',
    rating: 4.8,
    category: 'Vegan',
    ingredients: [
      '1 cup quinoa',
      '2 cups mixed vegetables (broccoli, carrots, sweet potato)',
      '1 can chickpeas',
      '2 tbsp olive oil',
      '1 avocado',
      '2 tbsp tahini',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Preheat oven to 400°F (200°C)',
      'Roast vegetables with olive oil for 20-25 minutes',
      'Drain and rinse chickpeas',
      'Assemble bowl with quinoa base, roasted vegetables, and chickpeas',
      'Top with sliced avocado and drizzle with tahini'
    ],
    nutritionFacts: {
      calories: 450,
      protein: 15,
      carbs: 52,
      fat: 22,
      fiber: 12
    },
    reviews: [
      {
        id: 1,
        userId: '1',
        userName: 'Sarah',
        rating: 5,
        comment: 'Perfect healthy lunch option!',
        date: '2024-03-15'
      }
    ],
    authorId: '1',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15'
  },
  {
    id: 2,
    title: 'High-Protein Turkey Meatballs',
    description: 'Lean turkey meatballs packed with protein and Mediterranean herbs.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468',
    prepTime: 35,
    difficulty: 'medium',
    rating: 4.6,
    category: 'High Protein',
    ingredients: [
      '1 lb ground turkey',
      '1/2 cup almond flour',
      '1 egg',
      '2 cloves garlic, minced',
      '1 tbsp Italian herbs',
      '1/4 cup grated Parmesan',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Mix all ingredients in a large bowl',
      'Form into 12-15 meatballs',
      'Heat olive oil in a large skillet',
      'Cook meatballs for 12-15 minutes, turning occasionally',
      'Serve with your favorite sauce'
    ],
    nutritionFacts: {
      calories: 320,
      protein: 28,
      carbs: 8,
      fat: 18,
      fiber: 2
    },
    reviews: [],
    authorId: '2',
    createdAt: '2024-03-16',
    updatedAt: '2024-03-16'
  },
  {
    id: 3,
    title: 'Keto Cauliflower Mac and Cheese',
    description: 'A low-carb twist on the classic comfort food using cauliflower.',
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686',
    prepTime: 30,
    difficulty: 'easy',
    rating: 4.7,
    category: 'Low Carb',
    ingredients: [
      '1 large cauliflower head',
      '2 cups shredded cheddar',
      '1 cup heavy cream',
      '2 oz cream cheese',
      '2 tbsp butter',
      '1 tsp mustard powder',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cut cauliflower into florets',
      'Steam until tender-crisp',
      'In a saucepan, combine cream, cream cheese, and butter',
      'Add cheese and seasonings',
      'Pour over cauliflower and bake at 350°F for 15 minutes'
    ],
    nutritionFacts: {
      calories: 380,
      protein: 18,
      carbs: 9,
      fat: 32,
      fiber: 3
    },
    reviews: [],
    authorId: '2',
    createdAt: '2024-03-16',
    updatedAt: '2024-03-16'
  },
  {
    id: 4,
    title: 'Gluten-Free Banana Bread',
    description: 'Moist and delicious banana bread made with almond and coconut flour.',
    image: 'https://images.unsplash.com/photo-1678526773090-a207482f7917?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2x1dGVuJTIwRnJlZSUyMEJhbmFuYSUyMEJyZWFkfGVufDB8fDB8fHww',
    prepTime: 55,
    difficulty: 'medium',
    rating: 4.9,
    category: 'Gluten Free',
    ingredients: [
      '3 ripe bananas',
      '2 cups almond flour',
      '1/4 cup coconut flour',
      '3 eggs',
      '1/4 cup maple syrup',
      '1 tsp baking soda',
      '1 tsp vanilla extract',
      '1/2 tsp cinnamon'
    ],
    instructions: [
      'Preheat oven to 350°F (175°C)',
      'Mash bananas in a large bowl',
      'Mix in eggs, maple syrup, and vanilla',
      'Add dry ingredients and mix well',
      'Pour into a lined loaf pan',
      'Bake for 45-50 minutes'
    ],
    nutritionFacts: {
      calories: 220,
      protein: 8,
      carbs: 24,
      fat: 12,
      fiber: 4
    },
    reviews: [],
    authorId: '3',
    createdAt: '2024-03-17',
    updatedAt: '2024-03-17'
  },
  {
    id: 5,
    title: 'Mediterranean Chickpea Salad',
    description: 'Fresh and vibrant salad with chickpeas, vegetables, and herbs.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    prepTime: 15,
    difficulty: 'easy',
    rating: 4.5,
    category: 'Vegetarian',
    ingredients: [
      '2 cans chickpeas, drained',
      '1 cucumber, diced',
      '2 cups cherry tomatoes, halved',
      '1 red onion, diced',
      '1 cup kalamata olives',
      '1/2 cup fresh parsley',
      '1/4 cup olive oil',
      'Juice of 2 lemons'
    ],
    instructions: [
      'Combine all vegetables in a large bowl',
      'Whisk together olive oil and lemon juice',
      'Add herbs and seasonings',
      'Pour dressing over salad and toss',
      'Chill for at least 30 minutes before serving'
    ],
    nutritionFacts: {
      calories: 280,
      protein: 10,
      carbs: 32,
      fat: 14,
      fiber: 8
    },
    reviews: [],
    authorId: '3',
    createdAt: '2024-03-17',
    updatedAt: '2024-03-17'
  }
];

export const useRecipesStore = create<RecipesState>((set) => ({
  recipes: INITIAL_RECIPES,
  favoriteRecipes: [],
  loading: false, // Inicializa como false

  fetchRecipes: async () => {
    set({ loading: true });
    try {
      const response = await fetch('/api/recipes'); // Substitua pela sua API real
      const data = await response.json();
      set({ recipes: data });
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      set({ loading: false });
    }
  },

  addToFavorites: (recipeId) =>
    set((state) => ({
      favoriteRecipes: [...state.favoriteRecipes, recipeId]
    })),

  removeFromFavorites: (recipeId) =>
    set((state) => ({
      favoriteRecipes: state.favoriteRecipes.filter(id => id !== recipeId)
    })),

  addReview: (recipeId, review) =>
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === recipeId
          ? {
              ...recipe,
              reviews: [...recipe.reviews, { ...review, id: Date.now() }],
              rating: (recipe.rating + review.rating) / 2
            }
          : recipe
      )
    })),

  createRecipe: async (recipeData) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    set((state) => ({
      recipes: [
        ...state.recipes,
        {
          ...recipeData,
          id: Math.max(0, ...state.recipes.map(r => r.id)) + 1
        }
      ],
      loading: false
    }));
  },

  updateRecipe: async (updatedRecipe) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id
          ? { ...updatedRecipe, updatedAt: new Date().toISOString() }
          : recipe
      ),
      loading: false
    }));
  },

  deleteRecipe: async (recipeId) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== recipeId),
      favoriteRecipes: state.favoriteRecipes.filter(id => id !== recipeId),
      loading: false
    }));
  }
}));
