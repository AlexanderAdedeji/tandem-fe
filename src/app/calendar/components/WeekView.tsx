import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
} from 'date-fns'
import { useCalendar } from '@/shared/context/calendar-context'
interface WeekViewProps {
  onTimeSlotClick: (date: Date) => void
}
export const WeekView: React.FC<WeekViewProps> = ({ onTimeSlotClick }) => {
  const { selectedDate, getEventsForDate } = useCalendar()
  const days = useMemo(() => {
    const weekStart = startOfWeek(selectedDate)
    const weekEnd = endOfWeek(selectedDate)
    return eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    })
  }, [selectedDate])
  return (
    <div className="space-y-4">
      {days.map((day) => {
        const events = getEventsForDate(day)
        return (
          <motion.div
            key={day.toISOString()}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`p-4 rounded-lg bg-white dark:bg-gray-800 ${isToday(day) ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => onTimeSlotClick(day)}
          >
            <div className="font-medium mb-2">
              {format(day, 'EEEE, MMMM d')}
            </div>
            <div className="space-y-2">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm">
                    {format(new Date(event.start), 'h:mm a')} -{' '}
                    {format(new Date(event.end), 'h:mm a')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
