import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Shield, 
  Database, 
  CreditCard, 
  Bell, 
  LogOut, 
  Sun, 
  Moon, 
  Save, 
  Check, 
  Trash2,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Profile settings
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    experience: user?.experience || '',
    photographyType: user?.photographyType || '',
    bio: 'Professional photographer specializing in nature and portrait photography.',
    website: 'www.yourportfolio.com',
    instagram: '@yourinstagram',
  });

  // Password settings
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setIsSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setIsSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
    
    // Reset password form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <Settings className="h-6 w-6 text-primary-500 mr-3" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Account Settings
          </h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <nav className="space-y-1">
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  activeSection === 'profile' 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSection('profile')}
              >
                <User className="h-5 w-5 mr-2" />
                Profile Settings
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  activeSection === 'security' 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSection('security')}
              >
                <Shield className="h-5 w-5 mr-2" />
                Security
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  activeSection === 'storage' 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSection('storage')}
              >
                <Database className="h-5 w-5 mr-2" />
                Storage & Data
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  activeSection === 'billing' 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSection('billing')}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Billing & Plans
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  activeSection === 'notifications' 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSection('notifications')}
              >
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  activeSection === 'appearance' 
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveSection('appearance')}
              >
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 mr-2" />
                ) : (
                  <Sun className="h-5 w-5 mr-2" />
                )}
                Appearance
              </button>
              <button
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    Profile Information
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Update your personal information and how others see you on the platform.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/3">
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Profile Picture
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 mr-4">
                            <img 
                              src={user?.profilePicture || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"} 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <label className="btn btn-secondary btn-sm cursor-pointer">
                            <Upload className="h-4 w-4 mr-1" />
                            Change Photo
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Name
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="input"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="input"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/3">
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Years of Experience
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <input
                          type="number"
                          id="experience"
                          name="experience"
                          className="input"
                          value={profileForm.experience}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/3">
                        <label htmlFor="photographyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Photography Type
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <select
                          id="photographyType"
                          name="photographyType"
                          className="input"
                          value={profileForm.photographyType}
                          onChange={handleProfileChange}
                        >
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                          <option value="wedding">Wedding</option>
                          <option value="event">Event</option>
                          <option value="product">Product</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start">
                      <div className="md:w-1/3 pt-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          className="input"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Brief description about your photography style and experience.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/3">
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Website
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <input
                          type="text"
                          id="website"
                          name="website"
                          className="input"
                          value={profileForm.website}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/3">
                        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Instagram
                        </label>
                      </div>
                      <div className="md:w-2/3 mt-1 md:mt-0">
                        <input
                          type="text"
                          id="instagram"
                          name="instagram"
                          className="input"
                          value={profileForm.instagram}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary btn-md flex items-center"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="h-5 w-5 mr-2 text-green-500" />
                            Saved Successfully
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5 mr-2" />
                            Save Changes
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    Security Settings
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your account's security settings and change your password.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Change Password
                  </h3>
                  
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="input"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="input"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        At least 8 characters with mix of letters, numbers and symbols
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="input"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-primary btn-md"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                            Updating...
                          </>
                        ) : isSuccess ? (
                          <>
                            <Check className="h-5 w-5 mr-2 text-green-500" />
                            Password Updated
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Two-Factor Authentication
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Add an extra layer of security to your account
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        We'll ask for a verification code in addition to your password when you sign in.
                      </p>
                    </div>
                    <button className="btn btn-secondary btn-sm">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Login Sessions
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-600">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Current Session
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Chrome on MacOS - IP: 192.168.1.1
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Active Now
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          iPhone App
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Last active 2 days ago
                        </p>
                      </div>
                      <button className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium">
                        Revoke
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium flex items-center">
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign out from all devices
                    </button>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-red-800 dark:text-red-300 mb-2">
                    Danger Zone
                  </h3>
                  
                  <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  
                  <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium flex items-center border border-red-300 dark:border-red-700 rounded px-3 py-1.5">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Storage Settings */}
            {activeSection === 'storage' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    Storage & Data
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your storage usage and data export options.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Storage Usage
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        6.4 GB of 10 GB used
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        64%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                      <div 
                        className="bg-primary-500 h-2.5 rounded-full" 
                        style={{ width: '64%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-center">
                        <span className="block text-2xl font-semibold text-gray-900 dark:text-white">
                          4.2 GB
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Photos
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-center">
                        <span className="block text-2xl font-semibold text-gray-900 dark:text-white">
                          1.8 GB
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Edited Photos
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-center">
                        <span className="block text-2xl font-semibold text-gray-900 dark:text-white">
                          0.4 GB
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Other Files
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="btn btn-primary btn-sm">
                      Upgrade Storage
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Data Export
                  </h3>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Download all your photos and data as a backup or to transfer to another service.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <div>
                      <select className="input text-sm">
                        <option>Export All Data</option>
                        <option>Photos Only</option>
                        <option>Account Data Only</option>
                      </select>
                    </div>
                    <button className="btn btn-secondary btn-sm">
                      <Download className="h-4 w-4 mr-1" />
                      Request Export
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Data Management
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Automatic Image Compression
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Automatically compress images to save storage space
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Store Original RAW Files
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Keep original RAW files when uploading (uses more storage)
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Auto Delete Temp Files
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Automatically delete temporary editing files after 30 days
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    Appearance Settings
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customize how SmartClick looks for you.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Theme Mode
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 border ${
                        theme === 'light' 
                          ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/30 dark:border-primary-700' 
                          : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg cursor-pointer`}
                      onClick={() => theme !== 'light' && toggleTheme()}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Light Mode
                        </span>
                        {theme === 'light' && (
                          <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs px-2 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="bg-white border border-gray-200 rounded-md p-3 text-center">
                        <Sun className="h-8 w-8 text-amber-500 mx-auto" />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 border ${
                        theme === 'dark' 
                          ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/30 dark:border-primary-700' 
                          : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg cursor-pointer`}
                      onClick={() => theme !== 'dark' && toggleTheme()}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Dark Mode
                        </span>
                        {theme === 'dark' && (
                          <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs px-2 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="bg-gray-900 border border-gray-700 rounded-md p-3 text-center">
                        <Moon className="h-8 w-8 text-gray-400 mx-auto" />
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Choose a theme that's easy on your eyes. Dark mode is great for night time editing.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Interface Density
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Choose how compact the interface appears
                    </label>
                    <div className="relative">
                      <select className="input">
                        <option>Comfortable (Default)</option>
                        <option>Compact</option>
                        <option>Expanded</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Default photo grid view
                    </label>
                    <div className="relative">
                      <select className="input">
                        <option>Medium Thumbnails</option>
                        <option>Large Thumbnails</option>
                        <option>Small Thumbnails</option>
                        <option>List View</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Animations
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Enable Interface Animations
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Turn off to reduce motion if you experience any discomfort
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" checked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;