'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Loader, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
interface ResetPasswordFormProps {
  onSubmit: (token: string, password: string) => Promise<boolean>
}
const ResetPasswordForm

// : React.FC<ResetPasswordFormProps>
 = (
    {
//   onSubmit,
}
) => {
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const validatePassword = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }


  const onSubmit =(token:string, password:string)=>{

  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!validatePassword()) return
    const token = searchParams?.get('token')
    if (!token) {
      setError('Invalid reset token')
      return
    }
    setIsLoading(true)
    try {
      await onSubmit(token, password)
      setIsSuccess(true)
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false)
    }
  }
  if (isSuccess) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Password Reset Successfully
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your password has been reset. You can now log in with your new
          password.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center w-full py-3 px-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium"
        >
          Continue to Login
        </Link>
      </motion.div>
    )
  }
  return (
    <motion.form
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-[#5855FF] dark:focus:ring-[#FF914D] text-gray-900 dark:text-white"
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-[#5855FF] dark:focus:ring-[#FF914D] text-gray-900 dark:text-white"
              placeholder="Confirm new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium flex items-center justify-center"
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          'Reset Password'
        )}
      </button>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Remember your password?{' '}
        <Link
          href="/login"
          className="text-[#5855FF] dark:text-[#FF914D] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.form>
  )
}




export default ResetPasswordForm