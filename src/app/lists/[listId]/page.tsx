'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useList } from '../context/list-context'
import { ListDetail } from '../components/list-details'
import { ArrowLeft } from 'lucide-react'

// Import list type components
import GroceryList from '../grocery-list/GroceryList'
import EventList from '../event-list/EventList'
import GoalList from '../goal-list/GoaList'
import RegistryList from '../registry-list/RegistryList'
import GroceryPage from '../grocery-list/page'
import EventPage from '../event-list/page'
import RegistryPage from '../registry-list/page'
import GoalPage from '../goal-list/page'

export default function ListPage() {
  const router = useRouter()
  const params = useParams()
  const { getListById } = useList()
  const [listExists, setListExists] = useState<boolean | null>(null)
  const [listId, setListId] = useState<string | null>(null)
  const [list, setList] = useState<any>(null)

  useEffect(() => {
    if (params?.listId) {
      const id = params.listId as string
      setListId(id)
      const foundList = getListById(id)
      setListExists(!!foundList)
      setList(foundList)
    }
  }, [params?.listId, getListById])

  if (listExists === null) {
    return <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] p-6">Loading...</div>
  }

  if (!listExists || !listId || !list) {
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
    switch (listId) {
      case 'grocery':
        return <GroceryPage />
      case 'event':
        return <EventPage/>
      case 'goal':
        return (
         <GoalPage/>)
      case 'registry':
      return <RegistryPage/>

      default:
        return <div>Unsupported list type: {listId}</div>
    }
  }

  return (

        <ListDetail listId={listId} />
 
  )
}
