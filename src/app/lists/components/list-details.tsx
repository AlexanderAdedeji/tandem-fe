import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  MoreVertical,
  Plus,
  Check,
  Users,
  Trash2,
  X,
  MessageSquare,
  Archive,
  Calendar as CalendarIcon,
  ArrowRight,
} from 'lucide-react'

// import { ChatSection } from './Chat/ChatSection'
// import { CollaboratorList } from './CollaboratorList'
import { useList } from '../context/list-context'
import { BottomNavigation } from '@/app/dashboard/components/BottomNavigation'
import RegistryPage from '../registry-list/page'
import EventPage from '../event-list/page'
import GoalPage from '../goal-list/page'
import GroceryPage from '../grocery-list/page'
interface ListItem {
  id: string
  content: string
  description?: string
  completed: boolean
  dueDate?: string
  time?: string
  location?: string
  attendees?: number
  quantity?: number
  category?: string
  price?: string
  assignedTo?: string
  priority?: 'low' | 'medium' | 'high'
  links?: {
    url: string
    title: string
    type: string
  }[]
  virtualMeetingUrl?: string
}
interface RegistryItem extends ListItem {
  name: string
  claimedBy?: {
    name: string
    avatar: string
  }
  purchased: boolean
}

interface ListDetailProps {
  listId: string;
}

