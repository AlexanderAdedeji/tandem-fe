import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { List } from '../../types'
interface ListsGridProps {
  lists: List[]
}
export const ListsGrid: React.FC<ListsGridProps> = ({ lists }) => {
  const navigate = useNavigate()
  if (lists.length === 0) {
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
        className="text-center py-12"
      >
        <motion.img
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
          }}
          src="https://illustrations.popsy.co/white/productive-work.svg"
          alt="No lists"
          className="w-48 h-48 mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Lists Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Create your first list to get started
        </p>
      </motion.div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lists.map((list, index) => (
        <motion.div
          key={list.id}
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
          onClick={() => navigate(`/list/${list.id}`)}
          className="bg-white dark:bg-[#2B2C5D] p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {list.title}
            </h3>
            {list.collaborators > 0 && (
              <span className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                {list.collaborators} collaborators
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {list.itemCount} items • Updated{' '}
            {new Date(list.updatedAt).toLocaleDateString()}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
