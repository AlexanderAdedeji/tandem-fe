'use client'

import React from 'react'
import { MessageSquare, Volume2, Bell, Clock } from 'lucide-react'
const ChatSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Chat Settings
          </h2>
          <p className="text-[#666] dark:text-[#AAA]">
            Customize your chat experience
          </p>
        </div>
        <MessageSquare className="w-10 h-10 text-[#5855FF] dark:text-[#FF914D]" />
      </div>
      {/* General Settings */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Volume2 className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            General Settings
          </h3>
        </div>
        <div className="space-y-4">
          {[
            'Send read receipts',
            'Show typing indicators',
            'Message previews',
            'Auto-play media',
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5855FF] dark:peer-checked:bg-[#FF914D]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Bell className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Chat Notifications
          </h3>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              Notification Sound
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <option>Default</option>
              <option>Classic</option>
              <option>Silent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              Do Not Disturb
            </label>
            <select className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <option>Off</option>
              <option>1 hour</option>
              <option>Until tomorrow</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ChatSection