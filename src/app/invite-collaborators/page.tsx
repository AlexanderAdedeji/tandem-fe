'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

import {
  ArrowLeft,
  UserPlus,
  Users,
  ChevronRight,
  Check,
  Copy,
  X,
} from 'lucide-react'
import { useList } from '../lists/context/list-context'

type Role = 'editor' | 'viewer' | 'admin'
interface Collaborator {
  email: string
  role: Role
}
const InviteCollaborators: React.FC = () => {
    const router = useRouter()
    const params = useParams()
    const id = params?.id as string

  const { getListById, updateListCollaborators } = useList()
  const list = getListById(id || '')
  const [email, setEmail] = useState('')
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const handleAddCollaborator = () => {
    if (!email) return
    setCollaborators([
      ...collaborators,
      {
        email,
        role: 'editor',
      },
    ])
    setEmail('')
  }
  const handleChangeRole = (index: number) => {
    const newCollaborators = [...collaborators]
    switch (newCollaborators[index].role) {
      case 'editor':
        newCollaborators[index].role = 'viewer'
        break
      case 'viewer':
        newCollaborators[index].role = 'admin'
        break
      case 'admin':
        newCollaborators[index].role = 'editor'
        break
    }
    setCollaborators(newCollaborators)
  }
  const handleRemoveCollaborator = (index: number) => {
    const newCollaborators = [...collaborators]
    newCollaborators.splice(index, 1)
    setCollaborators(newCollaborators)
  }
  const handleCopyLink = () => {
    setShowCopiedToast(true)
    setTimeout(() => setShowCopiedToast(false), 2000)
  }
  const handleDone = () => {
    if (id && list) {
      updateListCollaborators(id, collaborators.length)
    }
    router.push(`/list/${id}`)
  }
  const handleSkip = () => {
    router.push(`/list/${id}`)
  }
  const getRoleColor = (role: Role) => {
    switch (role) {
      case 'editor':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900'
      case 'viewer':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
      case 'admin':
        return 'text-red-500 bg-red-100 dark:bg-red-900'
    }
  }
  if (!list) {
    router.push('/dashboard')
    return null
  }
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25]">
      <header className="p-6 flex items-center">
        <button
          onClick={handleSkip}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
        >
          <ArrowLeft size={20} className="text-[#2E2E2E] dark:text-[#E9E9E9]" />
        </button>
        <h1 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
          Invite to "{list.title}"
        </h1>
      </header>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <UserPlus
              size={20}
              className="text-[#5855FF] dark:text-[#FF914D] mr-2"
            />
            <h2 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Add people
            </h2>
          </div>
          <div className="flex mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 p-3 bg-white dark:bg-[#2B2C5D] rounded-l-lg text-[#2E2E2E] dark:text-[#E9E9E9] outline-none"
            />
            <button
              onClick={handleAddCollaborator}
              disabled={!email}
              className={`px-4 rounded-r-lg font-medium ${email ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}
            >
              Add
            </button>
          </div>
          {collaborators.length > 0 && (
            <div className="mb-6 bg-white dark:bg-[#2B2C5D] rounded-lg overflow-hidden">
              {collaborators.map((collaborator, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">
                        {collaborator.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                      {collaborator.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleChangeRole(index)}
                      className={`px-2 py-1 rounded-md text-xs font-medium mr-2 ${getRoleColor(collaborator.role)}`}
                    >
                      {collaborator.role.charAt(0).toUpperCase() +
                        collaborator.role.slice(1)}
                    </button>
                    <button
                      onClick={() => handleRemoveCollaborator(index)}
                      className="text-gray-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Users
                size={20}
                className="text-[#5855FF] dark:text-[#FF914D] mr-2"
              />
              <h2 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                Share link
              </h2>
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#2B2C5D] rounded-lg"
            >
              <span className="text-[#666] dark:text-[#AAA] truncate mr-2">
                https://tandem.app/list/{id}
              </span>
              <Copy size={18} className="text-[#5855FF] dark:text-[#FF914D]" />
            </button>
          </div>
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleDone}
            className="w-full py-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg font-medium"
          >
            {collaborators.length > 0 ? 'Send invites' : 'Skip for now'}
          </motion.button>
        </div>
      </div>
      {showCopiedToast && (
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 50,
          }}
          className="fixed bottom-20 left-0 right-0 mx-auto w-64 bg-black bg-opacity-80 text-white py-2 px-4 rounded-lg text-center"
        >
          <div className="flex items-center justify-center">
            <Check size={16} className="mr-2" />
            <span>Link copied to clipboard</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}



export default InviteCollaborators