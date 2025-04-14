'use client'

import React, { useState } from 'react'
import GroceryList from './GroceryList' // adjust path as needed
import { v4 as uuid } from 'uuid'

interface GroceryItem {
  id: string;
  content: string;
  completed: boolean;
  quantity: number;
  category?: string;
  price?: string;
  onSale?: boolean;
  saleEnds?: string;
  affiliateLink?: string;
}

export default function GroceryPage() {
  const [items, setItems] = useState<GroceryItem[]>([
    {
      id: uuid(),
      content: 'Bananas',
      completed: false,
      quantity: 3,
      category: 'Produce',
      onSale: true,
      saleEnds: 'Friday',
    },
    {
      id: uuid(),
      content: 'Milk',
      completed: false,
      quantity: 1,
      category: 'Dairy',
      price: '4.99',
      affiliateLink: 'https://amazon.com/milk',
    },
    {
      id: uuid(),
      content: 'Ground beef',
      completed: false,
      quantity: 2,
      category: 'Meat',
      price: '8.99',
    },
  ])

  const handleUpdateItems = (updated: GroceryItem[]) => {
    setItems(updated)
  }

  return <GroceryList items={items} onUpdateItems={handleUpdateItems} />
}
