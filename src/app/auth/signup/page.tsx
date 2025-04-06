"use client"

import React from "react"
import { motion } from "framer-motion"
import SignUpForm from "../components/forms/sign-up-form"


export default function SignUpPage() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
      >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Create Account</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Join Tandem to start organizing your tasks and events
        </p>
      </div>
      </motion.h1>

      <SignUpForm />
    </>
  )
}
