'use client'

import React, { useState } from 'react'
import EventList from './EventList' // adjust if needed

interface EventItem {
  id: string;
  content: string;
  completed: boolean;
  time?: string;
  location?: string;
  attendees?: number;
  links?: Array<{url: string, title: string, type: 'ticket' | 'directions' | 'registration' | 'info'}>;
}

const Page: React.FC = () => {
  const [items, setItems] = useState<EventItem[]>([
    {
      id: '1',
      content: 'Book venue', 
      completed: false,
      time: '10:00 AM',
      location: 'Downtown Hall',
      attendees: 20,
      links: [{ url: 'https://event.com/tickets', title: 'Buy Tickets', type: 'ticket' }],
    },
    {
      id: '2',
      content: 'Send invitations',
      completed: true,
      time: '12:00 PM',
      attendees: 30,
    },
  ])

  return <EventList items={items} onUpdateItems={setItems} />
}

export default Page
