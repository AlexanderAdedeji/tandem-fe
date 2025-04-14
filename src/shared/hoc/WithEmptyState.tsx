import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
interface EmptyStateProps {
  onCreateList: () => void
}
export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateList }) => {
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
        alt="Empty lists illustration"
        className="w-64 h-64 mx-auto mb-6"
      />
      <h3 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9] mb-2">
        Start Your First List
      </h3>
      <p className="text-[#666] dark:text-[#AAA] mb-6 max-w-sm mx-auto">
        Create your first list to start organizing tasks, events, or items.
        Collaborate with others and stay productive!
      </p>
      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        onClick={onCreateList}
        className="inline-flex items-center px-6 py-3 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium"
      >
        <Plus className="w-5 h-5 mr-2" />
        Create New List
      </motion.button>
    </motion.div>
  )
}
