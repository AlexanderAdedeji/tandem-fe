'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gift,
  Calendar,
  ArrowRight,
  AlertCircle,
  X,
  Sparkles,
  Plus,
  ShoppingCart,
  ExternalLink,
  Share2,
  Copy,
  Check,
} from 'lucide-react'
import { ImageUpload } from '../components/image-upload'

interface RegistryItem {
  id: string
  name: string
  description?: string
  price?: string
  imageUrl?: string
  claimedBy?: {
    name: string
    avatar: string
  }
  purchased: boolean
  affiliateLink?: string
}
interface RegistryListProps {
  items: RegistryItem[]
  onClaimItem: (itemId: string) => void
  onUnclaimItem: (itemId: string) => void
  onMarkPurchased: (itemId: string) => void
  onAddItems: (items: Partial<RegistryItem>[]) => void
  registryTitle: string
}
const RegistryList: React.FC<RegistryListProps> = ({
  items,
  onClaimItem,
  onUnclaimItem,
  onMarkPurchased,
  onAddItems,
  registryTitle,
}) => {
  const [showShareModal, setShowShareModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState<Partial<RegistryItem>>({})
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const handleShare = () => {
    setShowCopiedToast(true)
    setTimeout(() => setShowCopiedToast(false), 2000)
  }
  const handleAddItem = () => {
    if (newItem.name) {
      onAddItems([newItem])
      setNewItem({})
      setShowAddModal(false)
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
          {registryTitle}
        </h2>
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center px-4 py-2 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg"
        >
          <Share2 size={18} className="mr-2" />
          Share Registry
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="bg-white dark:bg-[#2B2C5D] rounded-xl overflow-hidden"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-[#666] dark:text-[#AAA] mt-1">
                      {item.description}
                    </p>
                  )}
                  {item.price && (
                    <p className="text-[#5855FF] dark:text-[#FF914D] font-medium mt-2">
                      ${item.price}
                    </p>
                  )}
                </div>
                {item.claimedBy ? (
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#5855FF] dark:bg-[#FF914D] flex items-center justify-center text-white mr-2">
                      {item.claimedBy.avatar}
                    </div>
                    <div className="text-sm">
                      <p className="text-[#666] dark:text-[#AAA]">Claimed by</p>
                      <p className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
                        {item.claimedBy.name}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 flex items-center justify-between">
                {item.purchased ? (
                  <span className="text-green-500 flex items-center">
                    <Gift size={18} className="mr-1" />
                    Purchased
                  </span>
                ) : (
                  <div className="space-x-2">
                    {item.claimedBy ? (
                      <>
                        <button
                          onClick={() => onUnclaimItem(item.id)}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[#666] dark:text-[#AAA] rounded-lg text-sm"
                        >
                          Unclaim
                        </button>
                        <button
                          onClick={() => onMarkPurchased(item.id)}
                          className="px-3 py-1 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg text-sm"
                        >
                          Mark as Purchased
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onClaimItem(item.id)}
                        className="px-3 py-1 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg text-sm"
                      >
                        Claim Item
                      </button>
                    )}
                  </div>
                )}
                {item.affiliateLink && (
                  <a
                    href={item.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-[#5855FF] dark:text-[#FF914D]"
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    Buy Now
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.button
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setShowAddModal(true)}
        className="fixed right-6 bottom-24 p-4 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-full shadow-lg"
      >
        <Plus size={24} />
      </motion.button>
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                scale: 0.95,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.95,
              }}
              className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                  Add Registry Item
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newItem.name || ''}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      name: e.target.value,
                    })
                  }
                  placeholder="Item name"
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent"
                />
                <textarea
                  value={newItem.description || ''}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description (optional)"
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent h-24"
                />
                <input
                  type="text"
                  value={newItem.price || ''}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                  className="w-full p-2 border dark:border-gray-700 rounded-lg bg-transparent"
                />
                <ImageUpload
                  onImageSelect={(url) =>
                    setNewItem({
                      ...newItem,
                      imageUrl: url,
                    })
                  }
                />
                <button
                  onClick={handleAddItem}
                  className="w-full py-2 bg-[#5855FF] dark:bg-[#FF914D] text-white rounded-lg"
                >
                  Add Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showShareModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                scale: 0.95,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.95,
              }}
              className="bg-white dark:bg-[#2B2C5D] rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
                  Share Registry
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-[#666] dark:text-[#AAA] truncate mr-2">
                  https://tandem.app/registry/{registryTitle}
                </span>
                <Copy
                  size={18}
                  className="text-[#5855FF] dark:text-[#FF914D]"
                />
              </button>
            </motion.div>
          </motion.div>
        )}
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
      </AnimatePresence>
    </div>
  )
}


export default RegistryList