'use client'

import React from 'react'
// import { useRouter } from 'next/router'
// import { useLogin } from '../../../lib/hooks/useAuth'
import AuthLayout from '../layout'
import { LoginForm } from '../components/forms/login-form'
import { OAuthButton } from '../components/oauth-buttons'

// import { OAuthButton } from '../../../components/OAuthButton'

const LoginPage: React.FC = () => {
  // const router = useRouter()
  // const { mutate: login, isLoading } = useLogin()

  const handleLogin = (email: string, password: string) => {
    // login({ email, password }, {
    //   onSuccess: () => router.push('/lists'),
    //   onError: (error) => alert('Login failed: ' + error),
    // })
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      illustration="/icons/auth-illustration.svg"
    >
      <div className="space-y-6">
        <LoginForm onSubmit={handleLogin} isLoading={false} />
        <div className="flex flex-col space-y-4 mt-4">
          <OAuthButton provider="google" label="Sign in with Google" />
          <OAuthButton provider="apple" label="Sign in with Apple" />
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
