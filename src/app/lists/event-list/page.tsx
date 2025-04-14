'use client'

import React, { useState, useEffect } from 'react'
import EventList from './EventList'
import { useList } from '../context/list-context'
import { useParams } from 'next/navigation'

interface EventItem {
  id: string;
  content: string;
  completed: boolean;
  time?: string;
  location?: string;
  attendees?: number;
  links?: Array<{url: string, title: string, type: 'ticket' | 'directions' | 'registration' | 'info'}>;
}

const EventPage: React.FC = () => {
  const params = useParams();
  const { getListItems, updateListItems } = useList();
  const [items, setItems] = useState<EventItem[]>([]);
  
  useEffect(() => {
    if (params?.listId) {
      const listId = params.listId as string;
      const listItems = getListItems(listId);
      setItems(listItems as EventItem[]);
    }
  }, [params?.listId, getListItems]);
  
  const handleUpdateItems = (newItems: EventItem[]) => {
    setItems(newItems);
    if (params?.listId) {
      updateListItems(params.listId as string, newItems);
    }
  };

  return <EventList items={items} onUpdateItems={handleUpdateItems} />
}

export default EventPage
