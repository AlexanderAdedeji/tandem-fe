"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1B25] flex">
      {/* Left Panel - Illustration (static or via context) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#F7F8FA] dark:bg-[#2B2C5D] items-center justify-center p-12">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="/icons/auth-illustration.svg"
          alt="Authentication illustration"
          className="max-w-md w-full"
        />
      </div>
      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-12">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => router.back()}
          className="self-start p-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-8"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </motion.button>
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
