'use client'


import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Plus, ArrowRight } from 'lucide-react'

import { useList } from '@/app/lists/context/list-context'
import { useAI } from '@/shared/context/ai-context'

export const RecommendationSection: React.FC = () => {
  const { getRecommendations, categorizeTask } = useAI()
  const { lists } = useList()
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true)
      const tasks = lists.flatMap(
        (list) => list.title, // Using titles as a simple example
      )
      const newRecommendations = await getRecommendations(tasks)
      setRecommendations(newRecommendations)
      setIsLoading(false)
    }
    fetchRecommendations()
  }, [lists])
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4 mb-6">
        <div className="flex items-center mb-4">
          <Sparkles className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h2 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Getting Recommendations...
          </h2>
        </div>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex justify-center"
        >
          <Sparkles className="w-6 h-6 text-[#5855FF] dark:text-[#FF914D]" />
        </motion.div>
      </div>
    )
  }
  return (
    <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4 mb-6">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
        <h2 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
          AI Recommendations
        </h2>
      </div>
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
              {recommendation}
            </span>
            <ArrowRight className="w-4 h-4 text-[#5855FF] dark:text-[#FF914D]" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
