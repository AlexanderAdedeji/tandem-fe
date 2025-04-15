import React from 'react'
import { motion } from 'framer-motion'

import { format } from 'date-fns'
import { useCalendar } from '@/shared/context/calendar-context'
export const DayView: React.FC = () => {
  const { selectedDate, getEventsForDate } = useCalendar()
  const events = getEventsForDate(selectedDate)
  const hours = Array.from(
    {
      length: 24,
    },
    (_, i) => i,
  )
  return (
    <div className="space-y-2">
      {hours.map((hour) => {
        const hourEvents = events.filter((event) => {
          const eventHour = new Date(event.start).getHours()
          return eventHour === hour
        })
        return (
          <div key={hour} className="flex">
            <div className="w-20 py-2 text-sm text-gray-500 dark:text-gray-400">
              {format(new Date().setHours(hour), 'h:mm a')}
            </div>
            <div className="flex-1 min-h-[60px] border-l dark:border-gray-700 pl-4">
              {hourEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  className="p-2 mb-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm">
                    {format(new Date(event.start), 'h:mm a')} -{' '}
                    {format(new Date(event.end), 'h:mm a')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