export const ListDetail: React.FC<ListDetailProps> = ({ listId }) => {
  const router = useRouter()
  const {
    getListById,
    deleteList,
    getListItems,
    updateListItems,
    archiveList,
    addItem,
  } = useList()
  const list = getListById(listId)
  const [items, setItems] = useState<ListItem[]>([])
  const [newItem, setNewItem] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [showItemDetails, setShowItemDetails] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showCollaborators, setShowCollaborators] = useState(false)
  const [collaborators] = useState([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'editor' as const,
      avatar: 'A',
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'viewer' as const,
      avatar: 'S',
    },
  ])
  
  const renderCalendarLink = (item: ListItem) => {
    if (!item.dueDate) return null
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          router.push('/calendar')
        }}
        className="flex items-center px-2 py-1 text-xs rounded-full bg-[#5855FF]/10 dark:bg-[#FF914D]/10 text-[#5855FF] dark:text-[#FF914D] hover:bg-[#5855FF]/20 dark:hover:bg-[#FF914D]/20 transition-colors"
      >
        <CalendarIcon size={12} className="mr-1" />
        View in Calendar
        <ArrowRight size={12} className="ml-1" />
      </button>
    )
  }
  const handleUpdateItems = (newItems: ListItem[]) => {
    setItems(newItems)
    updateListItems(listId, newItems)
  }
  const renderList = () => {
    switch (list?.type) {
      case 'event':
        return <EventPage />
      case 'registry':
        return <RegistryPage />
      case 'goal':
        return <GoalPage />
      case 'grocery':
        return <GroceryPage />
      default:
        return (
          <div className="bg-white dark:bg-[#2B2C5D] rounded-lg overflow-hidden">
            {items.length === 0 ? (
              <div className="p-6 text-center text-[#666] dark:text-[#AAA]">
                No items yet. Add your first item below.
              </div>
            ) : (
              <div>{items.map((item) => renderItem(item))}</div>
            )}
          </div>
        )
    }
  }
  useEffect(() => {
    if (listId) {
      const listItems = getListItems(listId)
      setItems(listItems)
    }
  }, [listId, getListItems])
  const handleToggleComplete = (itemId: string) => {
    const newItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
          }
        : item,
    )
    setItems(newItems)
    updateListItems(listId, newItems)
  }
  const handleClaimItem = (itemId: string) => {
    const newItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            claimedBy: {
              name: 'You',
              avatar: 'A',
            },
          }
        : item,
    ) as RegistryItem[]
    setItems(newItems)
    updateListItems(listId, newItems)
  }
  const handleUnclaimItem = (itemId: string) => {
    const newItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            claimedBy: undefined,
          }
        : item,
    ) as RegistryItem[]
    setItems(newItems)
    updateListItems(listId, newItems)
  }
  const handleAddItem = () => {
    if (!newItem || !list) return;
    
    try {
      if (list.type === 'registry') {
        const newRegistryItem: Omit<RegistryItem, 'id'> = {
          content: newItem,
          name: newItem,
          completed: false,
          purchased: false,
          description: '',
          price: '',
        };
        addItem(list.id, newRegistryItem);
      } else {
        const newListItem: Omit<ListItem, 'id'> = {
          content: newItem,
          completed: false,
          ...(list.type === 'grocery' ? { quantity: 1 } : {}),
          ...(list.type === 'tasks' ? { dueDate: '' } : {}),
        };
        addItem(list.id, newListItem);
      }
      
      // Update local items state
      const updatedItems = getListItems(list.id);
      setItems(updatedItems);
      
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  const handleDeleteItem = (itemId: string) => {
    const newItems = items.filter((item) => item.id !== itemId)
    setItems(newItems)
    updateListItems(listId, newItems)
  }
  const handleUpdateItem = (updatedItem: ListItem) => {
    const newItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    )
    setItems(newItems)
    updateListItems(listId, newItems)
  }
  const renderItem = (item: ListItem) => (
    <motion.div
      key={item.id}
      layout
      className="flex items-start p-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
    >
      <button
        onClick={() => handleToggleComplete(item.id)}
        className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-[#5855FF] dark:bg-[#FF914D]' : 'border-2 border-gray-300 dark:border-gray-600'}`}
      >
        {item.completed && <Check size={14} className="text-white" />}
      </button>
      <div className="flex-1">
        <div
          className={`${item.completed ? 'line-through text-gray-400' : 'text-[#2E2E2E] dark:text-[#E9E9E9]'}`}
        >
          {item.content}
        </div>
        <div className="flex items-center mt-2 space-x-4">
          {item.dueDate && (
            <div className="flex items-center text-xs text-[#5855FF] dark:text-[#FF914D]">
              <CalendarIcon size={12} className="mr-1" />
              {new Date(item.dueDate).toLocaleDateString()}
            </div>
          )}
          {renderCalendarLink(item)}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={item.dueDate?.split('T')[0] || ''}
          onChange={(e) => {
            const newItems = items.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    dueDate: e.target.value
                      ? `${e.target.value}T00:00:00`
                      : undefined,
                  }
                : i,
            )
            setItems(newItems)
            updateListItems(listId, newItems)
          }}
          className="text-sm p-1 rounded border dark:border-gray-700 bg-transparent"
        />
        <button
          onClick={() => {
            setSelectedItem(item)
            setShowItemDetails(true)
          }}
          className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <MoreVertical size={16} />
        </button>
        <button
          onClick={() => handleDeleteItem(item.id)}
          className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  )
  const getInputPlaceholder = () => {
    switch (list?.type) {
      case 'grocery':
        return 'Add item to shopping list...'
      case 'tasks':
        return 'Add a new task...'
      case 'event':
        return 'Add event item...'
      case 'registry':
        return 'Add gift to registry...'
      case 'goal':
        return 'Add step to goal...'
      default:
        return 'Add a new item...'
    }
  }
  const handleAddItems = (newItems: Partial<RegistryItem>[]) => {
    const itemsToAdd = newItems.map((item) => ({
      id: Date.now().toString() + Math.random(),
      content: item.name || '',
      name: item.name || '',
      description: item.description || '',
      price: item.price || '',
      completed: false,
      purchased: false,
    }))
    const updatedItems = [...items, ...itemsToAdd]
    setItems(updatedItems)
    updateListItems(listId, updatedItems)
  }
  const handleDeleteList = () => {
    if (listId) {
      deleteList(listId)
      router.push('/dashboard')
    }
  }
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }
  const handleUpdateRole = (
    collaboratorId: string,
    newRole: 'editor' | 'viewer',
  ) => {
    console.log(`Updated ${collaboratorId} to ${newRole}`)
  }
  const handleRemoveCollaborator = (collaboratorId: string) => {
    console.log(`Removed collaborator ${collaboratorId}`)
  }
  if (!list) {
    router.push('/dashboard')
    return null
  }
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] pb-20">
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
          >
            <ArrowLeft
              size={20}
              className="text-[#2E2E2E] dark:text-[#E9E9E9]"
            />
          </button>
          <h1 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            {list.title}
          </h1>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          >
            <MoreVertical
              size={20}
              className="text-[#2E2E2E] dark:text-[#E9E9E9]"
            />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2B2C5D] rounded-lg shadow-lg overflow-hidden z-10">
              <button
                onClick={() => router.push(`/list/${listId}/invite`)}
                className="w-full flex items-center p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Users
                  size={18}
                  className="mr-2 text-[#5855FF] dark:text-[#FF914D]"
                />
                <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                  Invite people
                </span>
              </button>
              <button
                onClick={() => {
                  if (listId) {
                    archiveList(listId)
                    router.push('/dashboard')
                  }
                }}
                className="w-full flex items-center p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Archive size={18} className="mr-2 text-orange-500" />
                <span className="text-orange-500">Archive list</span>
              </button>
              <button
                onClick={() => {
                  if (listId) {
                    deleteList(listId)
                    router.push('/dashboard')
                  }
                }}
                className="w-full flex items-center p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Trash2 size={18} className="mr-2 text-red-500" />
                <span className="text-red-500">Delete list</span>
              </button>
            </div>
          )}
        </div>
      </header>
      {list.collaborators > 0 && (
        <>
          <div className="px-6 mb-4">
            <button
              onClick={() => setShowCollaborators(!showCollaborators)}
              className="flex items-center"
            >
              <div className="flex -space-x-2 mr-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                  A
                </div>
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                  B
                </div>
              </div>
              <span className="text-sm text-[#666] dark:text-[#AAA]">
                {list.collaborators} collaborator
                {list.collaborators > 1 ? 's' : ''}
              </span>
            </button>
          </div>
          {showCollaborators && (
            <div className="px-6 mb-4">
              {/* <CollaboratorList
                collaborators={collaborators}
                onUpdateRole={handleUpdateRole}
                onRemoveCollaborator={handleRemoveCollaborator}
              /> */}
            </div>
          )}
        </>
      )}
      {list.collaborators > 0 && (
        <div className="fixed right-6 bottom-36 z-10">
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={toggleChat}
            className="p-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <MessageSquare size={24} />
          </motion.button>
        </div>
      )}
      <div className="px-6 mb-6">{renderList()}</div>
      <div className="px-6">
        <div className="flex">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={getInputPlaceholder()}
            className="flex-1 p-3 bg-white dark:bg-[#2B2C5D] rounded-l-lg text-[#2E2E2E] dark:text-[#E9E9E9] outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <button
            onClick={() => handleAddItem()}
            disabled={!newItem}
            className={`px-4 rounded-r-lg font-medium ${newItem ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      {/* <ChatSection
        listId={listId || ''}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      /> */}
      <BottomNavigation />
    </div>
  )
}

