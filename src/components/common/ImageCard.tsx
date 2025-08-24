import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Download, Trash2, Star, Heart } from 'lucide-react';

type ImageCardProps = {
  image: {
    id: string;
    url: string;
    title?: string;
    tags?: string[];
    favorite?: boolean;
  };
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  className?: string;
};

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  className = '',
}) => {
  return (
    <motion.div
      className={`card overflow-hidden group ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image.url}
          alt={image.title || 'Photo'}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            {onView && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-500"
                onClick={() => onView(image.id)}
                aria-label="View image"
              >
                <Eye size={16} />
              </motion.button>
            )}
            
            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-500"
                onClick={() => onEdit(image.id)}
                aria-label="Edit image"
              >
                <Edit size={16} />
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-500"
              aria-label="Download image"
            >
              <Download size={16} />
            </motion.button>
            
            {onToggleFavorite && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 bg-white rounded-full ${
                  image.favorite 
                    ? 'text-red-500' 
                    : 'text-gray-800 hover:text-red-500'
                }`}
                onClick={() => onToggleFavorite(image.id)}
                aria-label={image.favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={16} />
              </motion.button>
            )}
            
            {onDelete && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white rounded-full text-gray-800 hover:text-red-500"
                onClick={() => onDelete(image.id)}
                aria-label="Delete image"
              >
                <Trash2 size={16} />
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Favorite indicator */}
        {image.favorite && (
          <div className="absolute top-2 right-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          </div>
        )}
      </div>
      
      {/* Image metadata */}
      {(image.title || image.tags) && (
        <div className="p-3">
          {image.title && (
            <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 truncate">
              {image.title}
            </h3>
          )}
          
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {image.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ImageCard;