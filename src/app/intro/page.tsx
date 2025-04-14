'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronLeft, X } from 'lucide-react'
import { IntroScreen } from './intro-screen'

const screens = [
  {
    title: 'Welcome to Tandem',
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
    illustration: 'https://illustrations.popsy.co/white/calendar.svg',
    color: '#10B981',
  },
  {
    title: 'Get Started',
    description:
      'Join thousands of users making their lives more organized with Tandem.',
    illustration: 'https://illustrations.popsy.co/white/taking-selfie.svg',
    color: '#8B5CF6',
  },
]

const IntroScreens: React.FC = () => {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState(0)
  const [direction, setDirection] = useState(0)

  // Preload illustrations
  useEffect(() => {
    screens.forEach(screen => {
      const img = new Image()
      img.src = screen.illustration
    })

  //   const seen = localStorage.getItem('hasSeenIntro')
  //   if (seen) {
  //     router.push('/login') // or skip to signup if needed
  //   }
  // }, [])

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setDirection(1)
      setCurrentScreen(currentScreen + 1)
    } else {
      completeIntro()
    }
  }

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setDirection(-1)
      setCurrentScreen(currentScreen - 1)
    }
  }

  const completeIntro = () => {
    localStorage.setItem('hasSeenIntro', 'true')
    router.push('/auth/signup')
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100 && currentScreen < screens.length - 1) {
      handleNext()
    } else if (info.offset.x > 100 && currentScreen > 0) {
      handlePrevious()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-[#1A1B25] dark:to-[#2B2C5D]">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={completeIntro}
        aria-label="Skip Intro"
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </motion.button>

      <motion.div
        className="h-full overflow-hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="h-full"
          >
            <IntroScreen {...screens[currentScreen]} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-[#1A1B25] pb-8">
        <div className="flex justify-center space-x-2 mb-8">
          {screens.map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8 }}
              animate={{
                scale: index === currentScreen ? 1 : 0.8,
                backgroundColor:
                  index === currentScreen
                    ? screens[currentScreen].color
                    : 'rgb(209 213 219)',
              }}
              className="w-2 h-2 rounded-full transition-colors cursor-pointer"
              onClick={() => {
                setDirection(index > currentScreen ? 1 : -1)
                setCurrentScreen(index)
              }}
            />
          ))}
        </div>

        <div className="flex gap-4">
          {currentScreen > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrevious}
              className="py-4 px-6 rounded-2xl font-medium flex items-center justify-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className={`${currentScreen > 0 ? 'flex-1' : 'w-full'} py-4 rounded-2xl font-medium flex items-center justify-center text-white shadow-lg backdrop-blur-sm`}
            style={{
              backgroundColor: screens[currentScreen].color,
              boxShadow: `0 8px 32px -8px ${screens[currentScreen].color}80`,
            }}
          >
            {currentScreen === screens.length - 1 ? 'Get Started' : (
              <>
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default IntroScreens
