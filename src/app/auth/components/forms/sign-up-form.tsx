"use client"

import React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import OauthForm from "../oauth-form"

interface SignUpFormData {
  fullName: string
  email: string
  password: string
}

 function SignUpForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>()

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Handle signup logic here
      console.log(data)
      router.push("/auth/login")
    } catch (error) {
      console.error("Signup failed:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            {...register("fullName", { required: "Full name is required" })}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>


<OauthForm/>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </form>
    </motion.div>
  )
}



export default SignUpForm