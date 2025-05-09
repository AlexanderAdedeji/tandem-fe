// components/PushNotificationManager.tsx
'use client'

import { useState, useEffect } from 'react'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function PushNotificationManager() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          setSubscription(sub)
        })
      })
    }
  }, [])

  async function subscribe() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    })
    setSubscription(sub)
    await fetch('/api/push', {
      method: 'POST',
      body: JSON.stringify({ subscription: sub, message: 'Subscribed!' }),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <div>
      {subscription ? (
        <p>You are subscribed to push notifications.</p>
      ) : (
        <button onClick={subscribe}>Subscribe to Push Notifications</button>
      )}
    </div>
  )
}
