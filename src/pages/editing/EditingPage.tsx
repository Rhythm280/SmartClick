import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Image, 
  Save, 
  RotateCw, 
  CropIcon, 
  SlidersHorizontal, 
  Contrast, 
  Download, 
  Undo, 
  Redo, 
  PanelRight, 
  PanelLeft, 
  X,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import EditRecommendationPanel from '../../components/common/EditRecommendationPanel';

type EditMode = 'crop' | 'rotate' | 'adjust' | 'filters' | null;

type EditHistory = {
  before: string;
  after: string;
  change: string;
};

type AdjustmentValues = {
  brightness: number;
  contrast: number;
  saturation: number;
  exposure: number;
  highlights: number;
  shadows: number;
};

const EditingPage: React.FC = () => {
  const { imageId } = useParams<{ imageId: string }>();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [originalSrc, setOriginalSrc] = useState<string>('');
  const [imageTitle, setImageTitle] = useState<string>('');
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [history, setHistory] = useState<EditHistory[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [adjustments, setAdjustments] = useState<AdjustmentValues>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    exposure: 0,
    highlights: 0,
    shadows: 0,
  });

  // Mock AI edit recommendations
  const [recommendations, setRecommendations] = useState([
    {
      id: 'rec-1',
      title: 'Enhance Colors',
      description: 'Boost saturation and vibrancy for more impactful colors',
      type: 'color' as const,
      before: 'https://images.pexels.com/photos/1559086/pexels-photo-1559086.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/1784577/pexels-photo-1784577.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'rec-2',
      title: 'Fix Exposure',
      description: 'Correct under-exposed areas and enhance details',
      type: 'exposure' as const,
      before: 'https://images.pexels.com/photos/1559086/pexels-photo-1559086.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/2118709/pexels-photo-2118709.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'rec-3',
      title: 'Recommended Crop',
      description: 'Improve composition with the rule of thirds',
      type: 'crop' as const,
    },
  ]);

  // Load image on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    const loadImage = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      // const mockImageId = imageId || 'default-image';
      setImageSrc('https://images.pexels.com/photos/1559086/pexels-photo-1559086.jpeg?auto=compress&cs=tinysrgb&w=800');
      setOriginalSrc('https://images.pexels.com/photos/1559086/pexels-photo-1559086.jpeg?auto=compress&cs=tinysrgb&w=800');
      setImageTitle('Beach Sunset');
    };
    
    loadImage();
  }, [imageId]);

  const handleEditModeChange = (mode: EditMode) => {
    setEditMode(mode === editMode ? null : mode);
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real app, this would send the edits to an API
    const newHistory: EditHistory = {
      before: originalSrc,
      after: imageSrc,
      change: editMode ? `Applied ${editMode}` : 'Made edits',
    };
    
    setHistory([...history, newHistory]);
    setEditMode(null);
    setIsProcessing(false);
  };

  const handleAdjustmentChange = (
    adjustment: keyof AdjustmentValues, 
    value: number
  ) => {
    setAdjustments(prev => ({
      ...prev,
      [adjustment]: value
    }));
    
    // In a real app, this would apply the adjustment to the image
    // using a library like CamanJS or a backend API
    console.log(`Adjusting ${adjustment} to ${value}`);
  };

  const handleRecommendationApply = (id: string) => {
    const recommendation = recommendations.find(rec => rec.id === id);
    if (!recommendation || !recommendation.after) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setImageSrc(recommendation.after!);
      setIsProcessing(false);
      
      // Remove the applied recommendation
      setRecommendations(recommendations.filter(rec => rec.id !== id));
    }, 800);
  };

  const handleApplyAllRecommendations = () => {
    const lastRec = recommendations.find(rec => rec.after);
    if (!lastRec || !lastRec.after) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setImageSrc(lastRec.after!);
      setIsProcessing(false);
      
      // Clear all recommendations
      setRecommendations([]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <Image className="h-6 w-6 text-primary-500 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Editing: {imageTitle}
            </h1>
          </div>
          <div className="flex space-x-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setOriginalSrc(imageSrc)}
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-sm"
              onClick={handleSaveEdit}
              disabled={isProcessing}
            >
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main content area */}
          <div className={`flex-grow ${isPanelOpen ? 'lg:w-3/4' : 'w-full'}`}>
            <div className="relative">
              <div className="p-6 flex items-center justify-center min-h-[600px]">
                {/* Image editor canvas */}
                <div className="relative max-w-full max-h-[600px] w-auto h-auto flex items-center justify-center">
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center">
                        <Sparkles className="h-5 w-5 text-primary-500 mr-2 animate-pulse" />
                        <span className="text-gray-900 dark:text-white">Processing...</span>
                      </div>
                    </div>
                  )}
                  <img 
                    src={imageSrc} 
                    alt={imageTitle} 
                    className="max-w-full max-h-[600px] object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
              
              {/* Edit buttons toolbar */}
              <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`btn ${editMode === 'crop' ? 'btn-primary' : 'btn-secondary'} btn-sm flex-col h-auto py-2 px-3`}
                    onClick={() => handleEditModeChange('crop')}
                  >
                    <CropIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs">Crop</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`btn ${editMode === 'rotate' ? 'btn-primary' : 'btn-secondary'} btn-sm flex-col h-auto py-2 px-3`}
                    onClick={() => handleEditModeChange('rotate')}
                  >
                    <RotateCw className="h-5 w-5 mb-1" />
                    <span className="text-xs">Rotate</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`btn ${editMode === 'adjust' ? 'btn-primary' : 'btn-secondary'} btn-sm flex-col h-auto py-2 px-3`}
                    onClick={() => handleEditModeChange('adjust')}
                  >
                    <SlidersHorizontal className="h-5 w-5 mb-1" />
                    <span className="text-xs">Adjust</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`btn ${editMode === 'filters' ? 'btn-primary' : 'btn-secondary'} btn-sm flex-col h-auto py-2 px-3`}
                    onClick={() => handleEditModeChange('filters')}
                  >
                    <Contrast className="h-5 w-5 mb-1" />
                    <span className="text-xs">Filters</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    disabled={history.length === 0}
                    className="btn btn-secondary btn-sm flex-col h-auto py-2 px-3 disabled:opacity-50"
                  >
                    <Undo className="h-5 w-5 mb-1" />
                    <span className="text-xs">Undo</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    disabled={history.length === 0}
                    className="btn btn-secondary btn-sm flex-col h-auto py-2 px-3 disabled:opacity-50"
                  >
                    <Redo className="h-5 w-5 mb-1" />
                    <span className="text-xs">Redo</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="btn btn-secondary btn-sm flex-col h-auto py-2 px-3"
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                  >
                    {isPanelOpen ? (
                      <>
                        <PanelRight className="h-5 w-5 mb-1" />
                        <span className="text-xs">Hide Panel</span>
                      </>
                    ) : (
                      <>
                        <PanelLeft className="h-5 w-5 mb-1" />
                        <span className="text-xs">Show Panel</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Adjustment controls - shown when adjust mode is active */}
            {editMode === 'adjust' && (
              <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Adjustments
                </h3>
                <div className="space-y-4">
                  {Object.entries(adjustments).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-1">
                        <label 
                          htmlFor={key}
                          className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize"
                        >
                          {key}
                        </label>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {value}
                        </span>
                      </div>
                      <input
                        id={key}
                        type="range"
                        min="-100"
                        max="100"
                        value={value}
                        onChange={(e) => handleAdjustmentChange(
                          key as keyof AdjustmentValues, 
                          parseInt(e.target.value)
                        )}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                  ))}
                  
                  <div className="flex justify-end mt-4">
                    <button 
                      className="btn btn-secondary btn-sm mr-2"
                      onClick={() => setAdjustments({
                        brightness: 0,
                        contrast: 0,
                        saturation: 0,
                        exposure: 0,
                        highlights: 0,
                        shadows: 0,
                      })}
                    >
                      Reset
                    </button>
                    <button className="btn btn-primary btn-sm">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar panel */}
          {isPanelOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:w-1/4 border-l border-gray-200 dark:border-gray-700"
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 text-primary-500 mr-2" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    AI Recommendations
                  </h3>
                </div>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 lg:hidden"
                  onClick={() => setIsPanelOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto max-h-[600px]">
                <EditRecommendationPanel
                  recommendations={recommendations}
                  onApply={handleRecommendationApply}
                  onApplyAll={handleApplyAllRecommendations}
                />
                
                <div className="mt-5">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Original Image
                  </h3>
                  <div className="relative">
                    <img 
                      src={originalSrc} 
                      alt="Original" 
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      className="mt-2 w-full btn btn-secondary btn-sm"
                      onClick={() => setImageSrc(originalSrc)}
                    >
                      Revert to Original
                    </button>
                  </div>
                </div>
                
                {history.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Edit History
                    </h3>
                    <div className="space-y-3">
                      {history.map((item, index) => (
                        <div 
                          key={index} 
                          className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
                          {item.change}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditingPage;