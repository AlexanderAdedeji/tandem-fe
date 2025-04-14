'use client'

import React, { useState } from 'react'
import RegistryList from './RegistryList' // adjust if in a different path
import { v4 as uuid } from 'uuid'

// Mock avatars just for demo
const avatars = ['😊', '🎁', '🎉', '🙌', '🌟']

interface RegistryItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  claimedBy?: { name: string; avatar: string };
  purchased: boolean;
  affiliateLink?: string;
}

export default function Page() {
  const [items, setItems] = useState<RegistryItem[]>([
    {
      id: uuid(),
      name: 'Bluetooth Speaker',
      description: 'Great for picnics and travel.',
      price: '49.99',
      imageUrl: 'https://source.unsplash.com/400x300/?speaker',
      claimedBy: {
        name: 'Alex',
        avatar: avatars[0],
      },
      purchased: false,
      affiliateLink: 'https://example.com/speaker',
    },
    {
      id: uuid(),
      name: 'Dinner Set',
      description: 'Elegant 16-piece dinnerware.',
      price: '79.99',
      purchased: false,
    },
  ])

  const handleClaimItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              claimedBy: { name: 'You', avatar: '😎' },
            }
          : item
      )
    )
  }

  const handleUnclaimItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, claimedBy: undefined } : item
      )
    )
  }

  const handleMarkPurchased = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: true } : item
      )
    )
  }

  const handleAddItems = (newItems: Partial<RegistryItem>[]) => {
    const enriched = newItems.map((item) => ({
      ...item,
      id: uuid(),
      purchased: false,
    })) as RegistryItem[]
    setItems((prev) => [...prev, ...enriched])
  }

  return (
    <RegistryList
      registryTitle="Ukeme & Joy's Registry"
      items={items}
      onClaimItem={handleClaimItem}
      onUnclaimItem={handleUnclaimItem}
      onMarkPurchased={handleMarkPurchased}
      onAddItems={handleAddItems}
    />
  )
}
