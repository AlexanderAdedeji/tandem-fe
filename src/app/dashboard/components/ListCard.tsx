import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Collaborator {
  name: string
  avatar: string
}
interface ListCardProps {
  list: {
    id: string
    title: string
    type: string
    updatedAt: string
    collaborators?: Collaborator[]
    color?: string
  }
}
export const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const router = useRouter()
  const getGradient = (type: string) => {
    switch (type) {
      case 'grocery':
        return 'from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20'
      case 'tasks':
        return 'from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20'
      case 'event':
        return 'from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20'
      default:
        return 'from-[#5855FF]/10 to-[#DC39FC]/10 dark:from-[#5855FF]/20 dark:to-[#DC39FC]/20'
    }
  }
  const getAccentColor = (type: string) => {
    switch (type) {
      case 'grocery':
        return 'text-green-600 dark:text-green-400'
      case 'tasks':
        return 'text-blue-600 dark:text-blue-400'
      case 'event':
        return 'text-purple-600 dark:text-purple-400'
      default:
        return 'text-[#5855FF] dark:text-[#FF914D]'
    }
  }
  const formatDate = (date: string) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return d.toLocaleDateString()
  }
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      onClick={() => router.push(`/list/${list.id}`)}
      className={`bg-gradient-to-br ${getGradient(list.type)} rounded-xl p-6 cursor-pointer relative group border border-gray-100 dark:border-gray-700/50`}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
            {list.title}
          </h3>
          <span className={`text-sm ${getAccentColor(list.type)} capitalize`}>
            {list.type}
          </span>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          whileHover={{
            x: 4,
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(list.updatedAt)}
          </span>
        </div>
        {list.collaborators && list.collaborators.length > 0 && (
          <div className="flex items-center -space-x-2">
            {list.collaborators.slice(0, 3).map((collaborator, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-sm font-medium ring-2 ring-white dark:ring-gray-800"
              >
                {collaborator.avatar &&
                collaborator.avatar.startsWith('http') ? (
                  <img
                    src={collaborator.avatar}
                    alt={collaborator.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className={`${getAccentColor(list.type)}`}>
                    {collaborator.name.charAt(0)}
                  </span>
                )}
              </div>
            ))}
            {list.collaborators.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium ring-2 ring-white dark:ring-gray-800">
                <span className="text-gray-600 dark:text-gray-300">
                  +{list.collaborators.length - 3}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
