import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CheckSquare, Calendar, Target, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const QuickActions: React.FC = () => {
  const router = useRouter()
  const actions = [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: 'Shopping List',
      color: 'bg-green-500',
      onClick: () => router.push('/create-list?type=grocery'),
    },
    {
      icon: <CheckSquare className="w-6 h-6" />,
      label: 'Task List',
      color: 'bg-blue-500',
      onClick: () => router.push('/create-list?type=tasks'),
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'New Event',
      color: 'bg-purple-500',
      onClick: () => router.push('/calendar'),
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: 'Set Goal',
      color: 'bg-orange-500',
      onClick: () => router.push('/create-list?type=goal'),
    },
  ]
  return (
    <div>
      <h2 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9] mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            onClick={action.onClick}
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
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="flex flex-col items-center p-4 bg-white dark:bg-[#2B2C5D] rounded-xl"
          >
            <div className={`p-3 ${action.color} rounded-lg text-white mb-3`}>
              {action.icon}
            </div>
            <span className="text-sm text-[#2E2E2E] dark:text-[#E9E9E9]">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
