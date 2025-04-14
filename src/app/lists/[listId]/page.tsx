'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useList } from '../context/list-context'
import { ArrowLeft } from 'lucide-react'

// Import list type components
import GroceryList from '../grocery-list/GroceryList'
import EventList from '../event-list/EventList'
import GoalList from '../goal-list/GoaList'
import RegistryList from '../registry-list/RegistryList'

export default function ListPage({ params }: { params: Promise<{ listId: string }> }) {
  const router = useRouter()
  const { getListById } = useList()
  const [list, setList] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Unwrap the params Promise
  const resolvedParams = React.use(params)

  useEffect(() => {
    // Extract the actual ID from the URL (remove the -list suffix)
    const actualId = resolvedParams.listId.replace(/-list$/, '')
    const foundList = getListById(actualId)
    
    if (foundList) {
      setList(foundList)
    } else {
      // Handle list not found
      console.error('List not found')
    }
    
    setLoading(false)
  }, [resolvedParams.listId, getListById])

  if (loading) {
    return <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] p-6">Loading...</div>
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
            >
              <ArrowLeft size={20} className="text-[#2E2E2E] dark:text-[#E9E9E9]" />
            </button>
            <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
              List not found
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            The list you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 px-4 py-2 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Render the appropriate list component based on the list type
  const renderListComponent = () => {
    switch (list.type) {
      case 'grocery':
        return <GroceryList items={[]} onUpdateItems={() => {}} />
      case 'event':
        return <EventList items={[]} onUpdateItems={() => {}} />
      case 'goal':
        return (
          <GoalList
            goal={list.title}
            targetDate={list.targetDate || new Date().toISOString()}
            steps={[]}
            onUpdateSteps={() => {}}
            onGenerateSteps={async () => {}}
          />
        )
      case 'registry':
        return (
          <RegistryList
            registryTitle={list.title}
            items={[]}
            onClaimItem={() => {}}
            onUnclaimItem={() => {}}
            onMarkPurchased={() => {}}
            onAddItems={() => {}}
          />
        )
      default:
        return <div>Unsupported list type: {list.type}</div>
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
          >
            <ArrowLeft size={20} className="text-[#2E2E2E] dark:text-[#E9E9E9]" />
          </button>
          <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            {list.title}
          </h1>
        </div>
        {renderListComponent()}
      </div>
    </div>
  )
}
