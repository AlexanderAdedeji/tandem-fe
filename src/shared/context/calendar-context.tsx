'use client'

import React, { useEffect, useState, createContext, useContext } from 'react'
import { addDays, format, parseISO } from 'date-fns'
import { useList } from '@/app/lists/context/list-context'

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: string
  end: string
  category?: string
  color?: string
  repeatType?: 'none' | 'daily' | 'weekly' | 'monthly'
  isListItem?: boolean
  listId?: string
}
type ViewType = 'month' | 'week' | 'day' | 'timeline'
interface CalendarContextType {
  events: CalendarEvent[]
  selectedDate: Date
  view: ViewType
  setView: (view: ViewType) => void
  setSelectedDate: (date: Date) => void
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  updateEvent: (event: CalendarEvent) => void
  deleteEvent: (id: string) => void
  getEventsForDate: (date: Date) => CalendarEvent[]
}
const CalendarContext = createContext<CalendarContextType>({
  events: [],
  selectedDate: new Date(),
  view: 'month',
  setView: () => {},
  setSelectedDate: () => {},
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
  getEventsForDate: () => [],
})
export const useCalendar = () => useContext(CalendarContext)
export const CalendarProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<ViewType>('month')
  const { lists, getListItems } = useList()
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendar_events')
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('calendar_events', JSON.stringify(events))
  }, [events])
  const getListItemEvents = () => {
    const listItemEvents: CalendarEvent[] = []
    lists.forEach((list) => {
      if (list.type === 'event' && list.targetDate) {
        const eventEndDate = new Date(list.targetDate)
        eventEndDate.setHours(eventEndDate.getHours() + 1)
        listItemEvents.push({
          id: `list-${list.id}-main`,
          title: list.title,
          description: `Event: ${list.title}`,
          start: new Date(list.targetDate).toISOString(),
          end: eventEndDate.toISOString(),
          category: list.type,
          isListItem: true,
          listId: list.id,
        })
      }
      const items = getListItems(list.id)
      items.forEach((item) => {
        if (item.dueDate) {
          const dueDate = new Date(item.dueDate)
          const endDate = new Date(dueDate)
          endDate.setHours(endDate.getHours() + 1)
          listItemEvents.push({
            id: `list-${list.id}-${item.id}`,
            title: item.content,
            description: `From list: ${list.title}`,
            start: dueDate.toISOString(),
            end: endDate.toISOString(),
            isListItem: true,
            listId: list.id,
            category: list.type,
          })
        }
      })
    })
    return listItemEvents
  }
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const listEvents = getListItemEvents()
    const allEvents = [...events, ...listEvents]
    return allEvents.filter((event) => {
      const eventStart = format(parseISO(event.start), 'yyyy-MM-dd')
      const eventEnd = format(parseISO(event.end), 'yyyy-MM-dd')
      return eventStart <= dateStr && dateStr <= eventEnd
    })
  }
  const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
    }
    setEvents((prev) => [...prev, newEvent])
  }
  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    )
  }
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }
  return (
    <CalendarContext.Provider
      value={{
        events,
        selectedDate,
        view,
        setView,
        setSelectedDate,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventsForDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
