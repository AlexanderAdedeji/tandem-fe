import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  showBackButton?: boolean
  illustration: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  illustration,
}) => {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1B25] flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#F7F8FA] dark:bg-[#2B2C5D] items-center justify-center p-12">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={illustration}
          alt="Authentication illustration"
          className="max-w-md w-full"
        />
      </div>
      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-12">
        {showBackButton && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => router.back()}
            className="self-start p-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-8"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
          </motion.button>
        )}
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{subtitle}</p>
          </motion.div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
