// 'use client'
// import React from 'react'

// import { ArrowLeft, Moon, Bell, LogOut, User } from 'lucide-react'
// import { useAuth } from '../auth/hooks/useAuth'
// import { useAchievements } from '../achievements/context/AchievementContext'
// import { useRouter } from 'next/navigation'
// import { useTheme } from '@/shared/context/ThemeContext'

// const Settings: React.FC = () => {
//   const router = useRouter()
//   const { isDarkMode, toggleTheme } = useTheme()
//   const { logout } = useAuth()
//   const { currentStreak } = useAchievements()
//   const handleLogout = () => {
//     logout()
//     router.push('/login')
//   }



//   const handleRouting = (route:string) =>{
//     router.push(route)
//   }
//   return (
//     <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25]">
//       <header className="p-6 flex items-center">
//         <button
//           onClick={() => router.push('/dashboard')}
//           className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
//         >
//           <ArrowLeft size={20} className="text-[#2E2E2E] dark:text-[#E9E9E9]" />
//         </button>
//         <h1 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
//           Settings
//         </h1>
//       </header>
//       <div className="p-6">
//         <div className="mb-8 flex items-center">
//           <div className="w-24 h-24 rounded-full bg-[#5855FF] dark:bg-[#FF914D] flex items-center justify-center text-white text-3xl font-bold mr-4">
//             A
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
//               Alex Johnson
//             </h2>
//             <p className="text-[#666] dark:text-[#AAA]">alex@example.com</p>
//             {currentStreak > 0 && (
//               <div className="flex items-center mt-2 text-sm">
//                 <span className="text-[#5855FF] dark:text-[#FF914D] font-medium">
//                   🔥 {currentStreak} day streak!
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
//             <img
//               src="https://illustrations.popsy.co/white/theme-customization.svg"
//               alt="Theme customization"
//               className="w-32 h-32 mx-auto mb-4"
//             />
//             <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
//               <div className="flex items-center">
//                 <User
//                   size={20}
//                   className="text-[#5855FF] dark:text-[#FF914D] mr-3"
//                 />
//                 <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
//                   Edit Profile
//                 </span>
//               </div>
//               <span className="text-gray-400">&gt;</span>
//             </button>
//             <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
//               <div className="flex items-center">
//                 <Moon
//                   size={20}
//                   className="text-[#5855FF] dark:text-[#FF914D] mr-3"
//                 />
//                 <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
//                   Dark Mode
//                 </span>
//               </div>
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   id="darkModeToggle"
//                   checked={isDarkMode}
//                   onChange={toggleTheme}
//                   className="sr-only"
//                 />
//                 <label
//                   htmlFor="darkModeToggle"
//                   className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${isDarkMode ? 'bg-[#5855FF] dark:bg-[#FF914D]' : 'bg-gray-300 dark:bg-gray-700'}`}
//                 >
//                   <span
//                     className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transform transition-transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-6' : ''}`}
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6" onClick={()=>handleRouting('settings/notification')}>
//             <img
//               src="https://illustrations.popsy.co/white/notifications.svg"
//               alt="Notifications"
//               className="w-32 h-32 mx-auto mb-4"
//             />
//             <button className="w-full flex items-center justify-between p-4">
//               <div className="flex items-center">
//                 <Bell
//                   size={20}
//                   className="text-[#5855FF] dark:text-[#FF914D] mr-3"
//                 />
//                 <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
//                   Notifications
//                 </span>
//               </div>
//               <span className="text-gray-400">&gt;</span>
//             </button>
//           </div>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center p-4 bg-red-100 dark:bg-red-900 rounded-lg"
//         >
//           <LogOut size={20} className="text-red-500 dark:text-red-300 mr-2" />
//           <span className="text-red-500 dark:text-red-300 font-medium">
//             Log Out
//           </span>
//         </button>
//       </div>
//     </div>
//   )
// }


// export default Settings


'use client'
import React from 'react'
import { motion } from 'framer-motion'

