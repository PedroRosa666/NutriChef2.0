import { motion } from 'framer-motion';
import { useNutritionGoalsStore } from '../../store/nutrition-goals';

interface RecipeMetricsProps {
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export function RecipeMetrics({ nutritionFacts }: RecipeMetricsProps) {
  const { goals } = useNutritionGoalsStore();

  const metrics = [
    { label: 'Calories', value: nutritionFacts.calories, goal: goals.calories, unit: 'kcal' },
    { label: 'Protein', value: nutritionFacts.protein, goal: goals.protein, unit: 'g' },
    { label: 'Carbs', value: nutritionFacts.carbs, goal: goals.carbs, unit: 'g' },
    { label: 'Fat', value: nutritionFacts.fat, goal: goals.fat, unit: 'g' },
    { label: 'Fiber', value: nutritionFacts.fiber, goal: goals.fiber, unit: 'g' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {metrics.map(({ label, value, goal, unit }) => {
        const percentage = (value / goal) * 100;
        const isOverGoal = percentage > 100;

        return (
          <div key={label} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <div className="font-semibold mb-2">
              {value} {unit}
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(percentage, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full ${
                  isOverGoal ? 'bg-red-500' : 'bg-green-500'
                }`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {percentage.toFixed(0)}% of daily goal
            </p>
          </div>
        );
      })}
    </div>
  );
}