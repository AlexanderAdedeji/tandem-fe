'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import {
  ChevronRight,
  Users,
  CheckSquare,
  ShoppingCart,
  Moon,
  Sun,
} from 'lucide-react'
// import { useThemeCustomization } from '../context/ThemeCustomizationContext'
 const Onboarding: React.FC = () => {
const router = useRouter()
//   const { setIsDarkMode } = useThemeCustomization()
const setIsDarkMode = false
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      title: 'Welcome to Flocksy',
      description:
        'Create and manage lists with friends and family in real-time.',
      illustration:
        'https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/avatars/01.png',
      icon: <Users size={64} className="text-[#5855FF] dark:text-[#FF914D]" />,
    },
    {
      title: 'Stay Organized',
      description:
        'From grocery lists to task management, keep everything in one place.',
      illustration:
        'https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/avatars/02.png',
      icon: (
        <CheckSquare size={64} className="text-[#5855FF] dark:text-[#FF914D]" />
      ),
    },
    {
      title: 'Invite & Collaborate',
      description: 'Share lists and work together with anyone, anywhere.',
      illustration:
        'https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/avatars/03.png',
      icon: (
        <ShoppingCart
          size={64}
          className="text-[#5855FF] dark:text-[#FF914D]"
        />
      ),
    },
    {
      title: 'Choose Your Theme',
      description: 'Select your preferred theme to get started.',
      illustration:
        'https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/avatars/04.png',
      isThemeSelection: true,
    },
  ]
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push('/palette-selection')
    }
  }
  const handleSkip = () => {
    router.push('/palette-selection')
  }
  const handleThemeSelect = (isDark: boolean) => {
    // setIsDarkMode(isDark)
    handleNext()
  }
  return (
    <div className="fixed inset-0 bg-white dark:bg-[#1A1B25] flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#F7F8FA] dark:bg-[#2B2C5D] items-center justify-center p-12">
        <motion.img
          key={currentSlide}
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            duration: 0.5,
          }}
          src={slides[currentSlide].illustration}
          alt="Onboarding illustration"
          className="max-w-md w-full"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex justify-end p-6">
          <button
            onClick={handleSkip}
            className="text-[#5855FF] dark:text-[#FF914D] font-medium"
          >
            Skip
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              x: 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -100,
            }}
            className="max-w-md w-full"
          >
            <div className="text-center mb-8">
              <div className="mb-6 inline-block p-6 bg-[#F7F8FA] dark:bg-[#2B2C5D] rounded-full">
                {slides[currentSlide].icon}
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {slides[currentSlide].title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {slides[currentSlide].description}
              </p>
            </div>
            {slides[currentSlide].isThemeSelection ? (
              <div className="flex space-x-4">
                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => handleThemeSelect(false)}
                  className="flex-1 flex flex-col items-center p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-[#5855FF]"
                >
                  <Sun size={48} className="text-[#5855FF] mb-4" />
                  <span className="font-medium text-gray-900">Light</span>
                </motion.button>
                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => handleThemeSelect(true)}
                  className="flex-1 flex flex-col items-center p-6 rounded-xl bg-[#1A1B25] border-2 border-gray-700 hover:border-[#FF914D]"
                >
                  <Moon size={48} className="text-[#FF914D] mb-4" />
                  <span className="font-medium text-white">Dark</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileTap={{
                  scale: 0.95,
                }}
                onClick={handleNext}
                className="w-full py-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium flex items-center justify-center"
              >
                Next
                <ChevronRight className="ml-2" size={20} />
              </motion.button>
            )}
          </motion.div>
        </div>
        <div className="p-6">
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-[#5855FF] dark:bg-[#FF914D]' : 'bg-gray-300 dark:bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Onboarding