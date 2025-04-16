import React from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Check,
  Users,
  Star,
  Calendar,
  Clock,
  Target,
  Award,
} from 'lucide-react'
interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color: string
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color,
}) => (
  <motion.div
    whileHover={{
      y: -4,
    }}
    className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4"
  >
    <div className="flex items-center justify-between mb-3">
      <div
        className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
      {trend && (
        <div
          className={`flex items-center text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
        >
          <TrendingUp
            className={`w-4 h-4 mr-1 ${!trend.isPositive && 'transform rotate-180'}`}
          />
          {trend.value}%
        </div>
      )}
    </div>
    <h3 className="text-gray-600 dark:text-gray-300 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
  </motion.div>
)
export const StatsOverview: React.FC = () => {
  const stats = [
    {
      title: 'Tasks Completed',
      value: 24,
      icon: <Check className="w-5 h-5 text-white" />,
      trend: {
        value: 12,
        isPositive: true,
      },
      color: 'bg-green-500',
    },
    {
      title: 'Active Collaborators',
      value: 8,
      icon: <Users className="w-5 h-5 text-white" />,
      trend: {
        value: 8,
        isPositive: true,
      },
      color: 'bg-blue-500',
    },
    {
      title: 'Current Streak',
      value: '7 days',
      icon: <Star className="w-5 h-5 text-white" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Upcoming Events',
      value: 3,
      icon: <Calendar className="w-5 h-5 text-white" />,
      color: 'bg-purple-500',
    },
  ]
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
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
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
