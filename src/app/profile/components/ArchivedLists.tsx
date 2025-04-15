import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Archive, RotateCcw, Trash2, AlertCircle } from 'lucide-react'
import { useThemeCustomization } from '../../context/ThemeCustomizationContext'

import { useNavigate } from 'react-router-dom'
import { useList } from '@/app/lists/context/list-context'
interface DeleteConfirmationProps {
  onConfirm: () => void
  onCancel: () => void
  listTitle: string
}
const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onConfirm,
  onCancel,
  listTitle,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{
          scale: 0.95,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          scale: 0.95,
        }}
        className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6 max-w-sm w-full"
      >
        <div className="flex items-center mb-4">
          <AlertCircle size={24} className="text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Permanently Delete List
          </h3>
        </div>
        <p className="text-[#666] dark:text-[#AAA] mb-6">
          Are you sure you want to permanently delete "{listTitle}"? This action
          cannot be undone.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-[#2E2E2E] dark:text-[#E9E9E9]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg"
          >
            Delete Forever
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
export const ArchivedLists: React.FC = () => {
  const { colors } = useThemeCustomization()
  const { getArchivedLists, unarchiveList, deleteList } = useList()
  const navigate = useNavigate()
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    id: string
    title: string
  } | null>(null)
  const archivedLists = getArchivedLists()
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
  const handleUnarchive = (id: string) => {
    unarchiveList(id)
  }
  const handleDelete = (id: string) => {
    deleteList(id)
    setDeleteConfirmation(null)
  }
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9] flex items-center">
        <Archive
          size={20}
          className="mr-2"
          style={{
            color: colors.primary,
          }}
        />
        Archived Lists ({archivedLists.length})
      </h3>
      {archivedLists.map((list) => (
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
          exit={{
            opacity: 0,
            y: -20,
          }}
          className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => navigate(`/list/${list.id}`)}
            >
              <h4 className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
                {list.title}
              </h4>
              <p className="text-sm text-[#666] dark:text-[#AAA]">
                Archived on {formatDate(list.archivedAt || '')}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUnarchive(list?.id)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                style={{
                  color: colors.primary,
                }}
              >
                <RotateCcw size={20} />
              </button>
              <button
                onClick={() =>
                  setDeleteConfirmation({
                    id: list.id,
                    title: list.title,
                  })
                }
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
      {archivedLists.length === 0 && (
        <div className="text-center py-8 text-[#666] dark:text-[#AAA]">
          No archived lists
        </div>
      )}
      <AnimatePresence>
        {deleteConfirmation && (
          <DeleteConfirmation
            listTitle={deleteConfirmation.title}
            onConfirm={() => handleDelete(deleteConfirmation.id)}
            onCancel={() => setDeleteConfirmation(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
