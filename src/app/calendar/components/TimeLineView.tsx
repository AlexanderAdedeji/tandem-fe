import React from 'react'
import { motion } from 'framer-motion'

import { format, addDays, eachDayOfInterval } from 'date-fns'
import { useCalendar } from '@/shared/context/calendar-context'
export const TimelineView: React.FC = () => {
  const { selectedDate, events } = useCalendar()
  const days = eachDayOfInterval({
    start: selectedDate,
    end: addDays(selectedDate, 14),
  })
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className="flex-1 p-2 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              {format(day, 'MMM d')}
            </div>
          ))}
        </div>
        <div className="relative mt-4">
          {events.map((event) => {
            const startDate = new Date(event.start)
            const dayIndex = days.findIndex(
              (day) =>
                format(day, 'yyyy-MM-dd') === format(startDate, 'yyyy-MM-dd'),
            )
            if (dayIndex === -1) return null
            return (
              <motion.div
                key={event.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="p-2 mb-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                style={{
                  marginLeft: `${(dayIndex / days.length) * 100}%`,
                }}
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-sm">{format(startDate, 'h:mm a')}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
