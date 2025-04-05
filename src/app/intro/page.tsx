'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


import { ChevronRight, X } from 'lucide-react'
import { IntroScreen } from './intro-screen'
const screens = [
  {
    title: 'Welcome to Flocksy',
    description:
      'Your all-in-one solution for collaborative task management and event planning.',
    illustration: 'https://illustrations.popsy.co/white/work-from-home.svg',
    color: '#5855FF',
  },
  {
    title: 'Smart Lists',
    description:
      'Create and manage lists with AI-powered suggestions and real-time collaboration.',
    illustration: 'https://illustrations.popsy.co/white/success.svg',
    color: '#FF914D',
  },
  {
    title: 'Calendar Integration',
    description:
      'Seamlessly sync your tasks and events with an intelligent calendar view.',
    illustration: 'https://illustrations.popsy.co/white/virtual-reality.svg',
    color: '#10B981',
  },
  {
    title: 'Get Started',
    description:
      'Join thousands of users making their lives more organized with Flocksy.',
    illustration: 'https://illustrations.popsy.co/white/rocket-launch.svg',
    color: '#8B5CF6',
  },
]
const IntroScreens: React.FC = () => {
//   const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState(0)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenIntro')
    if (seen) {
      // navigate('/login')
    }
  }, [])
  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      completeIntro()
    }
  }
  const completeIntro = () => {
    localStorage.setItem('hasSeenIntro', 'true')
    setHasSeenIntro(true)
    // navigate('/login')
  }
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-[#1A1B25] dark:to-[#2B2C5D]">
      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        onClick={completeIntro}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </motion.button>
      <AnimatePresence mode="wait">
        <IntroScreen key={currentScreen} {...screens[currentScreen]} />
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-[#1A1B25] pb-8">
        <div className="flex justify-center space-x-2 mb-8">
          {screens.map((_, index) => (
            <motion.div
              key={index}
              initial={{
                scale: 0.8,
              }}
              animate={{
                scale: index === currentScreen ? 1 : 0.8,
                backgroundColor:
                  index === currentScreen
                    ? screens[currentScreen].color
                    : 'rgb(209 213 219)',
              }}
              className={`w-2 h-2 rounded-full transition-colors`}
            />
          ))}
        </div>
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-medium flex items-center justify-center text-white shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: screens[currentScreen].color,
            boxShadow: `0 8px 32px -8px ${screens[currentScreen].color}80`,
          }}
        >
          {currentScreen === screens.length - 1 ? (
            'Get Started'
          ) : (
            <>
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}



export default IntroScreens