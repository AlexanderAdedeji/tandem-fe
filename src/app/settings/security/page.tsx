'use client'


import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Shield, Smartphone, Key, CheckCircle } from 'lucide-react'
const SecuritySection: React.FC = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Security Settings
          </h2>
          <p className="text-[#666] dark:text-[#AAA]">
            Manage your account security
          </p>
        </div>
        <Shield className="w-10 h-10 text-[#5855FF] dark:text-[#FF914D]" />
      </div>
      {/* Password Section */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
              <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                Password
              </h3>
            </div>
            <p className="text-[#666] dark:text-[#AAA] mt-1">
              Last changed 30 days ago
            </p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 bg-[#5855FF]/10 dark:bg-[#FF914D]/10 text-[#5855FF] dark:text-[#FF914D] rounded-lg font-medium"
          >
            Change Password
          </button>
        </div>
        {showPasswordForm && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block text-sm text-[#666] dark:text-[#AAA] mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm text-[#666] dark:text-[#AAA] mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm text-[#666] dark:text-[#AAA] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                placeholder="Confirm new password"
              />
            </div>
            <button className="w-full py-3 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium mt-4">
              Update Password
            </button>
          </motion.div>
        )}
      </div>
      {/* 2FA Section */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
              <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                Two-Factor Authentication
              </h3>
            </div>
            <p className="text-[#666] dark:text-[#AAA] mt-1">
              {is2FAEnabled ? 'Enabled and active' : 'Not enabled'}
            </p>
          </div>
          <button
            onClick={() => {
              setIs2FAEnabled(!is2FAEnabled)
              setShowQRCode(true)
            }}
            className={`px-4 py-2 rounded-lg font-medium ${is2FAEnabled ? 'bg-red-100 dark:bg-red-900/20 text-red-500' : 'bg-[#5855FF]/10 dark:bg-[#FF914D]/10 text-[#5855FF] dark:text-[#FF914D]'}`}
          >
            {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
        {showQRCode && !is2FAEnabled && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="mt-6 space-y-4"
          >
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example"
                alt="2FA QR Code"
                className="mx-auto mb-4"
              />
              <p className="text-sm text-[#666] dark:text-[#AAA]">
                Scan this QR code with your authenticator app
              </p>
            </div>
            <div>
              <label className="block text-sm text-[#666] dark:text-[#AAA] mb-1">
                Enter 6-digit code
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                placeholder="Enter verification code"
                maxLength={6}
              />
            </div>
            <button className="w-full py-3 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium">
              Verify and Enable 2FA
            </button>
          </motion.div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Key className="w-5 h-5 text-[#5855FF] dark:text-[#FF914D] mr-2" />
            <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Active Sessions
            </h3>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
                  Current Session
                </p>
                <p className="text-xs text-[#666] dark:text-[#AAA]">
                  MacBook Pro • San Francisco, US
                </p>
              </div>
            </div>
            <span className="text-xs text-[#666] dark:text-[#AAA]">
              Active now
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="text-sm font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
                iPhone 12
              </p>
              <p className="text-xs text-[#666] dark:text-[#AAA]">
                New York, US
              </p>
            </div>
            <button className="text-sm text-red-500 hover:underline">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default SecuritySection