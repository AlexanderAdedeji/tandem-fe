'use client'
import React, { useState, createContext, useContext } from 'react'
interface AIContextType {
  generateSuggestions: (input: string) => Promise<string[]>
  categorizeTask: (task: string) => Promise<string>
  generateTaskBreakdown: (goal: string) => Promise<string[]>
  analyzePriority: (task: string) => Promise<'low' | 'medium' | 'high'>
  getRecommendations: (tasks: string[]) => Promise<string[]>
}
const AIContext = React.createContext<AIContextType>({
  generateSuggestions: async () => [],
  categorizeTask: async () => '',
  generateTaskBreakdown: async () => [],
  analyzePriority: async () => 'low',
  getRecommendations: async () => [],
})
export const useAI = () => React.useContext(AIContext)
const mockResponses = {
  grocerySuggestions: [
    'Milk',
    'Eggs',
    'Bread',
    'Fresh vegetables',
    'Fruits',
    'Chicken',
    'Rice',
    'Pasta',
  ],
  taskSuggestions: [
    'Schedule team meeting',
    'Review project proposal',
    'Update documentation',
    'Prepare presentation',
  ],
  categories: {
    shopping: ['buy', 'purchase', 'shop', 'grocery', 'market'],
    work: ['report', 'meeting', 'project', 'deadline', 'client'],
    personal: ['gym', 'exercise', 'read', 'study', 'practice'],
    home: ['clean', 'laundry', 'organize', 'repair', 'maintenance'],
  },
  recommendations: {
    productivity: [
      'Group similar tasks together for better focus',
      'Schedule your most important tasks for your peak hours',
      'Take regular breaks between tasks to maintain productivity',
      'Consider using the Pomodoro technique for better time management',
    ],
    shopping: [
      'Create separate lists for different stores',
      'Organize items by store layout for efficient shopping',
      'Add estimated prices to track your budget',
      'Schedule shopping trips during off-peak hours',
    ],
    collaboration: [
      'Assign clear responsibilities to team members',
      'Set deadlines for shared tasks',
      'Regular check-ins help keep everyone aligned',
      'Use comments to provide context for tasks',
    ],
  },
}
export const AIProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const simulateDelay = () =>
    new Promise((resolve) => setTimeout(resolve, 1000))
  const generateSuggestions = async (input: string): Promise<string[]> => {
    await simulateDelay()
    const inputLower = input.toLowerCase()
    if (inputLower.includes('grocery') || inputLower.includes('shopping')) {
      return mockResponses.grocerySuggestions
    }
    return mockResponses.taskSuggestions
  }
  const categorizeTask = async (task: string): Promise<string> => {
    await simulateDelay()
    const taskLower = task.toLowerCase()
    for (const [category, keywords] of Object.entries(
      mockResponses.categories,
    )) {
      if (keywords.some((keyword) => taskLower.includes(keyword))) {
        return category
      }
    }
    return 'other'
  }
  const generateTaskBreakdown = async (goal: string): Promise<string[]> => {
    await simulateDelay()
    if (goal.toLowerCase().includes('exam')) {
      return [
        'Create study schedule',
        'Gather study materials',
        'Review past papers',
        'Practice mock tests',
        'Join study group',
      ]
    }
    return [
      'Break down main objective',
      'Create timeline',
      'Identify resources needed',
      'Set milestones',
      'Schedule regular reviews',
    ]
  }
  const analyzePriority = async (
    task: string,
  ): Promise<'low' | 'medium' | 'high'> => {
    await simulateDelay()
    const taskLower = task.toLowerCase()
    if (
      taskLower.includes('urgent') ||
      taskLower.includes('asap') ||
      taskLower.includes('deadline')
    ) {
      return 'high'
    }
    if (taskLower.includes('soon') || taskLower.includes('important')) {
      return 'medium'
    }
    return 'low'
  }
  const getRecommendations = async (tasks: string[]): Promise<string[]> => {
    await simulateDelay()
    const taskString = tasks.join(' ').toLowerCase()
    if (taskString.includes('shop') || taskString.includes('grocery')) {
      return mockResponses.recommendations.shopping
    }
    if (taskString.includes('team') || taskString.includes('meeting')) {
      return mockResponses.recommendations.collaboration
    }
    return mockResponses.recommendations.productivity
  }
  return (
    <AIContext.Provider
      value={{
        generateSuggestions,
        categorizeTask,
        generateTaskBreakdown,
        analyzePriority,
        getRecommendations,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}
