import { cn } from '../lib/utils';
import { useTranslation } from '../hooks/useTranslation'; // Importe o hook de tradução

interface CategoryFilterProps {
  categories: string[]; // Recebe as CHAVES das categorias (ex: ['all', 'vegan', 'lowCarb'])
  selectedCategory: string; // Recebe a CHAVE da categoria selecionada
  onSelectCategory: (categoryKey: string) => void; // Recebe a CHAVE da categoria
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const t = useTranslation(); // Obtenha as traduções

  // Obtenha o objeto de tradução de categorias
  const categoryTranslations = t.categories;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((categoryKey) => {
        // Obtenha a tradução da categoria
        const translatedCategory = categoryTranslations[categoryKey as keyof typeof categoryTranslations] || categoryKey;

        console.log('Chave:', categoryKey, 'Tradução:', translatedCategory);

        return (
          <button
            key={categoryKey}
            onClick={() => onSelectCategory(categoryKey)} // Passa a CHAVE original
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedCategory === categoryKey // Compara com a CHAVE original
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {/* Exibe a tradução da categoria */}
            {translatedCategory}
          </button>
        );
      })}
    </div>
  );
}