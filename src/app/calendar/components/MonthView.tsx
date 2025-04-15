import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from 'date-fns'
import { Check } from 'lucide-react'

import { CalendarEvent, useCalendar } from '@/shared/context/calendar-context'
import { DayEventsModal } from './DayEventModal'
import { useRouter } from 'next/navigation'

interface MonthViewProps {
  highlightedItem?: string
  onDateClick: (date: Date) => void
}
export const MonthView: React.FC<MonthViewProps> = ({
  highlightedItem,
  onDateClick,
}) => {
  const router = useRouter()
  const { selectedDate, getEventsForDate } = useCalendar()
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  })
  const handleDateClick = (date: Date) => {
    setSelectedDay(date)
    onDateClick(date)
  }
  const getEventStyle = (event: CalendarEvent) => {
    if (event.isListItem) {
      return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
    }
    return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
  }
  const renderEvent = (event: CalendarEvent) => {
    const isHighlighted =
      event.isListItem && event.id.includes(highlightedItem || '')
    return (
      <motion.div
        key={event.id}
        id={`calendar-item-${event.id}`}
        initial={
          isHighlighted
            ? {
                scale: 1.1,
              }
            : {
                scale: 1,
              }
        }
        animate={{
          scale: 1,
        }}
        className={`text-xs p-1 rounded flex items-center justify-between ${getEventStyle(event)} ${isHighlighted ? 'ring-2 ring-[#5855FF] dark:ring-[#FF914D]' : ''}`}
      >
        <div className="flex items-center overflow-hidden">
          {event.isListItem && (
            <Check size={10} className="mr-1 flex-shrink-0" />
          )}
          <span className="truncate">{event.title}</span>
        </div>
        {event.isListItem && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/list/${event.listId}`)
            }}
            className="ml-1 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded"
          >
            <div className={"size-10"} />
          </button>
        )}
      </motion.div>
    )
  }
  return (
    <>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const events = getEventsForDate(day)
          const isCurrentMonth = isSameMonth(day, selectedDate)
          return (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.02,
              }}
              onClick={() => handleDateClick(day)}
              className={`p-2 min-h-[100px] rounded-lg border dark:border-gray-700 cursor-pointer
                ${isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
                ${isToday(day) ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="text-sm font-medium mb-1">{format(day, 'd')}</div>
              <div className="space-y-1">{events.map(renderEvent)}</div>
            </motion.div>
          )
        })}
      </div>
      <AnimatePresence>
        {selectedDay && (
          <DayEventsModal
            date={selectedDay}
            events={getEventsForDate(selectedDay)}
            onClose={() => setSelectedDay(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
