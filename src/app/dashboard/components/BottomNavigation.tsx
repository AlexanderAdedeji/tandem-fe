'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Home, User, Plus, Calendar } from 'lucide-react'

export const BottomNavigation: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string): boolean => pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#2B2C5D] shadow-md border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-around py-3">
        <button
          onClick={() => router.push('/dashboard')}
          className={`flex flex-col items-center justify-center px-4 py-2 ${isActive('/dashboard') ? 'text-[#5855FF] dark:text-[#FF914D]' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button
          onClick={() => router.push('/calendar')}
          className={`flex flex-col items-center justify-center px-4 py-2 ${isActive('/calendar') ? 'text-[#5855FF] dark:text-[#FF914D]' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Calendar size={24} />
          <span className="text-xs mt-1">Calendar</span>
        </button>

        <button
          onClick={() => router.push('/create-list')}
          className="flex flex-col items-center justify-center px-4 py-2 text-gray-500 dark:text-gray-400"
        >
          <div className="w-12 h-12 bg-[#5855FF] dark:bg-[#FF914D] rounded-full flex items-center justify-center text-white -mt-8 shadow-md">
            <Plus size={24} />
          </div>
        </button>

        <button
          onClick={() => router.push('/search')}
          className={`flex flex-col items-center justify-center px-4 py-2 ${isActive('/search') ? 'text-[#5855FF] dark:text-[#FF914D]' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </button>

        <button
          onClick={() => router.push('/profile')}
          className={`flex flex-col items-center justify-center px-4 py-2 ${isActive('/profile') ? 'text-[#5855FF] dark:text-[#FF914D]' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  )
}
