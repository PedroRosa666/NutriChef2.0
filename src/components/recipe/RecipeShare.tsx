import React from 'react';
import { Share2, Facebook, Twitter, Link } from 'lucide-react';
import { useToastStore } from '../../store/toast';

interface RecipeShareProps {
  recipeId: number;
  title: string;
}

export function RecipeShare({ recipeId, title }: RecipeShareProps) {
  const showToast = useToastStore((state) => state.showToast);
  const shareUrl = `${window.location.origin}/recipe/${recipeId}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Link copied to clipboard!', 'success');
    } catch (error) {
      showToast('Failed to copy link', 'error');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        Share Recipe
      </h3>
      
      <div className="flex gap-2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Facebook className="w-5 h-5" />
        </a>
        
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
        >
          <Twitter className="w-5 h-5" />
        </a>
        
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <WhatsApp className="w-5 h-5" />
        </a>
        
        <button
          onClick={handleCopyLink}
          className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <Link className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}