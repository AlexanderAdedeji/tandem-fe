'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react'
import Link from 'next/link'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void
  isLoading?: boolean
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-[#5855FF] dark:focus:ring-[#FF914D] text-gray-900 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Link href="/auth/forgot-password">
              <span className="text-sm text-[#5855FF] dark:text-[#FF914D] hover:underline">
                Forgot password?
              </span>
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-[#5855FF] dark:focus:ring-[#FF914D] text-gray-900 dark:text-white"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium flex items-center justify-center"
      >
        {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Sign In'}
      </button>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Don't have an account?
        <Link href="/auth/register">
          <span className="text-[#5855FF] dark:text-[#FF914D] hover:underline">Sign up</span>
        </Link>
      </p>
    </motion.form>
  )
}
