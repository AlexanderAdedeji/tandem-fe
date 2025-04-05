'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Apple } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface OAuthButtonProps {
  provider: 'google' | 'apple'
  label: string
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, label }) => {
  const handleClick = () => {
    // Redirect to your backend OAuth login endpoint.
    // Ensure this endpoint is served over HTTPS.
    window.location.href = `/api/auth/${provider}/login`
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center text-white shadow-lg"
      style={{
        backgroundColor: provider === 'google' ? '#4285F4' : '#000',
      }}
    >

 
              {provider === 'google' ? <Linkedin className="mr-2" /> : <Apple className="mr-2" />}
              {label}
   

     </motion.button>
  )
}
