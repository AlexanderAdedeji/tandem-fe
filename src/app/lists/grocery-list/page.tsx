'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  ShoppingCart,
  Plus,
  Minus,
  ExternalLink,
  TrendingDown,
} from 'lucide-react'
interface GroceryItem {
  id: string
  content: string
  completed: boolean
  quantity: number
  category?: string
  price?: string
  affiliateLink?: string
  onSale?: boolean
  saleEnds?: string
}
interface GroceryListProps {
  items: GroceryItem[]
  onUpdateItems: (items: GroceryItem[]) => void
}
const GroceryList: React.FC<GroceryListProps> = ({
  items,
  onUpdateItems,
}) => {
  const categories = ['Produce', 'Dairy', 'Meat', 'Pantry', 'Other']
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const handleToggleComplete = (itemId: string) => {
    const newItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
          }
        : item,
    )
    onUpdateItems(newItems)
  }
  const handleUpdateQuantity = (itemId: string, increment: boolean) => {
    const newItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: increment
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
          }
        : item,
    )
    onUpdateItems(newItems)
  }
  const itemsByCategory = items.reduce(
    (acc, item) => {
      const category = item.category || 'Other'
      return {
        ...acc,
        [category]: [...(acc[category] || []), item],
      }
    },
    {} as Record<string, GroceryItem[]>,
  )
  const filteredCategories = selectedCategory
    ? [selectedCategory]
    : Object.keys(itemsByCategory)
  const renderAffiliateLink = (item: GroceryItem) => {
    if (!item.affiliateLink) return null
    return (
      <a
        href={item.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 inline-flex items-center text-xs px-2 py-1 bg-[#FF9900] text-white rounded-lg hover:bg-[#FF9900]/90 transition-colors"
      >
        <ShoppingCart size={12} className="mr-1" />
        Buy on Amazon
        <ExternalLink size={10} className="ml-1" />
      </a>
    )
  }
  const renderItem = (item: GroceryItem) => (
    <motion.div
      key={item.id}
      layout
      className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
    >
      <button
        onClick={() => handleToggleComplete(item.id)}
        className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${item.completed ? 'bg-[#5855FF] dark:bg-[#FF914D]' : 'border-2 border-gray-300 dark:border-gray-600'}`}
      >
        {item.completed && <Check size={14} className="text-white" />}
      </button>
      <div className="flex flex-col flex-1">
        <div className="flex items-center">
          <span
            className={`${item.completed ? 'line-through text-gray-400' : 'text-[#2E2E2E] dark:text-[#E9E9E9]'}`}
          >
            {item.content}
          </span>
          {renderAffiliateLink(item)}
        </div>
        {item.onSale && (
          <div className="flex items-center text-green-500 text-xs mt-1">
            <TrendingDown size={12} className="mr-1" />
            On Sale
            {item.saleEnds && (
              <span className="ml-1">until {item.saleEnds}</span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleUpdateQuantity(item.id, false)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Minus size={16} className="text-gray-500" />
        </button>
        <span className="w-8 text-center text-sm text-gray-600 dark:text-gray-300">
          {item.quantity}
        </span>
        <button
          onClick={() => handleUpdateQuantity(item.id, true)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Plus size={16} className="text-gray-500" />
        </button>
      </div>
    </motion.div>
  )
  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2 -mx-2 px-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium ${!selectedCategory ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category === selectedCategory ? null : category,
              )
            }
            className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 text-sm font-medium ${category === selectedCategory ? 'bg-[#5855FF] dark:bg-[#FF914D] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
          >
            {category}
          </button>
        ))}
      </div>
      {filteredCategories.map((category) => (
        <div key={category}>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            {category}
          </h3>
          <div className="bg-white dark:bg-[#2B2C5D] rounded-lg overflow-hidden">
            {(itemsByCategory[category] || []).map((item) => renderItem(item))}
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <div className="mt-4 p-4 bg-white dark:bg-[#2B2C5D] rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Total Items:
            </span>
            <span className="font-medium text-[#2E2E2E] dark:text-[#E9E9E9]">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}



export default GroceryList