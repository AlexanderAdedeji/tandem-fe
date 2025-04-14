import React from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  CheckSquare,
  CalendarClock,
  Users,
  Gift,
  Target,
  Receipt,
} from 'lucide-react'
interface List {
  id: string
  title: string
  type: 'grocery' | 'tasks' | 'event' | 'other' | 'registry' | 'goal' | 'bills'
  itemCount: number
  collaborators: number
  updatedAt: string
}
interface ListCardProps {
  list: List
  onClick: () => void
}
export const ListCard: React.FC<ListCardProps> = ({ list, onClick }) => {
  const getIcon = () => {
    switch (list.type) {
      case 'grocery':
        return <ShoppingCart size={20} className="text-green-500" />
      case 'tasks':
        return <CheckSquare size={20} className="text-[#5855FF]" />
      case 'event':
        return <CalendarClock size={20} className="text-[#FFC45E]" />
      case 'registry':
        return <Gift size={20} className="text-purple-500" />
      case 'goal':
        return <Target size={20} className="text-emerald-500" />
      case 'bills':
        return <Receipt size={20} className="text-red-500" />
      default:
        return <CheckSquare size={20} className="text-[#5855FF]" />
    }
  }
  const getTypeLabel = () => {
    switch (list.type) {
      case 'grocery':
        return 'Grocery List'
      case 'tasks':
        return 'Task List'
      case 'event':
        return 'Event'
      case 'registry':
        return 'Registry'
      case 'goal':
        return 'Goal'
      case 'bills':
        return 'Bills'
      default:
        return 'List'
    }
  }
  return (
    <motion.div
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 mr-3">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              {list.title}
            </h3>
            <p className="text-sm text-[#666] dark:text-[#AAA]">
              {getTypeLabel()} • {list.itemCount} item
              {list.itemCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {list.collaborators > 0 && (
          <div className="flex items-center text-sm text-[#666] dark:text-[#AAA]">
            <Users size={16} className="mr-1" />
            <span>{list.collaborators}</span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-[#666] dark:text-[#AAA]">
        Updated {list.updatedAt}
      </div>
    </motion.div>
  )
}
