import React, { useState, createContext, useContext } from 'react'
export type NotificationType =
  | 'list_update'
  | 'reminder'
  | 'mention'
  | 'collaboration'
  | 'achievement'
  | 'system'
export type NotificationChannel = 'push' | 'email' | 'in_app'
export interface NotificationPreference {
  type: NotificationType
  channels: { [key in NotificationChannel]: boolean }
  enabled: boolean
}
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  icon?: string
}
interface NotificationContextType {
  notifications: Notification[]
  preferences: NotificationPreference[]
  unreadCount: number
  updatePreference: (
    type: NotificationType,
    updates: Partial<NotificationPreference>,
  ) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => void
}
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  preferences: [],
  unreadCount: 0,
  updatePreference: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {},
  addNotification: () => {},
})
export const useNotifications = () => useContext(NotificationContext)
const defaultPreferences: NotificationPreference[] = [
  {
    type: 'list_update',
    channels: {
      push: true,
      email: true,
      in_app: true,
    },
    enabled: true,
  },
  {
    type: 'reminder',
    channels: {
      push: true,
      email: true,
      in_app: true,
    },
    enabled: true,
  },
  {
    type: 'mention',
    channels: {
      push: true,
      email: true,
      in_app: true,
    },
    enabled: true,
  },
  {
    type: 'collaboration',
    channels: {
      push: true,
      email: true,
      in_app: true,
    },
    enabled: true,
  },
  {
    type: 'achievement',
    channels: {
      push: true,
      email: false,
      in_app: true,
    },
    enabled: true,
  },
  {
    type: 'system',
    channels: {
      push: false,
      email: true,
      in_app: true,
    },
    enabled: true,
  },
]
export const NotificationProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [preferences, setPreferences] =
    useState<NotificationPreference[]>(defaultPreferences)
  const unreadCount = notifications.filter((n) => !n.read).length
  const updatePreference = (
    type: NotificationType,
    updates: Partial<NotificationPreference>,
  ) => {
    setPreferences((prefs) =>
      prefs.map((p) =>
        p.type === type
          ? {
              ...p,
              ...updates,
            }
          : p,
      ),
    )
  }
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id
          ? {
              ...n,
              read: true,
            }
          : n,
      ),
    )
  }
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        read: true,
      })),
    )
  }
  const clearAll = () => {
    setNotifications([])
  }
  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        preferences,
        unreadCount,
        updatePreference,
        markAsRead,
        markAllAsRead,
        clearAll,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
