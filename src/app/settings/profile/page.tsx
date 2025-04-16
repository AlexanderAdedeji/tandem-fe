'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Camera, Mail, Phone } from 'lucide-react'
const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Profile Settings
          </h2>
          <p className="text-[#666] dark:text-[#AAA]">
            Manage your profile information
          </p>
        </div>
        <User className="w-10 h-10 text-[#5855FF] dark:text-[#FF914D]" />
      </div>
      {/* Profile Picture */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#5855FF] dark:bg-[#FF914D] flex items-center justify-center text-white text-2xl">
              A
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Camera className="w-4 h-4 text-[#5855FF] dark:text-[#FF914D]" />
            </button>
          </div>
          <div className="ml-6">
            <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Profile Picture
            </h3>
            <p className="text-[#666] dark:text-[#AAA] text-sm">
              Upload a new profile picture
            </p>
          </div>
        </div>
      </div>
      {/* Personal Information */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <User className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
            <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Personal Information
            </h3>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#5855FF]/10 dark:bg-[#FF914D]/10 text-[#5855FF] dark:text-[#FF914D] rounded-lg font-medium"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Alex Johnson"
              disabled={!isEditing}
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-70"
            />
          </div>
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-1">
              Email
            </label>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                defaultValue="alex@example.com"
                disabled={!isEditing}
                className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-70"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-1">
              Phone Number
            </label>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                disabled={!isEditing}
                className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg disabled:opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfileSection