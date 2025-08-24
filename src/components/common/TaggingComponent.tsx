import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, X, Plus, Search, Filter } from 'lucide-react';

type TaggingComponentProps = {
  availableTags?: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  allowCustomTags?: boolean;
  className?: string;
};

const TaggingComponent: React.FC<TaggingComponentProps> = ({
  availableTags = [],
  selectedTags,
  onTagsChange,
  allowCustomTags = true,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTagAdd = (tag: string) => {
    if (tag.trim() !== '' && !selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      onTagsChange(newTags);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    onTagsChange(newTags);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      handleTagAdd(inputValue.trim());
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
      handleTagRemove(selectedTags[selectedTags.length - 1]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const filteredAvailableTags = availableTags
    .filter(tag => !selectedTags.includes(tag))
    .filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`${className}`}>
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map((tag, index) => (
          <motion.div
            key={index}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-sm bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            layout
          >
            <Tag className="h-3.5 w-3.5 mr-1" />
            <span>{tag}</span>
            <button
              type="button"
              className="ml-1 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
              onClick={() => handleTagRemove(tag)}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Tag input field */}
      <div className="relative">
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-primary-400 dark:focus-within:ring-primary-600 bg-white dark:bg-gray-800">
          <Tag className="ml-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
            className="flex-grow px-2 py-2 text-sm bg-transparent outline-none"
            placeholder="Add tags..."
          />
          {inputValue.trim() !== '' && allowCustomTags && (
            <button
              type="button"
              onClick={() => {
                handleTagAdd(inputValue.trim());
                setInputValue('');
              }}
              className="p-2 text-primary-500 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Available tags dropdown */}
        {isInputFocused && availableTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto"
          >
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-md outline-none focus:ring-1 focus:ring-primary-400"
                  placeholder="Search tags..."
                />
              </div>
            </div>
            
            {filteredAvailableTags.length > 0 ? (
              <div className="py-1">
                {filteredAvailableTags.map((tag, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    onClick={() => {
                      handleTagAdd(tag);
                      setSearchQuery('');
                    }}
                  >
                    <Tag className="h-3.5 w-3.5 mr-2 text-gray-500 dark:text-gray-400" />
                    {tag}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 italic">
                No matching tags found
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TaggingComponent;