import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RecipeCard } from './components/RecipeCard';
import { CategoryFilter } from './components/CategoryFilter';
import { RecipeDetails } from './components/RecipeDetails';
import { CreateRecipeForm } from './components/CreateRecipeForm';
import { ProfilePage } from './components/profile/ProfilePage';
import { useFiltersStore } from './store/filters';
import { useRecipesStore } from './store/recipes';
import { useAuthStore } from './store/auth';
import { useToastStore } from './store/toast';
import { useTranslation } from './hooks/useTranslation';
import { Plus } from 'lucide-react';
import { Toast } from './components/common/Toast';
import { LoadingSpinner } from './components/common/LoadingSpinner';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { category, searchQuery, setCategory } = useFiltersStore();
  const { recipes, loading } = useRecipesStore();
  const { isAuthenticated, isNutritionist } = useAuthStore();
  const { message, type, hideToast } = useToastStore();
  const t = useTranslation();

  // Use as CHAVES originais das categorias
  const CATEGORIES = ['all', 'vegan', 'lowCarb', 'highProtein', 'glutenFree', 'vegetarian'];

  // Sincroniza a categoria inicial com a chave "all"
  useEffect(() => {
    setCategory('all'); // Configura a categoria inicial como "all"
  }, [setCategory]);

  // Função para normalizar as chaves (remover espaços e converter para lowercase)
  const normalizeKey = (key: string) => {
    return key.toLowerCase().replace(/\s+/g, '');
  };

  // Filtra as receitas
  const filteredRecipes = recipes.filter(recipe => {
    // Normalize as chaves para comparação
    const normalizedRecipeCategory = normalizeKey(recipe.category);
    const normalizedSelectedCategory = normalizeKey(category);

    const matchesCategory = normalizedSelectedCategory === 'all' || normalizedRecipeCategory === normalizedSelectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Adicione logs para depuração
    console.log('Categoria da receita:', recipe.category, 'Normalizada:', normalizedRecipeCategory);
    console.log('Categoria selecionada:', category, 'Normalizada:', normalizedSelectedCategory);
    console.log('Resultado do filtro:', matchesCategory);

    return matchesCategory && matchesSearch;
  });

  const selectedRecipeData = recipes.find(r => r.id === selectedRecipe);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header onProfileClick={() => setShowProfile(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showProfile ? (
          <ProfilePage onBackToRecipes={() => setShowProfile(false)} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  {t.home.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
                  {t.home.subtitle}
                </p>
              </div>

              {isAuthenticated && isNutritionist() && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  {t.home.createRecipe}
                </button>
              )}
            </div>

            {/* Passe as CHAVES originais para o CategoryFilter */}
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={category}
              onSelectCategory={setCategory}
            />

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">{t.home.noRecipes}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {selectedRecipeData && (
        <RecipeDetails
          recipe={selectedRecipeData}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      <CreateRecipeForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {message && (
        <Toast
          message={message}
          type={type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default App;