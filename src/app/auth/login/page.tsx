"use client"

import React from "react"
import { useRouter } from "next/navigation"
import AuthLayout from "../layout"
import { LoginForm } from "../components/forms/login-form"
import { useAuth } from "../hooks/useAuth"


export default function LoginPage() {
  const router = useRouter()


  const { login, isLoggingIn, loginError } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      // Successful login will automatically redirect to dashboard via useAuth hook
    } catch (error) {
      console.error('Login failed:', error);
      // Error handling is managed by the mutation in useAuth
    }
  }

  return (
   
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


  )
}
