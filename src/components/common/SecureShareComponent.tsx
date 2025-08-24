import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Users, Eye, Copy, CheckCircle, Link as LinkIcon } from 'lucide-react';
import FaceRecognitionModal from './FaceRecognitionModal';

type SecureShareComponentProps = {
  imageIds: string[];
  className?: string;
};

const SecureShareComponent: React.FC<SecureShareComponentProps> = ({
  imageIds,
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secureLink, setSecureLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [sharedDetails, setSharedDetails] = useState<{
    recipients: string[];
    date: string;
    expiryDate: string;
  } | null>(null);

  const handleShare = (emails: string[], settings: any) => {
    // Placeholder for actual API call to generate secure share link
    console.log('Sharing with face recognition to:', emails, settings);
    
    // Simulate API response with secure link
    const mockSecureLink = `https://smartclick.com/s/${Math.random().toString(36).substring(2, 10)}`;
    setSecureLink(mockSecureLink);
    
    // Set share details
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + settings.expiryDays);
    
    setSharedDetails({
      recipients: emails,
      date: today.toLocaleDateString(),
      expiryDate: expiryDate.toLocaleDateString(),
    });
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(secureLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`card ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Lock className="h-5 w-5 mr-2 text-primary-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Secure Sharing
          </h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Share your {imageIds.length} selected photos securely with face recognition technology. 
          Recipients will need to verify their identity to access the images.
        </p>

        {!secureLink ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary btn-md w-full"
            onClick={() => setIsModalOpen(true)}
          >
            <Users className="mr-2 h-5 w-5" />
            Share with Face Recognition
          </motion.button>
        ) : (
          <div className="space-y-4">
            <div className="bg-primary-50 dark:bg-gray-700 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-primary-600 dark:text-primary-400">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Secure Link Generated</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyLinkToClipboard}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {isCopied ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 break-all">
                {secureLink}
              </p>
            </div>

            {sharedDetails && (
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <p><span className="font-medium">Shared with:</span> {sharedDetails.recipients.join(', ')}</p>
                <p><span className="font-medium">Shared on:</span> {sharedDetails.date}</p>
                <p><span className="font-medium">Expires on:</span> {sharedDetails.expiryDate}</p>
              </div>
            )}

            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-secondary btn-sm"
                onClick={() => setIsModalOpen(true)}
              >
                Share Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary btn-sm"
              >
                <Eye className="mr-1 h-4 w-4" />
                Track Views
              </motion.button>
            </div>
          </div>
        )}
      </div>

      <FaceRecognitionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShare={handleShare}
      />
    </div>
  );
};

export default SecureShareComponent;