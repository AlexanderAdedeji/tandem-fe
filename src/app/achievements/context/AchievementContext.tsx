'use client'


import React, { useEffect, useState, createContext, useContext } from 'react'
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
  type: 'milestone' | 'streak' | 'collaboration' | 'completion'
}
interface AchievementsContextType {
  achievements: Achievement[]
  unlockedAchievements: Achievement[]
  currentStreak: number
  checkAchievements: (action: string, data?: any) => void
  incrementStreak: () => void
  resetStreak: () => void
}
const AchievementsContext = React.createContext<AchievementsContextType>({
  achievements: [],
  unlockedAchievements: [],
  currentStreak: 0,
  checkAchievements: () => {},
  incrementStreak: () => {},
  resetStreak: () => {},
})
export const useAchievements = () => React.useContext(AchievementsContext)
const defaultAchievements: Achievement[] = [
  {
    id: 'first-list',
    title: 'List Master',
    description: 'Create your first list',
    icon: '📝',
    type: 'milestone',
  },
  {
    id: 'collaboration-king',
    title: 'Collaboration King',
    description: 'Invite 5 collaborators',
    icon: '👥',
    type: 'collaboration',
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'streak-warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    type: 'streak',
    progress: 0,
    maxProgress: 7,
  },
  {
    id: 'task-champion',
    title: 'Task Champion',
    description: 'Complete 50 tasks',
    icon: '✅',
    type: 'completion',
    progress: 0,
    maxProgress: 50,
  },
]
export const AchievementsProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [achievements, setAchievements] =
    useState<Achievement[]>(defaultAchievements)
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    Achievement[]
  >([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [lastActivity, setLastActivity] = useState<string | null>(null)
  useEffect(() => {
    // Load saved achievements from localStorage
    const saved = localStorage.getItem('achievements')
    if (saved) {
      setAchievements(JSON.parse(saved))
    }
    const savedStreak = localStorage.getItem('streak')
    if (savedStreak) {
      setCurrentStreak(parseInt(savedStreak))
    }
    const savedLastActivity = localStorage.getItem('lastActivity')
    if (savedLastActivity) {
      setLastActivity(savedLastActivity)
    }
  }, [])
  const checkAchievements = (action: string, data?: any) => {
    const newAchievements = [...achievements]
    let updated = false
    switch (action) {
      case 'CREATE_LIST':
        const firstList = newAchievements.find((a) => a.id === 'first-list')
        if (firstList && !firstList.unlockedAt) {
          firstList.unlockedAt = new Date().toISOString()
          setUnlockedAchievements((prev) => [...prev, firstList])
          updated = true
        }
        break
      case 'ADD_COLLABORATOR':
        const collabAchievement = newAchievements.find(
          (a) => a.id === 'collaboration-king',
        )
        if (collabAchievement && !collabAchievement.unlockedAt) {
          collabAchievement.progress = (collabAchievement.progress || 0) + 1
          if (
            collabAchievement.progress >= (collabAchievement.maxProgress || 5)
          ) {
            collabAchievement.unlockedAt = new Date().toISOString()
            setUnlockedAchievements((prev) => [...prev, collabAchievement])
          }
          updated = true
        }
        break
      case 'COMPLETE_TASK':
        const taskAchievement = newAchievements.find(
          (a) => a.id === 'task-champion',
        )
        if (taskAchievement && !taskAchievement.unlockedAt) {
          taskAchievement.progress = (taskAchievement.progress || 0) + 1
          if (taskAchievement.progress >= (taskAchievement.maxProgress || 50)) {
            taskAchievement.unlockedAt = new Date().toISOString()
            setUnlockedAchievements((prev) => [...prev, taskAchievement])
          }
          updated = true
        }
        break
    }
    if (updated) {
      setAchievements(newAchievements)
      localStorage.setItem('achievements', JSON.stringify(newAchievements))
    }
  }
  const incrementStreak = () => {
    const today = new Date().toDateString()
    if (lastActivity !== today) {
      const newStreak = currentStreak + 1
      setCurrentStreak(newStreak)
      setLastActivity(today)
      localStorage.setItem('streak', newStreak.toString())
      localStorage.setItem('lastActivity', today)
      // Check streak achievement
      const streakAchievement = achievements.find(
        (a) => a.id === 'streak-warrior',
      )
      if (
        streakAchievement &&
        !streakAchievement.unlockedAt &&
        newStreak >= 7
      ) {
        const newAchievements = achievements.map((a) =>
          a.id === 'streak-warrior'
            ? {
                ...a,
                unlockedAt: new Date().toISOString(),
              }
            : a,
        )
        setAchievements(newAchievements)
        setUnlockedAchievements((prev) => [
          ...prev,
          {
            ...streakAchievement,
            unlockedAt: new Date().toISOString(),
          },
        ])
        localStorage.setItem('achievements', JSON.stringify(newAchievements))
      }
    }
  }
  const resetStreak = () => {
    setCurrentStreak(0)
    localStorage.setItem('streak', '0')
  }
  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        unlockedAchievements,
        currentStreak,
        checkAchievements,
        incrementStreak,
        resetStreak,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  )
}
