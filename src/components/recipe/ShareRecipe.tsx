import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ShareRecipeProps {
  recipeId: number;
}

export function ShareRecipe({ recipeId }: ShareRecipeProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/recipe/${recipeId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <Share2 className="w-4 h-4 text-gray-500" />
      <button
        onClick={handleCopy}
        className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors",
          copied
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Share Recipe
          </>
        )}
      </button>
    </div>
  );
}