import {
  ArrowLeft,
  Shield,
  User,
  Bell,
  CreditCard,
  MessageSquare,
  Settings as SettingsIcon,
  ChevronRight,
  Moon,
  Palette,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../auth/hooks/useAuth'
import { useNotifications } from '@/shared/context/notification-context'
import { useThemeCustomization } from '@/shared/context/ThemeCustomisationContext'
import { useRouter } from 'next/navigation'

const Settings: React.FC = () => {

  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  const { isDarkMode, toggleTheme, colors } = useThemeCustomization()
  const sections = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          label: 'Profile Settings',
          icon: User,
          route: '/settings/profile',
          description: 'Update your personal information',
        },
        {
          id: 'security',
          label: 'Security',
          icon: Shield,
          route: '/settings/security',
          description: 'Manage passwords and 2FA',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          route: '/settings/notifications',
          badge: unreadCount > 0 ? unreadCount.toString() : undefined,
          description: 'Customize your notifications',
        },
        {
          id: 'appearance',
          label: 'Dark Mode',
          icon: Moon,
          toggle: true,
          description: 'Toggle dark mode on/off',
        },
        {
          id: 'theme',
          label: 'Theme Color',
          icon: Palette,
          route: '/settings/theme',
          description: 'Customize app appearance',
        },
      ],
    },
    {
      title: 'App',
      items: [
        {
          id: 'billing',
          label: 'Billing & Plans',
          icon: CreditCard,
          route: '/settings/billing',
          badge: 'PRO',
          description: 'Manage your subscription',
        },
        {
          id: 'chat',
          label: 'Chat Settings',
          icon: MessageSquare,
          route: '/settings/chat',
          description: 'Configure chat preferences',
        },
        {
          id: 'preferences',
          label: 'Advanced',
          icon: SettingsIcon,
          route: '/settings/preferences',
          description: 'Additional settings',
        },
      ],
    },
  ]

const router = useRouter()
  const handleRouting = (route:string) =>{
    router.push(route)
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25] pb-safe"
    >
      <div className="sticky top-0 z-10 bg-white dark:bg-[#2B2C5D] px-4 py-3 flex items-center border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} className="text-[#2E2E2E] dark:text-[#E9E9E9]" />
        </button>
        <h1 className="ml-3 text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
          Settings
        </h1>
      </div>
      <div className="px-4 py-6">
        <motion.div
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          className="bg-white dark:bg-[#2B2C5D] rounded-2xl p-4 flex items-center"
          onClick={() => router.push('/settings/profile')}
        >
          <div className="w-16 h-16 rounded-full bg-[#5855FF] dark:bg-[#FF914D] flex items-center justify-center text-white text-xl font-semibold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              {user?.name || 'Alex Johnson'}
            </h2>
            <p className="text-[#666] dark:text-[#AAA]">
              {user?.email || 'alex@example.com'}
            </p>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </motion.div>
      </div>
      <div className="px-4 pb-8 space-y-8">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: sectionIndex * 0.1,
            }}
          >
            <h3 className="text-sm font-medium text-[#666] dark:text-[#AAA] mb-2 px-2">
              {section.title}
            </h3>
            <div className="bg-white dark:bg-[#2B2C5D] rounded-2xl overflow-hidden">
              {section.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{
                    x: -20,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: sectionIndex * 0.1 + index * 0.05,
                  }}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  {item.toggle ? (
                    <div className="flex items-center justify-between p-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <item.icon size={20} className="text-theme-primary" />
                          <span className="ml-3 text-[#2E2E2E] dark:text-[#E9E9E9]">
                            {item.label}
                          </span>
                        </div>
                        {item.description && (
                          <p className="ml-9 text-sm text-[#666] dark:text-[#AAA] mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isDarkMode}
                          onChange={toggleTheme}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => item.route && router.push(item.route)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <item.icon size={20} className="text-theme-primary" />
                          <span className="ml-3 text-[#2E2E2E] dark:text-[#E9E9E9]">
                            {item.label}
                          </span>
                        </div>
                        {item.description && (
                          <p className="ml-9 text-sm text-[#666] dark:text-[#AAA] mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center">
                        {item.badge && (
                          <span className="mr-2 px-2 py-1 text-xs font-medium bg-theme-primary/10 text-theme-primary rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: sections.length * 0.1,
          }}
        >
          <button
            onClick={() => router.push('/login')}
            className="w-full mt-4 p-4 flex items-center justify-center text-red-500 bg-red-50 dark:bg-red-900/20 rounded-2xl"
          >
            <LogOut size={20} className="mr-2" />
            <span>Log Out</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default Settings