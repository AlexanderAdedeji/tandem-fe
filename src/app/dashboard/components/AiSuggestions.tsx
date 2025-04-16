import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Target,
  Calendar,
  ShoppingCart,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
interface Suggestion {
  type: 'task' | 'event' | 'shopping' | 'goal'
  title: string
  description: string
  action: string
  icon: React.ReactNode
  color: string
}
export const AISuggestions: React.FC = () => {
  const navigate = useNavigate()
  const suggestions: Suggestion[] = [
    {
      type: 'task',
      title: 'Weekly Planning',
      description:
        "It's Monday! Create your weekly task list for better organization.",
      action: 'Create Task List',
      icon: <Target className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'event',
      title: 'Schedule Team Sync',
      description: "You haven't had a team meeting this week.",
      action: 'Schedule Event',
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      type: 'shopping',
      title: 'Grocery Planning',
      description: 'Your last grocery list was 2 weeks ago.',
      action: 'Create Shopping List',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
    },
  ]
  const handleAction = (type: string) => {
    switch (type) {
      case 'task':
        navigate('/create-list?type=tasks')
        break
      case 'event':
        navigate('/calendar')
        break
      case 'shopping':
        navigate('/create-list?type=grocery')
        break
      default:
        break
    }
  }
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
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Sparkles className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Suggestions
          </h2>
        </div>
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="text-sm text-[#5855FF] dark:text-[#FF914D]"
        >
          View All
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
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
            className="bg-white dark:bg-[#2B2C5D] rounded-xl overflow-hidden"
          >
            <div
              className={`bg-gradient-to-r ${suggestion.color} p-4 text-white`}
            >
              <div className="flex items-center justify-between">
                {suggestion.icon}
                <Sparkles className="w-4 h-4 opacity-50" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {suggestion.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {suggestion.description}
              </p>
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => handleAction(suggestion.type)}
                className="w-full py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {suggestion.action}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
