import React from 'react'
import { motion } from 'framer-motion'
import { Star, Trophy, Sparkles, Award } from 'lucide-react'
interface LevelProgressProps {
  level: number
  xp: number
  xpNeeded: number
  recentAchievements: any[]
}
export const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  xp,
  xpNeeded,
  recentAchievements,
}) => {
  const progress = (xp / xpNeeded) * 100
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Level {level}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {xp} / {xpNeeded} XP
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="text-gray-600 dark:text-gray-300">Rank: Expert</span>
        </div>
      </div>
      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${progress}%`,
          }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5855FF] to-[#DC39FC] dark:from-[#FF914D] dark:to-[#FF5C77]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">
              Next Reward
            </span>
          </div>
          <p className="text-sm mt-2 text-gray-900 dark:text-white font-medium">
            Custom Theme Pack
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">Bonus XP</span>
          </div>
          <p className="text-sm mt-2 text-gray-900 dark:text-white font-medium">
            +50 XP Weekend
          </p>
        </div>
      </div>
      {recentAchievements.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
            Recent Achievements
          </h3>
          <div className="flex space-x-2">
            {recentAchievements.slice(0, 3).map((achievement, index) => (
              <motion.div
                key={index}
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-full px-3 py-1"
              >
                <Award className="w-4 h-4 text-[#5855FF] dark:text-[#FF914D] mr-2" />
                <span className="text-sm text-gray-900 dark:text-white">
                  {achievement.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
