import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, Upload, X, Trash2, ExternalLink, Pencil, CheckCircle, Clock, Tag, AlertCircle } from 'lucide-react';
import UploadButton from '../../components/common/UploadButton';

type EventType = 'wedding' | 'portrait' | 'event' | 'product' | 'landscape' | 'other';

type PhotoUpload = {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
};

const AddEventPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState<EventType>('event');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [uploads, setUploads] = useState<PhotoUpload[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [enableAIOrganize, setEnableAIOrganize] = useState(true);

  const handlePhotosUpload = (files: File[]) => {
    const newUploads = files.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
    }));
    
    setUploads(prev => [...prev, ...newUploads]);
  };

  const removeUpload = (id: string) => {
    setUploads(prev => {
      const filtered = prev.filter(upload => upload.id !== id);
      // Revoke object URLs to avoid memory leaks
      const uploadToRemove = prev.find(upload => upload.id === id);
      if (uploadToRemove) {
        URL.revokeObjectURL(uploadToRemove.preview);
      }
      return filtered;
    });
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate event creation and file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update upload statuses
    setUploads(prev => prev.map(upload => ({
      ...upload,
      status: 'uploading',
      progress: 0,
    })));
    
    // Simulate file upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploads(prev => prev.map(upload => ({
        ...upload,
        status: progress === 100 ? 'success' : 'uploading',
        progress,
      })));
    }
    
    setIsCreating(false);
    
    // In a real app, you would navigate to the event page or show a success message
    alert('Event created successfully with ' + uploads.length + ' photos!');
  };

  const eventTypes: { value: EventType; label: string }[] = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'portrait', label: 'Portrait Session' },
    { value: 'event', label: 'Event or Party' },
    { value: 'product', label: 'Product Photography' },
    { value: 'landscape', label: 'Landscape/Travel' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <Calendar className="h-6 w-6 text-primary-500 mr-3" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Photography Event
          </h1>
        </div>

        <form onSubmit={handleCreateEvent}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Details */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Event Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label 
                      htmlFor="eventName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Event Name *
                    </label>
                    <input
                      id="eventName"
                      type="text"
                      required
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="input"
                      placeholder="Summer Wedding"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="eventDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Event Date *
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="input"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="eventType"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value as EventType)}
                      className="input"
                      required
                    >
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label 
                      htmlFor="eventLocation"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Location
                    </label>
                    <input
                      id="eventLocation"
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="input"
                      placeholder="City, Country or Venue"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="eventDescription"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="eventDescription"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      className="input min-h-[100px]"
                      placeholder="Brief description of the event..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">
                    Client Information (Optional)
                  </h3>

                  <div>
                    <label 
                      htmlFor="clientName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Client Name
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="input"
                      placeholder="John & Jane Doe"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="clientEmail"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Client Email
                    </label>
                    <input
                      id="clientEmail"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="input"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Upload Photos
                </h2>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    Drag and drop your photos here, or click the button below to browse
                  </p>
                  
                  <UploadButton 
                    onUpload={handlePhotosUpload}
                    multiple={true}
                    accept="image/*"
                    label="Select Photos"
                    variant="primary"
                  />
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Supported formats: JPG, PNG, HEIC, RAW
                  </p>
                </div>

                {/* AI Organization Option */}
                <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start">
                    <input
                      id="aiOrganize"
                      type="checkbox"
                      checked={enableAIOrganize}
                      onChange={(e) => setEnableAIOrganize(e.target.checked)}
                      className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <label 
                        htmlFor="aiOrganize" 
                        className="text-sm font-medium text-gray-900 dark:text-white flex items-center"
                      >
                        <span>AI-powered Photo Organization</span>
                        <Tag className="ml-2 h-4 w-4 text-primary-500" />
                      </label>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Automatically organize uploads by facial recognition, composition quality, and chronological order
                      </p>
                    </div>
                  </div>
                </div>

                {/* Uploaded Photos Preview */}
                {uploads.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Selected Photos ({uploads.length})
                    </h3>
                    
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {uploads.map((upload) => (
                        <div 
                          key={upload.id}
                          className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                        >
                          <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-3">
                            <img 
                              src={upload.preview} 
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {upload.file.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(upload.file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            
                            {upload.status === 'uploading' && upload.progress !== undefined && (
                              <div className="w-full mt-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                                <div 
                                  className="bg-primary-500 h-1.5 rounded-full" 
                                  style={{ width: `${upload.progress}%` }}
                                ></div>
                              </div>
                            )}
                            
                            {upload.status === 'success' && (
                              <span className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Uploaded successfully
                              </span>
                            )}
                            
                            {upload.status === 'error' && (
                              <span className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Upload failed
                              </span>
                            )}
                          </div>
                          
                          {upload.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => removeUpload(upload.id)}
                              className="ml-2 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                type="button"
                className="btn btn-secondary btn-lg"
              >
                Cancel
              </button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isCreating || uploads.length === 0}
                className="btn btn-primary btn-lg"
              >
                {isCreating ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Event...
                  </div>
                ) : (
                  <>
                    <Calendar className="mr-2 h-5 w-5" />
                    Create Event
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventPage;