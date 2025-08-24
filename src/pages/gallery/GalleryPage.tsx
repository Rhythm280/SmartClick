import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Grid, Calendar, Search, Filter, ChevronDown, SlidersHorizontal, Folder } from 'lucide-react';
import ImageCard from '../../components/common/ImageCard';

type ImageItem = {
  id: string;
  url: string;
  title?: string;
  tags?: string[];
  event?: string;
  date?: string;
  favorite?: boolean;
};

type Event = {
  id: string;
  name: string;
  date: string;
  count: number;
};

const GalleryPage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'events'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch images and events on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    const mockImages: ImageItem[] = Array.from({ length: 24 }, (_, i) => ({
      id: `img-${i + 1}`,
      url: `https://images.pexels.com/photos/${1000000 + i * 10000}/pexels-photo-${1000000 + i * 10000}.jpeg?auto=compress&cs=tinysrgb&w=600`,
      title: i % 3 === 0 ? `Photo ${i + 1}` : undefined,
      tags: i % 2 === 0 ? ['nature', 'landscape'] : i % 3 === 0 ? ['portrait', 'people'] : ['travel'],
      event: i % 4 === 0 ? 'Summer Wedding' : i % 3 === 0 ? 'Beach Portraits' : 'Mountain Trip',
      date: new Date(2023, i % 12, (i % 28) + 1).toISOString(),
      favorite: i % 7 === 0,
    }));

    const mockEvents: Event[] = [
      { id: 'event-1', name: 'Summer Wedding', date: '2023-07-15', count: 124 },
      { id: 'event-2', name: 'Beach Portraits', date: '2023-08-22', count: 56 },
      { id: 'event-3', name: 'Mountain Trip', date: '2023-09-10', count: 87 },
      { id: 'event-4', name: 'Corporate Event', date: '2023-10-05', count: 42 },
    ];

    setImages(mockImages);
    setEvents(mockEvents);
  }, []);

  const handleImageView = (id: string) => {
    console.log('Viewing image:', id);
    // In a real app, this would open a lightbox or navigate to a detail page
  };

  const handleImageEdit = (id: string) => {
    console.log('Editing image:', id);
    // In a real app, this would navigate to the editing page
  };

  const handleImageDelete = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, favorite: !img.favorite } : img
    ));
  };

  // Filter images based on search query and selected event
  const filteredImages = images.filter(img => {
    const matchesSearch = !searchQuery || 
      (img.title && img.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (img.tags && img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesEvent = !selectedEvent || img.event === selectedEvent;
    
    return matchesSearch && matchesEvent;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image className="h-6 w-6 text-primary-500 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Photo Gallery
            </h1>
          </div>
          
          <div className="flex space-x-2">
            <button
              className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid View
            </button>
            <button
              className={`btn ${view === 'events' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setView('events')}
            >
              <Folder className="h-4 w-4 mr-1" />
              Events
            </button>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
              placeholder="Search photos by title or tags..."
            />
          </div>
          
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedEvent || ''}
              onChange={(e) => setSelectedEvent(e.target.value || null)}
              className="input appearance-none pr-10"
            >
              <option value="">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.name}>
                  {event.name} ({event.count})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          
          <button
            className="btn btn-secondary btn-sm w-full sm:w-auto"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Advanced Filters
          </button>
        </div>

        {/* Advanced filters panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="input"
                    placeholder="From"
                  />
                  <input
                    type="date"
                    className="input"
                    placeholder="To"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags
                </label>
                <select className="input">
                  <option value="">Select Tags</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                  <option value="nature">Nature</option>
                  <option value="travel">Travel</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Favorites
                </label>
                <select className="input">
                  <option value="">Any</option>
                  <option value="favorites">Favorites Only</option>
                  <option value="not-favorites">Non-Favorites Only</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button className="btn btn-secondary btn-sm">
                Reset
              </button>
              <button className="btn btn-primary btn-sm">
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Gallery grid */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onView={handleImageView}
              onEdit={handleImageEdit}
              onDelete={handleImageDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Events view */}
      {view === 'events' && (
        <div className="space-y-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary-500 mr-2" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {event.name}
                    </h2>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 py-1 px-2 rounded-full">
                    {event.count} photos
                  </span>
                </div>
              </div>
              
              <div className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                {filteredImages
                  .filter(img => img.event === event.name)
                  .slice(0, 4)
                  .map((image) => (
                    <div 
                      key={image.id} 
                      className="aspect-square overflow-hidden rounded cursor-pointer relative group"
                      onClick={() => handleImageView(image.id)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.title || 'Photo'} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="p-2 bg-white rounded-full text-gray-800 hover:text-primary-500">
                          <Image className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium">
                  View All Photos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filteredImages.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-10 text-center">
          <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No images found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchQuery || selectedEvent 
              ? "We couldn't find any images matching your filters. Try adjusting your search criteria."
              : "You haven't uploaded any photos yet. Add a new event to get started."}
          </p>
          <button className="btn btn-primary btn-md">
            Upload Your First Photos
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;