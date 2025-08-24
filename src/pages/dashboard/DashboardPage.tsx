import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  HardDrive, 
  Image as ImageIcon, 
  Users, 
  Calendar, 
  FileImage, 
  PlusCircle,
  Settings as SettingsIcon,
  BarChart2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [storageUsed, setStorageUsed] = useState(2.7); // GB
  const [storageTotal, setStorageTotal] = useState(10); // GB

  // Calculate storage percentage
  const storagePercentage = (storageUsed / storageTotal) * 100;
  
  // Recent activities (mock data)
  const recentActivities = [
    { id: 1, action: 'Uploaded 24 photos', event: 'Beach Wedding', time: '2 hours ago' },
    { id: 2, action: 'Edited 5 photos', event: 'Product Shoot', time: '5 hours ago' },
    { id: 3, action: 'Shared album', event: 'Corporate Event', time: 'Yesterday' },
    { id: 4, action: 'Added new event', event: 'Mountain Landscape', time: '3 days ago' },
  ];

  // Quick stats (mock data)
  const quickStats = [
    { id: 1, label: 'Total Photos', value: '1,247', icon: <FileImage className="h-5 w-5 text-indigo-500" /> },
    { id: 2, label: 'Events', value: '32', icon: <Calendar className="h-5 w-5 text-emerald-500" /> },
    { id: 3, label: 'Shared Albums', value: '8', icon: <Users className="h-5 w-5 text-amber-500" /> },
    { id: 4, label: 'AI Edits', value: '86', icon: <BarChart2 className="h-5 w-5 text-rose-500" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting and storage overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name || 'Photographer'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's an overview of your photography workspace
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-md"
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              Workspace Settings
            </motion.button>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center mb-4 sm:mb-0 sm:mr-8">
              <HardDrive className="h-8 w-8 text-primary-500 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Storage</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {storageUsed.toFixed(1)} GB of {storageTotal} GB used
                </p>
              </div>
            </div>
            <div className="flex-grow">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    storagePercentage > 90 
                      ? 'bg-red-500' 
                      : storagePercentage > 70 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                  }`}
                  style={{ width: `${storagePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map(stat => (
          <motion.div
            key={stat.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-5"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/events/add">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 mb-3">
                    <PlusCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">New Event</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Create a photo event
                  </p>
                </motion.div>
              </Link>

              <Link to="/gallery">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-3">
                    <ImageIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Gallery</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Browse your photos
                  </p>
                </motion.div>
              </Link>

              <Link to="/sharing/face-recognition">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-3">
                    <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Secure Sharing</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Share with clients
                  </p>
                </motion.div>
              </Link>
            </div>

            <div className="mt-6">
              <Link to="/events/add">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary btn-lg w-full"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload New Photos
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-5">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
                    <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-1">
                      {activity.event}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
              <a 
                href="#" 
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all activity →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;