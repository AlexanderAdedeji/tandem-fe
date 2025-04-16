import React from 'react'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { useAchievements } from '@/app/achievements/context/AchievementContext'
export const AchievementsSection: React.FC = () => {
  const { achievements } = useAchievements()
  const recentAchievements = achievements.filter((a) => a.unlockedAt).slice(0, 3)
  if (recentAchievements.length === 0) return null
  return (
    <div>
      <h2 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9] mb-4">
        Recent Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="bg-white dark:bg-[#2B2C5D] p-4 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#5855FF] dark:bg-[#FF914D] rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                  {achievement.title}
                </h3>
                <p className="text-sm text-[#666] dark:text-[#AAA]">
                  {achievement.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
