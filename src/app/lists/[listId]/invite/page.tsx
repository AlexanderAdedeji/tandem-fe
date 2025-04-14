'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { UserPlus } from 'lucide-react'
import { useList } from '../../context/list-context'

interface Collaborator {
  email: string
  status: 'pending' | 'accepted' | 'declined'
}

export default function InvitePage() {
  const params = useParams()
  const router = useRouter()
  const listId = params.listId as string
  const { getListById, updateListCollaborators } = useList()
  const [email, setEmail] = useState('')
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [list, setList] = useState(getListById(listId))

  useEffect(() => {
    if (!list) {
      router.push('/lists')
      return
    }
  }, [list, router])

  const handleAddCollaborator = () => {
    if (!email || !list) return

    const newCollaborator: Collaborator = {
      email,
      status: 'pending'
    }

    setCollaborators([...collaborators, newCollaborator])
    updateListCollaborators(listId, collaborators.length + 1)
    setEmail('')
  }

  const handleRemoveCollaborator = (emailToRemove: string) => {
    const updatedCollaborators = collaborators.filter(c => c.email !== emailToRemove)
    setCollaborators(updatedCollaborators)
    updateListCollaborators(listId, updatedCollaborators.length)
  }

  if (!list) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A1B3D]">
      <header className="flex items-center p-6 bg-white dark:bg-[#2B2C5D] shadow-sm">
        <button
          onClick={() => router.back()}
          className="mr-4 text-[#2E2E2E] dark:text-[#E9E9E9]"
        >
          ←
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
              className={`px-4 rounded-r-lg font-medium ${
                email
                  ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}
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
                      onClick={() => handleRemoveCollaborator(collaborator.email)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 