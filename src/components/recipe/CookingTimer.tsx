import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface CookingTimerProps {
  duration: number; // in minutes
}

export function CookingTimer({ duration }: CookingTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const reset = () => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        <motion.svg
          viewBox="0 0 100 100"
          className="transform -rotate-90 w-full h-full"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-gray-200"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-green-500"
            strokeWidth="10"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.5 }}
          />
        </motion.svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Timer className="w-6 h-6 text-green-600" />
        </div>
      </div>
      
      <div className="text-2xl font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isRunning ? (
            <Pause className="w-5 h-5 text-gray-600" />
          ) : (
            <Play className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <button
          onClick={reset}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}