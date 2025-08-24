import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Info, Lock, Archive, CheckCircle, Clock, Download, Copy, Link, ExternalLink } from 'lucide-react';
import ImageCard from '../../components/common/ImageCard';
import SecureShareComponent from '../../components/common/SecureShareComponent';
import FaceRecognitionModal from '../../components/common/FaceRecognitionModal';

type ImageItem = {
  id: string;
  url: string;
  title?: string;
  tags?: string[];
  event?: string;
  favorite?: boolean;
  selected?: boolean;
};

type ShareItem = {
  id: string;
  recipients: string[];
  date: string;
  expiresOn: string;
  images: number;
  views: number;
  status: 'active' | 'expired';
  secure_link: string;
};

const FaceRecognitionPage: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [shares, setShares] = useState<ShareItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'select' | 'active' | 'archived'>('select');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch images and shares on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    const mockImages: ImageItem[] = Array.from({ length: 12 }, (_, i) => ({
      id: `img-${i + 1}`,
      url: `https://images.pexels.com/photos/${1000000 + i * 10000}/pexels-photo-${1000000 + i * 10000}.jpeg?auto=compress&cs=tinysrgb&w=600`,
      title: i % 3 === 0 ? `Photo ${i + 1}` : undefined,
      tags: i % 2 === 0 ? ['portrait', 'people'] : ['event'],
      event: i % 4 === 0 ? 'Family Portrait' : i % 3 === 0 ? 'Corporate Event' : 'Wedding',
      favorite: i % 7 === 0,
      selected: false,
    }));

    const mockShares: ShareItem[] = [
      {
        id: 'share-1',
        recipients: ['client@example.com', 'client2@example.com'],
        date: '2023-10-15',
        expiresOn: '2023-11-15',
        images: 24,
        views: 12,
        status: 'active',
        secure_link: 'https://smartclick.com/s/abc123',
      },
      {
        id: 'share-2',
        recipients: ['family@example.com'],
        date: '2023-09-20',
        expiresOn: '2023-10-20',
        images: 36,
        views: 28,
        status: 'expired',
        secure_link: 'https://smartclick.com/s/def456',
      },
    ];

    setImages(mockImages);
    setShares(mockShares);
  }, []);

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id) 
        : [...prev, id]
    );
  };

  const selectAllImages = () => {
    setSelectedImages(images.map(img => img.id));
  };

  const deselectAllImages = () => {
    setSelectedImages([]);
  };

  const handleShare = async (emails: string[], settings: any) => {
    // Mock API call to create a secure share
    console.log('Sharing with face recognition:', emails, settings, selectedImages);
    
    // In a real app, this would be an API call
    const newShare: ShareItem = {
      id: `share-${Date.now()}`,
      recipients: emails,
      date: new Date().toISOString().split('T')[0],
      expiresOn: new Date(Date.now() + settings.expiryDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      images: selectedImages.length,
      views: 0,
      status: 'active',
      secure_link: `https://smartclick.com/s/${Math.random().toString(36).substring(2, 10)}`,
    };
    
    setShares([newShare, ...shares]);
    setActiveTab('active');
    setSelectedImages([]);
  };

  const copyLink = (id: string) => {
    const share = shares.find(s => s.id === id);
    if (share) {
      navigator.clipboard.writeText(share.secure_link);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredImages = images.filter(img => {
    if (!searchQuery) return true;
    
    return (
      (img.title && img.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (img.tags && img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (img.event && img.event.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const activeShares = shares.filter(share => share.status === 'active');
  const archivedShares = shares.filter(share => share.status === 'expired');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Users className="h-6 w-6 text-primary-500 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Face Recognition Sharing
            </h1>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-2 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'select'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('select')}
              >
                Select Photos
              </button>
              <button
                className={`py-2 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'active'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('active')}
              >
                Active Shares
                {activeShares.length > 0 && (
                  <span className="ml-2 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs rounded-full px-2 py-0.5">
                    {activeShares.length}
                  </span>
                )}
              </button>
              <button
                className={`py-2 px-1 border-b-2 text-sm font-medium ${
                  activeTab === 'archived'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('archived')}
              >
                Archived
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === 'select' && (
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 mb-5">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                  placeholder="Search photos..."
                />
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <button
                  className="btn btn-secondary btn-sm flex-grow sm:flex-grow-0"
                  onClick={selectAllImages}
                >
                  Select All
                </button>
                <button
                  className="btn btn-secondary btn-sm flex-grow sm:flex-grow-0"
                  onClick={deselectAllImages}
                  disabled={selectedImages.length === 0}
                >
                  Deselect All
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary btn-sm flex-grow sm:flex-grow-0"
                  onClick={() => setIsModalOpen(true)}
                  disabled={selectedImages.length === 0}
                >
                  <Lock className="h-4 w-4 mr-1" />
                  Share Selected
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div 
                  key={image.id}
                  className={`relative cursor-pointer ${
                    selectedImages.includes(image.id) 
                      ? 'ring-2 ring-primary-500 rounded-lg' 
                      : ''
                  }`}
                  onClick={() => toggleImageSelection(image.id)}
                >
                  <ImageCard image={image} />
                  {selectedImages.includes(image.id) && (
                    <div className="absolute top-2 left-2 h-6 w-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {selectedImages.length > 0 && (
              <div className="mt-5 flex justify-between items-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedImages.length} photos selected
                  </span>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Lock className="h-4 w-4 mr-1" />
                  Share with Face Recognition
                </button>
              </div>
            )}
            
            {selectedImages.length > 0 && (
              <div className="mt-6 lg:max-w-md mx-auto">
                <SecureShareComponent imageIds={selectedImages} />
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'active' && (
          <div className="mt-6">
            {activeShares.length > 0 ? (
              <div className="space-y-5">
                {activeShares.map((share) => (
                  <div 
                    key={share.id} 
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-primary-500 mr-2" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              Shared with {share.recipients.length} recipient{share.recipients.length > 1 ? 's' : ''}
                            </h3>
                          </div>
                          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap">
                            {share.recipients.map((email, index) => (
                              <span key={index} className="mr-2">{email}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs px-2.5 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Created on {share.date}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Info className="h-4 w-4 mr-1" />
                            <span>Expires on {share.expiresOn}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Image className="h-4 w-4 mr-1" />
                            <span>{share.images} photos shared</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{share.views} views</span>
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Link className="h-4 w-4 mr-1" />
                            <span className="truncate">{share.secure_link}</span>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => copyLink(share.id)}
                            >
                              {copiedId === share.id ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy Link
                                </>
                              )}
                            </button>
                            <a
                              href={share.secure_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary btn-sm"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Open
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2">
                      <button className="btn btn-secondary btn-sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download All
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        <Archive className="h-4 w-4 mr-1" />
                        Archive
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No active shares
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Share your photos securely with face recognition to see them here.
                </p>
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => setActiveTab('select')}
                >
                  Share Photos Now
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'archived' && (
          <div className="mt-6">
            {archivedShares.length > 0 ? (
              <div className="space-y-5">
                {archivedShares.map((share) => (
                  <div 
                    key={share.id} 
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
                  >
                    <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="flex items-center">
                        <Archive className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Archived Share
                        </h3>
                      </div>
                      <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full">
                        Expired
                      </span>
                    </div>
                    
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Users className="h-4 w-4 mr-1" />
                            <span>
                              Shared with: {share.recipients.join(', ')}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Created: {share.date}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Expired: {share.expiresOn}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                            <Image className="h-4 w-4 mr-1" />
                            <span>{share.images} photos</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{share.views} total views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2">
                      <button className="btn btn-secondary btn-sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download Data
                      </button>
                      <button className="btn btn-primary btn-sm">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Reshare
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Archive className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No archived shares
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Expired or manually archived shares will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Face Recognition Modal */}
      <FaceRecognitionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShare={handleShare}
      />
    </div>
  );
};

export default FaceRecognitionPage;