// 'use client'
// import React from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Check,
//   Clock,
//   Users,
//   MapPin,
//   ExternalLink,
//   Link as LinkIcon,
//   Calendar,
// } from 'lucide-react'
// interface EventItem {
//   id: string
//   content: string
//   description?: string
//   completed: boolean
//   time?: string
//   location?: string
//   attendees?: number
//   links?: {
//     url: string
//     title: string
//     type: 'ticket' | 'directions' | 'registration' | 'info'
//   }[]
//   virtualMeetingUrl?: string
// }
// interface EventListProps {
//   items: EventItem[]|null
//   onUpdateItems: (items: EventItem[]) => void
// }
//  const EventList: React.FC<EventListProps> = ({
//   items,
//   onUpdateItems,
// }) => {
//   const handleToggleComplete = (itemId: string) => {
//     if (!items) return;
    
//     const newItems = items.map((item) =>
//       item.id === itemId
//         ? {
//             ...item,
//             completed: !item.completed,
//           }
//         : item,
//     )
//     onUpdateItems(newItems)
//   }
//   const timeline = items?.reduce(
//     (acc, item) => {
//       const time = item.time || 'Unscheduled'
//       return {
//         ...acc,
//         [time]: [...(acc[time] || []), item],
//       }
//     },
//     {} as Record<string, EventItem[]>,
//   ) || {}
//   const renderLinks = (item: EventItem) => {
//     if (!item.links?.length && !item.virtualMeetingUrl) return null
//     return (
//       <div className="flex flex-wrap gap-2 mt-2">
//         {item.virtualMeetingUrl && (
//           <a
//             href={item.virtualMeetingUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
//           >
//             <Calendar size={12} className="mr-1" />
//             Join Meeting
//             <ExternalLink size={10} className="ml-1" />
//           </a>
//         )}
//         {item.links?.map((link, index) => (
//           <a
//             key={index}
//             href={link.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//           >
//             <LinkIcon size={12} className="mr-1" />
//             {link.title}
//             <ExternalLink size={10} className="ml-1" />
//           </a>
//         ))}
//       </div>
//     )
//   }
//   const renderItem = (item: EventItem) => (
//     <motion.div
//       key={item.id}
//       layout
//       className="flex items-start p-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
//     >
//       <button
//         onClick={() => handleToggleComplete(item.id)}
//         className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-[#5855FF] dark:bg-[#FF914D]' : 'border-2 border-gray-300 dark:border-gray-600'}`}
//       >
//         {item.completed && <Check size={14} className="text-white" />}
//       </button>
//       <div className="flex-1">
//         <div
//           className={`${item.completed ? 'line-through text-gray-400' : 'text-[#2E2E2E] dark:text-[#E9E9E9]'}`}
//         >
//           {item.content}
//         </div>
//         {item.description && (
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {item.description}
//           </p>
//         )}
//         <div className="flex items-center mt-2 space-x-4">
//           {item.time && (
//             <div className="flex items-center text-xs text-gray-500">
//               <Clock size={12} className="mr-1" />
//               {item.time}
//             </div>
//           )}
//           {item.location && (
//             <div className="flex items-center text-xs text-gray-500">
//               <MapPin size={12} className="mr-1" />
//               {item.location}
//             </div>
//           )}
//           {item.attendees && (
//             <div className="flex items-center text-xs text-gray-500">
//               <Users size={12} className="mr-1" />
//               {item.attendees} attending
//             </div>
//           )}
//         </div>
//         {renderLinks(item)}
//       </div>
//     </motion.div>
//   )
  
//   if (!items) {
//     return <div className="text-center py-8">No items available</div>;
//   }
  
//   return (
//     <div className="space-y-6">
//       {Object.entries(timeline).map(([time, timeItems]) => (
//         <div key={time}>
//           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
//             {time}
//           </h3>
//           <div className="bg-white dark:bg-[#2B2C5D] rounded-lg overflow-hidden">
//             {timeItems.map((item) => renderItem(item))}
//           </div>
//         </div>
//       ))}
//       <div className="mt-4 p-4 bg-white dark:bg-[#2B2C5D] rounded-lg">
//         <div className="flex items-center justify-between text-sm">
//           <span className="text-gray-600 dark:text-gray-300">Progress:</span>
//           <span className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
//             {items.filter((item) => item.completed).length} of {items.length}{' '}
//             completed
//           </span>
//         </div>
//         <div className="mt-2 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-[#5855FF] dark:bg-[#FF914D] rounded-full transition-all"
//             style={{
//               width: `${(items.filter((item) => item.completed).length / items.length) * 100}%`,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EventList

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  Clock,
  Users,
  MapPin,
  ExternalLink,
  Link as LinkIcon,
  Calendar,
  User,
  Award,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '@/app/auth/hooks/useAuth'

