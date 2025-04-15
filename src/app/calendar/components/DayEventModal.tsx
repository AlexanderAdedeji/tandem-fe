import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Check } from 'lucide-react'
import { format } from 'date-fns'


import { CalendarEvent } from '@/shared/context/calendar-context'
import { EventModal } from './EventModal'
import { useRouter } from 'next/navigation'
interface DayEventsModalProps {
  date: Date
  events: CalendarEvent[]
  onClose: () => void
}
export const DayEventsModal: React.FC<DayEventsModalProps> = ({
  date,
  events,
  onClose,
}) => {
  const [showEventModal, setShowEventModal] = useState(false)
  const router = useRouter()
  const modalVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  }
  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
  }
  const getEventStyle = (event: CalendarEvent) => {
    if (event.isListItem) {
      return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
    }
    return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
  }
  return (
    <>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-[#2B2C5D] rounded-xl shadow-xl z-50 overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(date, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-3 mb-4">
            {events.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No events scheduled for this day
              </p>
            ) : (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`p-3 rounded-lg ${getEventStyle(event)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {event.isListItem && (
                        <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                      )}
                      <span className="font-medium">{event.title}</span>
                    </div>
                    {event.isListItem && (
                      <button
                        onClick={() => router.push(`/list/${event.listId}`)}
                        className="text-xs px-2 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        View List
                      </button>
                    )}
                  </div>
                  <div className="text-sm mt-1">
                    {format(new Date(event.start), 'h:mm a')} -{' '}
                    {format(new Date(event.end), 'h:mm a')}
                  </div>
                </motion.div>
              ))
            )}
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="w-full py-3 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Event
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {showEventModal && (
          <EventModal
            onClose={() => setShowEventModal(false)}
            initialDate={date}
          />
        )}
      </AnimatePresence>
    </>
  )
}
