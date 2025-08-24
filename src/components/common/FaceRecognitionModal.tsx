import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Users, Lock, Mail, Share2 } from 'lucide-react';

type FaceRecognitionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onShare: (emails: string[], settings: any) => void;
};

const FaceRecognitionModal: React.FC<FaceRecognitionModalProps> = ({
  isOpen,
  onClose,
  onShare,
}) => {
  const [emails, setEmails] = useState<string[]>(['']);
  const [shareSettings, setShareSettings] = useState({
    allowDownload: false,
    expiryDays: 7,
    requireVerification: true,
    protectionLevel: 'medium',
  });

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails.length ? newEmails : ['']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmails = emails.filter(email => email.trim() !== '');
    onShare(validEmails, shareSettings);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
            variants={modalVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary-500" />
                  Face Recognition Sharing
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Recipients
                    </label>
                    {emails.map((email, index) => (
                      <div key={index} className="flex mb-2">
                        <div className="flex-grow relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            className="input pl-10"
                            placeholder="client@example.com"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEmailField(index)}
                          className="ml-2 p-2 text-gray-500 hover:text-red-500 dark:text-gray-400"
                          aria-label="Remove email"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addEmailField}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      + Add another email
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Protection Level
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={shareSettings.protectionLevel}
                        onChange={(e) => setShareSettings({ ...shareSettings, protectionLevel: e.target.value })}
                        className="input pl-10"
                      >
                        <option value="low">Low - Basic face matching</option>
                        <option value="medium">Medium - Dual factor verification</option>
                        <option value="high">High - Strict biometric verification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Link Expires After
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={shareSettings.expiryDays}
                        onChange={(e) => setShareSettings({ ...shareSettings, expiryDays: parseInt(e.target.value) })}
                        className="input"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        days
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowDownload"
                      checked={shareSettings.allowDownload}
                      onChange={(e) => setShareSettings({ ...shareSettings, allowDownload: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowDownload" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Allow downloads
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireVerification"
                      checked={shareSettings.requireVerification}
                      onChange={(e) => setShareSettings({ ...shareSettings, requireVerification: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requireVerification" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Require client verification
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-secondary btn-md"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn btn-primary btn-md"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Securely
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FaceRecognitionModal;