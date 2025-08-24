import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, ChevronDown, Save, RefreshCw, Tags } from 'lucide-react';
import ImageCard from '../../components/common/ImageCard';
import TaggingComponent from '../../components/common/TaggingComponent';

type ImageItem = {
  id: string;
  url: string;
  title?: string;
  tags: string[];
  event?: string;
  date?: string;
  favorite?: boolean;
};

const TaggingPage: React.FC = () => {
  // Sample available tags (in a real app, this would come from API)
  const [availableTags, setAvailableTags] = useState([
    'portrait', 'landscape', 'wedding', 'family', 'beach', 'urban', 'nature',
    'sunset', 'animals', 'architecture', 'food', 'travel', 'black and white',
    'macro', 'night', 'street', 'event', 'product', 'fashion', 'sports'
  ]);

  // Sample images with tags
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: 'img-1',
      url: 'https://images.pexels.com/photos/1559086/pexels-photo-1559086.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Beach Sunset',
      tags: ['beach', 'sunset', 'nature'],
      event: 'Summer Trip',
      date: '2023-07-15',
      favorite: true,
    },
    {
      id: 'img-2',
      url: 'https://images.pexels.com/photos/1251171/pexels-photo-1251171.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Mountain View',
      tags: ['landscape', 'nature'],
      event: 'Mountain Trip',
      date: '2023-08-22',
    },
    {
      id: 'img-3',
      url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'City Buildings',
      tags: ['urban', 'architecture'],
      event: 'City Tour',
      date: '2023-09-10',
    },
    {
      id: 'img-4',
      url: 'https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Business Meeting',
      tags: ['event', 'portrait'],
      event: 'Corporate Event',
      date: '2023-10-05',
    },
  ]);

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedBulkTags, setSelectedBulkTags] = useState<string[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedBulkImages, setSelectedBulkImages] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Handle clicking on an image to edit its tags
  const handleImageSelect = (image: ImageItem) => {
    if (bulkMode) {
      // In bulk mode, toggle selection
      if (selectedBulkImages.includes(image.id)) {
        setSelectedBulkImages(selectedBulkImages.filter(id => id !== image.id));
      } else {
        setSelectedBulkImages([...selectedBulkImages, image.id]);
      }
    } else {
      // In single mode, select the image and load its tags
      setSelectedImage(image);
      setSelectedTags([...image.tags]);
    }
  };

  // Handle saving tags for a single image
  const handleSaveTags = async () => {
    if (!selectedImage) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update image tags
    setImages(images.map(img => 
      img.id === selectedImage.id ? { ...img, tags: selectedTags } : img
    ));
    
    // Add any new tags to available tags
    const newTags = selectedTags.filter(tag => !availableTags.includes(tag));
    if (newTags.length > 0) {
      setAvailableTags([...availableTags, ...newTags]);
    }
    
    setIsSaving(false);
    setSelectedImage(null);
  };

  // Handle saving tags for multiple images
  const handleSaveBulkTags = async () => {
    if (selectedBulkImages.length === 0) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update images with the bulk tags
    setImages(images.map(img => {
      if (selectedBulkImages.includes(img.id)) {
        // Combine existing tags with new bulk tags, removing duplicates
        const combinedTags = [...new Set([...img.tags, ...selectedBulkTags])];
        return { ...img, tags: combinedTags };
      }
      return img;
    }));
    
    // Add any new tags to available tags
    const newTags = selectedBulkTags.filter(tag => !availableTags.includes(tag));
    if (newTags.length > 0) {
      setAvailableTags([...availableTags, ...newTags]);
    }
    
    setIsSaving(false);
    setSelectedBulkImages([]);
    setSelectedBulkTags([]);
  };

  // Toggle between single and bulk tagging modes
  const toggleBulkMode = () => {
    setBulkMode(!bulkMode);
    setSelectedImage(null);
    setSelectedBulkImages([]);
  };

  // Get AI tag suggestions for the selected image
  const getAISuggestions = async () => {
    if (!selectedImage) return;
    
    setShowSuggestions(true);
    
    // Simulate API call to an AI service
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock AI suggestions based on the image
    const mockSuggestions = [
      'sunset', 'golden hour', 'silhouette', 'ocean', 'horizon'
    ].filter(tag => !selectedTags.includes(tag));
    
    setAiSuggestions(mockSuggestions);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Tag className="h-6 w-6 text-primary-500 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Photo Tagging & Organization
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <button
              className={`btn ${bulkMode ? 'btn-secondary' : 'btn-primary'} btn-sm`}
              onClick={toggleBulkMode}
            >
              {bulkMode ? 'Single Mode' : 'Bulk Tagging Mode'}
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {bulkMode 
            ? 'Select multiple images to apply tags to all of them at once.' 
            : 'Click on an image to edit its tags individually.'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel: Images grid */}
        <div className={`lg:col-span-${selectedImage || bulkMode ? 2 : 3}`}>
          <div className={`grid grid-cols-1 ${selectedImage || bulkMode ? 'sm:grid-cols-2 md:grid-cols-3' : 'sm:grid-cols-3 md:grid-cols-4'} gap-4`}>
            {images.map((image) => (
              <div 
                key={image.id} 
                className={`relative cursor-pointer ${
                  (selectedImage && selectedImage.id === image.id) || 
                  (bulkMode && selectedBulkImages.includes(image.id))
                    ? 'ring-2 ring-primary-500 rounded-lg'
                    : ''
                }`}
                onClick={() => handleImageSelect(image)}
              >
                <ImageCard image={image} />
                {bulkMode && selectedBulkImages.includes(image.id) && (
                  <div className="absolute top-2 left-2 h-6 w-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel: Tagging controls */}
        {selectedImage && !bulkMode && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Edit Tags</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setSelectedImage(null)}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.button>
              </div>
              
              <div className="mb-4">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title || 'Photo'} 
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="mt-2 font-medium text-gray-900 dark:text-white">
                  {selectedImage.title || 'Untitled Photo'}
                </h3>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <TaggingComponent
                  availableTags={availableTags}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                  allowCustomTags={true}
                />
              </div>
              
              <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={getAISuggestions}
                  className="text-sm flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  <Tags className="h-4 w-4 mr-1" />
                  Get AI tag suggestions
                </button>
                
                {showSuggestions && (
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      AI suggested tags:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.length > 0 ? (
                        aiSuggestions.map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedTags([...selectedTags, tag])}
                            className="px-2 py-1 text-xs bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800"
                          >
                            + {tag}
                          </button>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                          No additional suggestions found
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveTags}
                  disabled={isSaving}
                  className="btn btn-primary btn-sm"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Tags
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk tagging panel */}
        {bulkMode && (
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Bulk Tagging</h2>
                <span className="text-sm bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 py-1 px-2 rounded-full">
                  {selectedBulkImages.length} selected
                </span>
              </div>
              
              {selectedBulkImages.length > 0 ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Add Tags to Selected Images
                    </label>
                    <TaggingComponent
                      availableTags={availableTags}
                      selectedTags={selectedBulkTags}
                      onTagsChange={setSelectedBulkTags}
                      allowCustomTags={true}
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      These tags will be added to all selected images, preserving their existing tags.
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setSelectedBulkImages([])}
                      className="btn btn-secondary btn-sm"
                    >
                      Clear Selection
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveBulkTags}
                      disabled={isSaving || selectedBulkTags.length === 0}
                      className="btn btn-primary btn-sm"
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Apply to All
                        </>
                      )}
                    </motion.button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <Tag className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Select one or more images to apply tags to them.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaggingPage;