import React, { useState, createElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Archive,
  ArrowLeft,
  Search,
  Filter,
  RotateCcw,
  Trash2,
  Calendar,
  CheckSquare,
  ShoppingCart,
  Gift,
  Target,
  Receipt,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useList } from '@/app/lists/context/list-context'
import { ListType } from '@/shared/model'
import { useRouter } from 'next/navigation'

type SortOption = 'date' | 'name' | 'type'
type FilterType = ListType | 'all'
const listTypeIcons = {
  grocery: ShoppingCart,
  tasks: CheckSquare,
  event: Calendar,
  registry: Gift,
  goal: Target,
  bills: Receipt,
  other:Receipt
}
const listTypeColors = {
  grocery: 'text-green-500',
  tasks: 'text-[#5855FF]',
  event: 'text-[#FFC45E]',
  registry: 'text-purple-500',
  goal: 'text-emerald-500',
  bills: 'text-violet-500',
  other:"text-slate-800"
}
export const ArchivedListScreen: React.FC = () => {
  const router = useRouter()
  const { getArchivedLists, unarchiveList, deleteList } = useList()
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  )
  const archivedLists = getArchivedLists()
  const filteredLists = archivedLists
    .filter((list) => {
      const matchesSearch = list.title
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesType = filterType === 'all' || list.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'type':
          return a.type.localeCompare(b.type)
        case 'date':
        default:
          return (
            new Date(b.archivedAt || '').getTime() -
            new Date(a.archivedAt || '').getTime()
          )
      }
    })
  const handleUnarchive = (id: string) => {
    unarchiveList(id)
  }
  const handleDelete = (id: string) => {
    deleteList(id)
    setShowDeleteConfirm(null)
  }
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25]">
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
          >
            <ArrowLeft
              size={20}
              className="text-[#2E2E2E] dark:text-[#E9E9E9]"
            />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Archived Lists
            </h1>
            <p className="text-sm text-[#666] dark:text-[#AAA]">
              {filteredLists.length} archived{' '}
              {filteredLists.length === 1 ? 'list' : 'lists'}
            </p>
          </div>
        </div>
      </header>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search archived lists..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#2B2C5D] rounded-lg text-[#2E2E2E] dark:text-[#E9E9E9]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-white dark:bg-[#2B2C5D]"
          >
            <Filter size={20} className="text-[#5855FF] dark:text-[#FF914D]" />
          </button>
        </div>
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white dark:bg-[#2B2C5D] rounded-lg p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-[#666] dark:text-[#AAA] mb-2">
                    Sort by
                  </h3>
                  <div className="flex gap-2">
                    {(['date', 'name', 'type'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortBy(option)}
                        className={`px-3 py-1 rounded-full text-sm ${sortBy === option ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-100 dark:bg-gray-800 text-[#666] dark:text-[#AAA]'}`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#666] dark:text-[#AAA] mb-2">
                    Filter by type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilterType('all')}
                      className={`px-3 py-1 rounded-full text-sm ${filterType === 'all' ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-100 dark:bg-gray-800 text-[#666] dark:text-[#AAA]'}`}
                    >
                      All
                    </button>
                    {Object.keys(listTypeIcons).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type as ListType)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center ${filterType === type ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-100 dark:bg-gray-800 text-[#666] dark:text-[#AAA]'}`}
                      >
                        {createElement(
                          listTypeIcons[type as keyof typeof listTypeIcons],
                          {
                            size: 14,
                            className: 'mr-1',
                          },
                        )}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="space-y-4">
          {filteredLists.map((list) => {
            const Icon = listTypeIcons[list.type]
            return (
              <motion.div
                key={list.id}
                layout
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
                <div className="flex items-start">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 mr-3">
                    <Icon className={`w-5 h-5 ${listTypeColors[list.type]}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
                      {list.title}
                    </h3>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-sm text-[#666] dark:text-[#AAA]">
                        {list.itemCount} items
                      </span>
                      <span className="text-sm text-[#666] dark:text-[#AAA]">
                        Archived{' '}
                        {new Date(list.archivedAt || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() => handleUnarchive(list.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-[#5855FF] dark:text-[#FF914D]"
                    >
                      <RotateCcw size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() => setShowDeleteConfirm(list.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-red-500"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
          {filteredLists.length === 0 && (
            <div className="text-center py-12">
              <Archive
                size={48}
                className="text-gray-300 dark:text-gray-600 mx-auto mb-4"
              />
              <p className="text-[#666] dark:text-[#AAA]">
                No archived lists found
              </p>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showDeleteConfirm && (
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
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
              <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9] mb-2">
                Delete Forever?
              </h3>
              <p className="text-[#666] dark:text-[#AAA] mb-6">
                This action cannot be undone. The list and all its items will be
                permanently deleted.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-[#2E2E2E] dark:text-[#E9E9E9]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg"
                >
                  Delete Forever
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
