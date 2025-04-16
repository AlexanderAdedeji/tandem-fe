'use client'

import React from 'react'
import {
  Bell,
  Mail,
  Phone,
  Globe,
  AlertTriangle,
  Users,
  Trophy,
  Calendar,
} from 'lucide-react'
import { NotificationChannel, NotificationType, useNotifications } from '@/shared/context/notification-context'

const notificationTypes: {
  type: NotificationType
  icon: any
  label: string
  description: string
}[] = [
  {
    type: 'list_update',
    icon: Calendar,
    label: 'List Updates',
    description: 'When changes are made to your lists',
  },
  {
    type: 'reminder',
    icon: Bell,
    label: 'Reminders',
    description: 'For upcoming tasks and deadlines',
  },
  {
    type: 'mention',
    icon: AlertTriangle,
    label: 'Mentions',
    description: 'When someone mentions you in a comment',
  },
  {
    type: 'collaboration',
    icon: Users,
    label: 'Collaboration',
    description: 'Invites and updates from collaborators',
  },
  {
    type: 'achievement',
    icon: Trophy,
    label: 'Achievements',
    description: 'When you unlock new achievements',
  },
  {
    type: 'system',
    icon: Globe,
    label: 'System Updates',
    description: 'Important system notifications',
  },
]
const channels:{
    id:NotificationChannel,
    icon:any
    label:string
}[] = [
  {
    id: 'push',
    icon: Bell,
    label: 'Push',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
  },
  {
    id: 'in_app',
    icon: Globe,
    label: 'In-App',
  },
]
 const NotificationSection: React.FC = () => {
  const { preferences, updatePreference } = useNotifications()
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Notification Settings
          </h2>
          <p className="text-[#666] dark:text-[#AAA]">
            Manage how you receive notifications
          </p>
        </div>
        <Bell className="w-10 h-10 text-[#5855FF] dark:text-[#FF914D]" />
      </div>
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="grid grid-cols-[1fr,auto,auto,auto] gap-4 items-center mb-6">
          <div className="text-sm font-medium text-[#666] dark:text-[#AAA]">
            Notification Type
          </div>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="text-center text-sm font-medium text-[#666] dark:text-[#AAA] flex items-center"
            >
              <channel.icon className="w-4 h-4 mr-1" />
              {channel.label}
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {notificationTypes.map(({ type, icon: Icon, label, description }) => {
            const preference = preferences.find((p) => p.type === type)
            if (!preference) return null
            return (
              <div
                key={type}
                className="grid grid-cols-[1fr,auto,auto,auto] gap-4 items-center py-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-start">
                  <Icon className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-3 mt-1" />
                  <div>
                    <div className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
                      {label}
                    </div>
                    <div className="text-sm text-[#666] dark:text-[#AAA]">
                      {description}
                    </div>
                  </div>
                </div>
                {channels.map((channel) => (
                  <label
                    key={channel.id}
                    className="relative inline-flex items-center cursor-pointer justify-center"
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preference.channels[channel.id]}
                      onChange={(e) =>
                        updatePreference(type, {
                          channels: {
                            ...preference.channels,
                            [channel.id]: e.target.checked,
                          },
                        })
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5855FF] dark:peer-checked:bg-[#FF914D]"></div>
                  </label>
                ))}
              </div>
            )
          })}
        </div>
      </div>
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Bell className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Quiet Hours
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              Start Time
            </label>
            <input
              type="time"
              className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
              defaultValue="22:00"
            />
          </div>
          <div>
            <label className="block text-sm text-[#666] dark:text-[#AAA] mb-2">
              End Time
            </label>
            <input
              type="time"
              className="w-full p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
              defaultValue="07:00"
            />
          </div>
        </div>
      </div>
    </div>
  )
}



export default NotificationSection