interface CompletedBy {
  userId: string
  name: string
  timestamp: string
  streak?: number
}
interface EventItem {
  id: string
  content: string
  description?: string
  completed: boolean
  completedBy?: CompletedBy
  time?: string
  location?: string
  attendees?: number
  links?: {
    url: string
    title: string
    type: 'ticket' | 'directions' | 'registration' | 'info'
  }[]
  virtualMeetingUrl?: string
}
interface EventListProps {
  items: EventItem[]
  onUpdateItems: (items: EventItem[]) => void
}
 const EventList: React.FC<EventListProps> = ({
  items,
  onUpdateItems,
}) => {
  const { user: currentUser } = useAuth()
  const [completionStats, setCompletionStats] = useState({ streak: 0, thisWeek: 0, total: 0 })

  const updateUserStats = (completing: boolean) => {
    if (completing) {
      setCompletionStats(prev => ({
        streak: prev.streak + 1,
        thisWeek: prev.thisWeek + 1,
        total: prev.total + 1
      }))
    }
  }
  const formatUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }
  // Group events by time
  const timeline = items.reduce(
    (acc, item) => {
      const timeKey = item.time || 'Unscheduled'
      if (!acc[timeKey]) {
        acc[timeKey] = []
      }
      acc[timeKey].push(item)
      return acc
    },
    {} as Record<string, EventItem[]>,
  )
  const handleToggleComplete = (itemId: string) => {
    const completing = !items.find((item) => item.id === itemId)?.completed
    const newItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
            completedBy:
              !item.completed && currentUser
                ? {
                    userId: currentUser.id,
                    name: currentUser.name,
                    timestamp: new Date().toISOString(),
                    streak: completionStats.streak + 1,
                  }
                : undefined,
          }
        : item,
    )
    updateUserStats(completing)
    onUpdateItems(newItems)
  }
  const completionVariants = {
    initial: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      height: 'auto',
      y: 0,
    },
    exit: {
      opacity: 0,
      height: 0,
      y: 10,
    },
  }
  const renderCompletionInfo = (item: EventItem) => {
    if (!item.completed || !item.completedBy) return null
    return (
      <motion.div
        variants={completionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <div className="flex items-center">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#5855FF] dark:bg-[#FF914D] flex items-center justify-center text-white text-sm">
              {formatUserInitials(item.completedBy.name)}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <Check size={10} className="text-white" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm text-[#2E2E2E] dark:text-[#E9E9E9]">
              Completed by{' '}
              <span className="font-medium">{item.completedBy.name}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {new Date(item.completedBy.timestamp).toLocaleDateString()} at{' '}
              {new Date(item.completedBy.timestamp).toLocaleTimeString()}
            </div>
          </div>
          {item.completedBy.streak && item.completedBy.streak > 1 && (
            <div className="flex items-center text-[#5855FF] dark:text-[#FF914D]">
              <Award size={14} className="mr-1" />
              <span className="text-sm font-medium">
                {item.completedBy.streak} streak
              </span>
            </div>
          )}
        </div>
        <AnimatePresence>
          {completionStats.total > 0 && (
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
              className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  This week: {completionStats.thisWeek}
                </div>
                <div>Total: {completionStats.total}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
  const renderLinks = (item: EventItem) => {
    if (!item.links?.length && !item.virtualMeetingUrl) return null
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {item.virtualMeetingUrl && (
          <a
            href={item.virtualMeetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            <Calendar size={12} className="mr-1" />
            Join Meeting
            <ExternalLink size={10} className="ml-1" />
          </a>
        )}
        {item.links?.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <LinkIcon size={12} className="mr-1" />
            {link.title}
            <ExternalLink size={10} className="ml-1" />
          </a>
        ))}
      </div>
    )
  }
  const renderItem = (item: EventItem) => (
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
        {item.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {item.description}
          </p>
        )}
        <div className="flex items-center mt-2 space-x-4">
          {item.time && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              {item.time}
            </div>
          )}
          {item.location && (
            <div className="flex items-center text-xs text-gray-500">
              <MapPin size={12} className="mr-1" />
              {item.location}
            </div>
          )}
          {item.attendees && (
            <div className="flex items-center text-xs text-gray-500">
              <Users size={12} className="mr-1" />
              {item.attendees} attending
            </div>
          )}
        </div>
        {renderLinks(item)}
        {renderCompletionInfo(item)}
      </div>
    </motion.div>
  )
  return (
    <div className="space-y-6">
      {Object.entries(timeline).map(([time, timeItems]) => (
        <div key={time}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            {time}
          </h3>
          <div className="bg-white dark:bg-[#2B2C5D] rounded-lg overflow-hidden">
            {timeItems.map((item) => renderItem(item))}
          </div>
        </div>
      ))}
      <div className="mt-4 p-4 bg-white dark:bg-[#2B2C5D] rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Progress:</span>
          <span className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
            {items.filter((item) => item.completed).length} of {items.length}{' '}
            completed
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5855FF] dark:bg-[#FF914D] rounded-full transition-all"
            style={{
              width: `${(items.filter((item) => item.completed).length / items.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default EventList