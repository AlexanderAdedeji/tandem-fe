'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  CheckSquare,
  GripVertical,
  Target,
  Sparkles,
} from 'lucide-react'
interface GoalStep {
  id: string
  content: string
  completed: boolean
  dueDate?: string
  isAiGenerated?: boolean
}
interface GoalListProps {
  goal: string
  targetDate: string
  steps: GoalStep[]
  onUpdateSteps: (steps: GoalStep[]) => void
  onGenerateSteps: () => Promise<void>
}
const GoalList: React.FC<GoalListProps> = ({
  goal,
  targetDate,
  steps,
  onUpdateSteps,
  onGenerateSteps,
}) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [draggedStep, setDraggedStep] = useState<string | null>(null)
  const handleGenerateSteps = async () => {
    setIsGenerating(true)
    await onGenerateSteps()
    setIsGenerating(false)
  }
  const handleDragStart = (stepId: string) => {
    setDraggedStep(stepId)
  }
  const handleDragOver = (e: React.DragEvent, stepId: string) => {
    e.preventDefault()
    if (!draggedStep || draggedStep === stepId) return
    const draggedIndex = steps.findIndex((s) => s.id === draggedStep)
    const targetIndex = steps.findIndex((s) => s.id === stepId)
    const newSteps = [...steps]
    const [removed] = newSteps.splice(draggedIndex, 1)
    newSteps.splice(targetIndex, 0, removed)
    onUpdateSteps(newSteps)
  }
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            {goal}
          </h2>
          <div className="flex items-center text-sm text-[#666] dark:text-[#AAA]">
            <Calendar size={16} className="mr-1" />
            <span>Due {new Date(targetDate).toLocaleDateString()}</span>
          </div>
        </div>
        {steps.length === 0 ? (
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleGenerateSteps}
            disabled={isGenerating}
            className="w-full py-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Sparkles className="animate-spin mr-2" size={20} />
                Generating plan...
              </>
            ) : (
              <>
                <Target className="mr-2" size={20} />
                Generate AI Plan
              </>
            )}
          </motion.button>
        ) : (
          <div className="space-y-2">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                layoutId={step.id}
                draggable
                onDragStart={() => handleDragStart(step.id)}
                onDragOver={(e) => handleDragOver(e, step.id)}
                className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-move"
              >
                <GripVertical
                  size={20}
                  className="text-gray-400 mr-2 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start">
                    <button
                      onClick={() => {
                        const newSteps = steps.map((s) =>
                          s.id === step.id
                            ? {
                                ...s,
                                completed: !s.completed,
                              }
                            : s,
                        )
                        onUpdateSteps(newSteps)
                      }}
                      className={`w-5 h-5 rounded mr-2 flex items-center justify-center flex-shrink-0 ${step.completed ? 'bg-[#5855FF] dark:bg-[#FF914D]' : 'border-2 border-gray-300 dark:border-gray-600'}`}
                    >
                      {step.completed && (
                        <CheckSquare size={12} className="text-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newSteps = steps.map((s) =>
                            s.id === step.id
                              ? {
                                  ...s,
                                  content: e.currentTarget.textContent || '',
                                }
                              : s,
                          )
                          onUpdateSteps(newSteps)
                        }}
                        className={`outline-none ${step.completed ? 'line-through text-gray-400' : 'text-[#2E2E2E] dark:text-[#E9E9E9]'}`}
                      >
                        {step.content}
                      </div>
                      {step.dueDate && (
                        <div className="text-xs text-[#666] dark:text-[#AAA] mt-1">
                          Due {new Date(step.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  {step.isAiGenerated && (
                    <div className="flex items-center mt-2 text-xs text-[#5855FF] dark:text-[#FF914D]">
                      <Sparkles size={12} className="mr-1" />
                      AI Generated
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


export default GoalList