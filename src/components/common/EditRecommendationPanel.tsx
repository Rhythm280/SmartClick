import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Wand2, ZoomIn, ArrowRight, Sparkles } from 'lucide-react';

type EditRecommendation = {
  id: string;
  title: string;
  description: string;
  before?: string;
  after?: string;
  type: 'exposure' | 'color' | 'crop' | 'enhance' | 'other';
};

type EditRecommendationPanelProps = {
  recommendations: EditRecommendation[];
  onApply: (id: string) => void;
  onApplyAll: () => void;
  className?: string;
};

const EditRecommendationPanel: React.FC<EditRecommendationPanelProps> = ({
  recommendations,
  onApply,
  onApplyAll,
  className = '',
}) => {
  // If no recommendations, return a placeholder
  if (recommendations.length === 0) {
    return (
      <div className={`card p-4 ${className}`}>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Lightbulb className="h-5 w-5 mr-2 text-primary-500" />
          <p className="text-sm">AI edit recommendations will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wand2 className="h-5 w-5 mr-2 text-primary-500" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              AI Edit Recommendations
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-sm btn-primary"
            onClick={onApplyAll}
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Apply All
          </motion.button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <AnimatePresence>
          {recommendations.map((rec) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {rec.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {rec.description}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm flex items-center"
                  onClick={() => onApply(rec.id)}
                >
                  Apply
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </motion.button>
              </div>

              {rec.before && rec.after && (
                <div className="mt-3 flex space-x-2">
                  <div className="relative w-1/2">
                    <img
                      src={rec.before}
                      alt="Before edit"
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative w-1/2">
                    <img
                      src={rec.after}
                      alt="After edit"
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="absolute top-1 left-1 bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded">
                      After
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditRecommendationPanel;