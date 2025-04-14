'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Upload, X, Link as LinkIcon } from 'lucide-react'
interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void
  currentImage?: string
}
export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
}) => {
  const [imageUrl, setImageUrl] = useState(currentImage || '')
  const [isUrlInput, setIsUrlInput] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImageUrl(result)
      onImageSelect(result)
      setError(null)
    }
    reader.readAsDataURL(file)
  }
  const handleUrlSubmit = () => {
    if (!imageUrl) {
      setError('Please enter an image URL')
      return
    }
    // Basic URL validation
    try {
      new URL(imageUrl)
      onImageSelect(imageUrl)
      setIsUrlInput(false)
      setError(null)
    } catch {
      setError('Please enter a valid URL')
    }
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileChange(file)
    }
  }
  return (
    <div className="space-y-4">
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
            onError={() => {
              setError('Failed to load image')
              setImageUrl('')
            }}
          />
          <button
            onClick={() => {
              setImageUrl('')
              onImageSelect('')
            }}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{
            scale: isDragging ? 1.02 : 1,
            borderColor: isDragging ? '#5855FF' : '#E5E7EB',
          }}
          className="border-2 border-dashed rounded-lg p-6 text-center"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) =>
              e.target.files?.[0] && handleFileChange(e.target.files[0])
            }
            accept="image/*"
            className="hidden"
          />
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Drag and drop an image here, or
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg text-sm flex items-center"
            >
              <Upload size={16} className="mr-2" />
              Upload
            </button>
            <button
              onClick={() => setIsUrlInput(true)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center"
            >
              <LinkIcon size={16} className="mr-2" />
              Add URL
            </button>
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {isUrlInput && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg"
            >
              Add
            </button>
          </motion.div>
        )}
        {error && (
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
