'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Calendar from '.'
// Dynamically import Calendar to prevent SSR issues
// const Calendar = dynamic(() => import('@/src/app/calendar/index.tsx'), {
//   ssr: false,
// })

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading calendar...</div>}>
      <Calendar />
    </Suspense>
  )
}
