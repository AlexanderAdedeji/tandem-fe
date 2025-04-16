import React from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
interface RecentActivityProps {
  lists: any[]
}
export const RecentActivity: React.FC<RecentActivityProps> = ({ lists }) => {
  const navigate = useNavigate()
  const recentLists = lists.slice(0, 3)
  return (
    <div>
      <h2 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9] mb-4">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {recentLists.map((list, index) => (
          <motion.div
            key={list.id}
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
            whileHover={{
              scale: 1.01,
            }}
            onClick={() => navigate(`/list/${list.id}`)}
            className="bg-white dark:bg-[#2B2C5D] p-4 rounded-xl cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                  {list.title}
                </h3>
                <p className="text-sm text-[#666] dark:text-[#AAA] flex items-center mt-1">
                  <Clock size={14} className="mr-1" />
                  Updated {new Date(list.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <ArrowRight className="text-[#666] dark:text-[#AAA]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
