import React from 'react'

import { ArrowLeft, Moon, Bell, LogOut, User } from 'lucide-react'
import { useAuth } from '../auth/hooks/useAuth'
import { useAchievements } from '../achievements/context/AchievementContext'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/shared/context/ThemeContext'

export const Settings: React.FC = () => {
  const router = useRouter()
  const { isDarkMode, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const { currentStreak } = useAchievements()
  const handleLogout = () => {
    logout()
    router.push('/login')
  }
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25]">
      <header className="p-6 flex items-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
        >
          <ArrowLeft size={20} className="text-[#2E2E2E] dark:text-[#E9E9E9]" />
        </button>
        <h1 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
          Settings
        </h1>
      </header>
      <div className="p-6">
        <div className="mb-8 flex items-center">
          <div className="w-24 h-24 rounded-full bg-[#5855FF] dark:bg-[#FF914D] flex items-center justify-center text-white text-3xl font-bold mr-4">
            A
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Alex Johnson
            </h2>
            <p className="text-[#666] dark:text-[#AAA]">alex@example.com</p>
            {currentStreak > 0 && (
              <div className="flex items-center mt-2 text-sm">
                <span className="text-[#5855FF] dark:text-[#FF914D] font-medium">
                  🔥 {currentStreak} day streak!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
            <img
              src="https://illustrations.popsy.co/white/theme-customization.svg"
              alt="Theme customization"
              className="w-32 h-32 mx-auto mb-4"
            />
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <User
                  size={20}
                  className="text-[#5855FF] dark:text-[#FF914D] mr-3"
                />
                <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                  Edit Profile
                </span>
              </div>
              <span className="text-gray-400">&gt;</span>
            </button>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <Moon
                  size={20}
                  className="text-[#5855FF] dark:text-[#FF914D] mr-3"
                />
                <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                  Dark Mode
                </span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <label
                  htmlFor="darkModeToggle"
                  className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${isDarkMode ? 'bg-[#5855FF] dark:bg-[#FF914D]' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span
                    className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transform transition-transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
            <img
              src="https://illustrations.popsy.co/white/notifications.svg"
              alt="Notifications"
              className="w-32 h-32 mx-auto mb-4"
            />
            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <Bell
                  size={20}
                  className="text-[#5855FF] dark:text-[#FF914D] mr-3"
                />
                <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                  Notifications
                </span>
              </div>
              <span className="text-gray-400">&gt;</span>
            </button>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-4 bg-red-100 dark:bg-red-900 rounded-lg"
        >
          <LogOut size={20} className="text-red-500 dark:text-red-300 mr-2" />
          <span className="text-red-500 dark:text-red-300 font-medium">
            Log Out
          </span>
        </button>
      </div>
    </div>
  )
}
