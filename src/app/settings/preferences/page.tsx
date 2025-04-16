import React from 'react'
import { Settings, Globe, Calendar, Clock } from 'lucide-react'
export const PreferencesSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Preferences
          </h2>
          <p className="text-[#666] dark:text-[#AAA]">
            Customize your app experience
          </p>
        </div>
        <Settings className="w-10 h-10 text-[#5855FF] dark:text-[#FF914D]" />
      </div>
      {/* Language & Region */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Globe className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Language & Region
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              Language
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              Time Zone
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central European Time (CET)</option>
            </select>
          </div>
        </div>
      </div>
      {/* Date & Time */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Calendar className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Date & Time
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              Date Format
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY/MM/DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              Time Format
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <option>12-hour</option>
              <option>24-hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
