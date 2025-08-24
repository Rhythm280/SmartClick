import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, User, Mail, Lock, Eye, EyeOff, Calendar, Camera as CameraIcon, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    experience: '',
    photographyType: 'portrait',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<File[]>([]);
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>([]);
  
  const { register, error, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handlePortfolioImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPortfolioImages(prev => [...prev, ...files]);
      
      // Create preview URLs for the new images
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPortfolioPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removePortfolioImage = (index: number) => {
    setPortfolioImages(prev => prev.filter((_, i) => i !== index));
    setPortfolioPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare registration data with files
    const registrationData = {
      ...formData,
      age: formData.age ? parseInt(formData.age) : undefined,
      experience: formData.experience ? parseInt(formData.experience) : undefined,
      profilePicture: profilePicture || undefined,
      portfolioImages: portfolioImages.length > 0 ? portfolioImages : undefined,
    };
    
    await register(registrationData);
  };

  const photographyTypes = [
    'Portrait', 'Wedding', 'Event', 'Landscape', 'Wildlife', 
    'Street', 'Fashion', 'Sports', 'Architecture', 'Food', 'Other'
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto h-12 w-12 text-primary-500"
          >
            <Camera size={48} />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Join SmartClick
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your photography workspace and start managing your photos
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  At least 8 characters with mix of letters, numbers & symbols
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Age (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="16"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="30"
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Years of Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    max="70"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input"
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="photographyType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Photography Type
                </label>
                <select
                  id="photographyType"
                  name="photographyType"
                  value={formData.photographyType}
                  onChange={handleChange}
                  className="input"
                >
                  {photographyTypes.map((type) => (
                    <option key={type.toLowerCase()} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {profilePreview ? (
                      <img 
                        src={profilePreview}
                        alt="Profile preview" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label className="btn btn-secondary btn-sm cursor-pointer">
                      <CameraIcon className="h-4 w-4 mr-1" />
                      Choose Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      JPG, PNG or GIF, max 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Images (Full Width) */}
          <div>
            <label 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Portfolio Images (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4">
              <div className="flex flex-wrap gap-3 mb-3">
                {portfolioPreviews.map((preview, index) => (
                  <div key={index} className="relative group h-24 w-24">
                    <img 
                      src={preview}
                      alt={`Portfolio ${index + 1}`} 
                      className="h-full w-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removePortfolioImage(index)}
                      className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <EyeOff size={16} />
                    </button>
                  </div>
                ))}
                <label className="h-24 w-24 flex flex-col items-center justify-center border-2 border-gray-300 dark:border-gray-700 border-dashed rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <CameraIcon className="h-8 w-8 text-gray-400" />
                  <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePortfolioImagesChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showcase your best work. Add up to 10 images (max 10MB each).
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-lg w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Account...
                </div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;