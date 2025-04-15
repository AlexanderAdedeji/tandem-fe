import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, RepeatIcon, Check } from 'lucide-react'

import { CalendarEvent, useCalendar } from '@/shared/context/calendar-context'
interface EventModalProps {
  onClose: () => void
  existingEvent?: CalendarEvent
  initialDate?: Date | null
}
export const EventModal: React.FC<EventModalProps> = ({
  onClose,
  existingEvent,
  initialDate,
}) => {
  const { addEvent, updateEvent, deleteEvent } = useCalendar()
  const [title, setTitle] = useState(existingEvent?.title || '')
  const [description, setDescription] = useState(
    existingEvent?.description || '',
  )
  const formatDateForInput = (date: Date | string | undefined | null) => {
    if (!date) return new Date().toISOString().slice(0, 16)
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toISOString().slice(0, 16)
  }
  const [startDate, setStartDate] = useState(
    formatDateForInput(existingEvent?.start || initialDate),
  )
  const [endDate, setEndDate] = useState(
    formatDateForInput(existingEvent?.end || initialDate),
  )
  const [isAllDay, setIsAllDay] = useState(existingEvent?.isAllDay || false)
  const [category, setCategory] = useState(existingEvent?.category || '')
  const [repeatType, setRepeatType] = useState<
    'none' | 'daily' | 'weekly' | 'monthly'
  >(existingEvent?.repeatType || 'none')
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const eventData = {
      title,
      description,
      start: new Date(startDate).toISOString(),
      end: new Date(endDate).toISOString(),
      category,
      repeatType,
      isAllDay,
    }
    if (existingEvent) {
      updateEvent({
        ...eventData,
        id: existingEvent.id,
      })
    } else {
      addEvent(eventData)
    }
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
      onClose()
    }, 1500)
  }
  const handleDelete = () => {
    if (existingEvent && deleteEvent) {
      deleteEvent(existingEvent.id)
      onClose()
    }
  }
  return (
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{
          scale: 0.95,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          scale: 0.95,
        }}
        className="bg-white dark:bg-[#2B2C5D] rounded-xl w-full max-w-md shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {existingEvent ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
              required
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white h-24"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                All day
              </span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Start
                </span>
              </div>
              <input
                type={isAllDay ? 'date' : 'datetime-local'}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  End
                </span>
              </div>
              <input
                type={isAllDay ? 'date' : 'datetime-local'}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <RepeatIcon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Repeat
              </span>
            </div>
            <select
              value={repeatType}
              onChange={(e) =>
                setRepeatType(
                  e.target.value as 'none' | 'daily' | 'weekly' | 'monthly',
                )
              }
              className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
            >
              <option value="none">No repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            {existingEvent && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg"
            >
              {existingEvent ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 50,
              }}
              className="fixed bottom-20 left-0 right-0 mx-auto w-64 bg-green-500 text-white py-2 px-4 rounded-lg text-center"
            >
              <div className="flex items-center justify-center">
                <Check size={16} className="mr-2" />
                <span>
                  Event {existingEvent ? 'updated' : 'created'} successfully!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
