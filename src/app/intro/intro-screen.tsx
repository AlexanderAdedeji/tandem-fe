import React from 'react'
import { motion } from 'framer-motion'
interface IntroScreenProps {
  title: string
  description: string
  illustration: string
  color: string
}
export const IntroScreen: React.FC<IntroScreenProps> = ({
  title,
  description,
  illustration,
  color,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="flex flex-col items-center justify-center px-6 py-12 h-full"
    >
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
          duration: 0.5,
        }}
        className="relative mb-12 w-full max-w-md"
      >
        <div
          className="absolute inset-0 blur-3xl opacity-20 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
        <motion.img
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          src={illustration}
          alt={title}
          className="relative w-full h-64 object-contain"
        />
      </motion.div>
      <motion.div
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="text-center max-w-md"
      >
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  )
}
