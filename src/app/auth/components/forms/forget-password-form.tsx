"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader, ArrowRight } from "lucide-react";
// import { Link } from "next/link"
interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}
const ForgotPasswordForm = ({}) => {
  const onSubmit = (email: string) => {};

  const [isLoading, setIsLoading] = useState();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
    setEmailSent(true);
  };
  if (emailSent) {
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
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Check your email
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We've sent a password reset link to {email}
        </p>
        {/* <Link
          to="/login"
          className="text-[#5855FF] dark:text-[#FF914D] hover:underline text-sm"
        >
          Back to login
        </Link> */}
      </motion.div>
    );
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
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium flex items-center justify-center"
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Reset Password
            <ArrowRight className="ml-2 w-5 h-5" />
          </>
        )}
      </button>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Remember your password?{" "}
        {/* <Link
          to="/login"
          className="text-[#5855FF] dark:text-[#FF914D] hover:underline"
        >
          Sign in
        </Link> */}
      </p>
    </motion.form>
  );
};

export default ForgotPasswordForm;
