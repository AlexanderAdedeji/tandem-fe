'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


import {
  ShoppingCart,
  CheckSquare,
  CalendarClock,
  Gift,
  Target,
  ArrowRight,
  ArrowLeft,
  Receipt,
  Router,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useList } from './context/list-context'
const listTypes = [
  {
    id: 'grocery',
    title: 'Grocery List',
    description: 'Create a shopping list for groceries and household items',
    icon: ShoppingCart,
    illustration: 'https://illustrations.popsy.co/white/grocery-shopping.svg',
    color: 'text-green-500',
  },
  {
    id: 'tasks',
    title: 'Task List',
    description: 'Organize your tasks and track your progress',
    icon: CheckSquare,
    illustration: 'https://illustrations.popsy.co/white/task-list.svg',
    color: 'text-[#5855FF]',
  },
  {
    id: 'event',
    title: 'Event Planning',
    description: 'Plan events and coordinate with others',
    icon: CalendarClock,
    illustration: 'https://illustrations.popsy.co/white/party.svg',
    color: 'text-[#FFC45E]',
  },
  {
    id: 'registry',
    title: 'Gift Registry',
    description: 'Create a wishlist or gift registry',
    icon: Gift,
    illustration: 'https://illustrations.popsy.co/white/gift-box.svg',
    color: 'text-purple-500',
  },
  {
    id: 'goal',
    title: 'Goal Tracking',
    description: 'Set and track your personal or team goals',
    icon: Target,
    illustration: 'https://illustrations.popsy.co/white/target.svg',
    color: 'text-emerald-500',
  },
  {
    id: 'bills',
    title: 'Bill Management',
    description: 'Track and manage bills, set due dates and payment reminders',
    icon: Receipt,
    illustration: 'https://illustrations.popsy.co/white/bill-payment.svg',
    color: 'text-violet-500',
  },
]
const CreateList: React.FC = () => {
  const router = useRouter()
  const { addList } = useList()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [showForm, setShowForm] = useState(false)
  
  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId)
    setShowForm(true)
  }
  
  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedType || !title.trim()) return
    
    // Generate a unique ID for the list
    const listId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    
    const newList = {
      id: listId,
      title: title.trim(),
      type: selectedType as
        | 'grocery'
        | 'tasks'
        | 'event'
        | 'other'
        | 'registry'
        | 'goal'
        | 'bills',
      itemCount: 0,
      collaborators: 0,
      updatedAt: new Date().toISOString(),
    }
    
    // Add the list to the context
    addList(newList)
    
    // Navigate to the list detail page
    router.push(`/lists/${listId}`)
  }
  
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false)
                setSelectedType(null)
              } else {
                router.push('/dashboard')
              }
            }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
          >
            <ArrowLeft
              size={20}
              className="text-[#2E2E2E] dark:text-[#E9E9E9]"
            />
          </button>
          <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            {showForm ? 'Name your list' : 'Create New List'}
          </h1>
        </div>
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
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
              className="grid gap-4"
            >
              {listTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() => handleSelectType(type.id)}
                  className={`bg-white dark:bg-[#2B2C5D] rounded-xl p-4 cursor-pointer flex items-center ${selectedType === type.id ? 'ring-2 ring-[#5855FF] dark:ring-[#FF914D]' : ''}`}
                >
                  <div className="flex-1 flex items-center">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                      <type.icon className={`w-8 h-8 ${type.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2E2E2E] dark:text-[#E9E9E9] mb-1">
                        {type.title}
                      </h3>
                      <p className="text-sm text-[#666] dark:text-[#AAA]">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 ${selectedType === type.id ? 'text-[#5855FF] dark:text-[#FF914D]' : 'text-gray-400'}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.form
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
              onSubmit={handleCreateList}
              className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6"
            >
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#666] dark:text-[#AAA] mb-2">
                  List Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter list name"
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-[#2E2E2E] dark:text-[#E9E9E9] outline-none focus:ring-2 focus:ring-[#5855FF] dark:focus:ring-[#FF914D]"
                  autoFocus
                />
              </div>
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                disabled={!title.trim()}
                className={`w-full py-4 rounded-lg font-medium flex items-center justify-center ${title.trim() ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
              >
                Create List
                <ArrowRight size={18} className="ml-2" />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}



export default CreateList