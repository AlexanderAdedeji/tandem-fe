'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { Plus, Settings, Home, Search, User } from 'lucide-react'

import { BottomNavigation } from './components/BottomNavigation'
import { useList } from '../lists/context/list-context'
import { EmptyState } from '@/shared/hoc/WithEmptyState'
import { ListCard } from '../lists/components/list-card'
import { RecommendationSection } from './components/recommendation-section'
import { useRouter } from 'next/navigation'
const Dashboard: React.FC = () => {
  const router = useRouter()
  const { lists } = useList()
  // Filter out archived lists
  const activeLists = lists.filter((list) => !list.archived)
  const handleCreateList = () => {
    router.push('/create-list')
  }
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] pb-20">
      <header className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            My Lists
          </h1>
          <p className="text-[#666] dark:text-[#AAA]">
            {activeLists.length > 0
              ? `You have ${activeLists.length} list${activeLists.length > 1 ? 's' : ''}`
              : 'Create your first list'}
          </p>
        </div>
        <button
          onClick={() => router.push('/settings')}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        >
          <Settings size={20} className="text-[#2E2E2E] dark:text-[#E9E9E9]" />
        </button>
      </header>
      <div className="p-6">
        <RecommendationSection />
        {activeLists.length === 0 ? (
          <EmptyState onCreateList={handleCreateList} />
        ) : (
          <div className="space-y-4">
            {activeLists.map((list) => (
              <ListCard
                key={list.id}
                list={list}
                onClick={() => router.push(`/list/${list.id}`)}
              />
            ))}
          </div>
        )}
      </div>
      <motion.button
        whileTap={{
          scale: 0.95,
        }}
        onClick={handleCreateList}
        className="fixed right-6 bottom-24 p-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-full shadow-lg"
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
        }}
      >
        <Plus size={24} />
      </motion.button>
      <BottomNavigation />
    </div>
  )
}



export default Dashboard