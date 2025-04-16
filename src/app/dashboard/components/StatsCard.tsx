import React from 'react'
import { motion } from 'framer-motion'
interface StatsCardProps {
  icon: React.ReactNode
  title: string
  value: string
  trend?: string
}
export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  trend,
}) => {
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
      whileHover={{
        scale: 1.02,
      }}
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-sm text-[#666] dark:text-[#AAA]">{title}</h3>
      <p className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9] mt-1">
        {value}
      </p>
      {trend && <p className="text-xs text-green-500 mt-1">{trend}</p>}
    </motion.div>
  )
}
