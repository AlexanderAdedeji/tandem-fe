'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'
const AccountVerifiedScreen: React.FC = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1A1B25] dark:to-[#2B2C5D] flex items-center justify-center p-4">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="max-w-md w-full text-center"
      >
        <div className="relative mb-8">
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="relative z-10"
          >
            {/* <img
              src="https://illustrations.popsy.co/white/success.svg"
              alt="Success illustration"
              className="w-64 h-64 mx-auto"
            /> */}
          </motion.div>
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
            }}
            className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-1/2"
          >
            <div className="bg-[#5855FF] dark:bg-[#FF914D] rounded-full p-2">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
        >
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Account Verified!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm mx-auto">
            Your email has been successfully verified. You can now access all
            features of your account.
          </p>
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center px-8 py-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-xl font-medium text-lg shadow-lg"
          >
            Continue to Dashboard
            <ArrowRight className="ml-2 w-6 h-6" />
          </motion.button>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.6,
            }}
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            Need help?{' '}
            <button className="text-[#5855FF] dark:text-[#FF914D] hover:underline">
              Contact Support
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="mt-12 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
        >
          <h2 className="font-medium text-gray-900 dark:text-white mb-2">
            Quick Tips
          </h2>
          <ul className="text-sm text-gray-600 dark:text-gray-300 text-left space-y-2">
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5855FF] dark:bg-[#FF914D] mr-2" />
              Complete your profile to personalize your experience
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5855FF] dark:bg-[#FF914D] mr-2" />
              Create your first list to get started
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5855FF] dark:bg-[#FF914D] mr-2" />
              Invite collaborators to work together
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}



export default AccountVerifiedScreen