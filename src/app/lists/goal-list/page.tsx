'use client'

import React, { useState } from 'react'
 // adjust path as needed
import { v4 as uuid } from 'uuid'
import GoalList from './GoaList'

interface GoalStep {
  id: string
  content: string
  completed: boolean
  dueDate?: string
  isAiGenerated?: boolean
}

export default function GoalPage() {
  const [steps, setSteps] = useState<GoalStep[]>([
    {
      id: uuid(),
      content: 'Research universities',
      completed: false,
      dueDate: new Date().toISOString(),
      isAiGenerated: true,
    },
    {
      id: uuid(),
      content: 'Prepare application documents',
      completed: false,
      dueDate: new Date().toISOString(),
      isAiGenerated: true,
    },
  ])

  const handleGenerateSteps = async () => {
    // Simulate AI-generated steps
    const newSteps: GoalStep[] = [
      {
        id: uuid(),
        content: 'Schedule consultation with academic advisor',
        completed: false,
        dueDate: new Date().toISOString(),
        isAiGenerated: true,
      },
      {
        id: uuid(),
        content: 'Submit application',
        completed: false,
        dueDate: new Date().toISOString(),
        isAiGenerated: true,
      },
    ]
    setSteps(newSteps)
  }

  return (
    <GoalList
      goal="Get into grad school"
      targetDate={new Date().toISOString()}
      steps={steps}
      onUpdateSteps={setSteps}
      onGenerateSteps={handleGenerateSteps}
    />
  )
}
