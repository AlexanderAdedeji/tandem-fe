"use client"

import React from "react"
import { useRouter } from "next/navigation"
import AuthLayout from "../layout"
import { LoginForm } from "../components/forms/login-form"


export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (email: string, password: string) => {
    // Handle login (e.g., call your API, update state)
  }

  return (
    // <AuthLayout>
    <>
    
    <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Sign in to your account
        </p>
      </div>
      <LoginForm onSubmit={handleLogin} isLoading={false} />
    </>

    // </AuthLayout>
  )
}
