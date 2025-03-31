
import { NextResponse } from 'next/server'
import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:alexadedeji15@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function POST(request: Request) {
  const { subscription, message } = await request.json()

  try {
    await webpush.sendNotification(subscription, JSON.stringify({
      title: 'Tandem Notification',
      body: message,
      icon: '/icon-192x192.png',
      url: '/',
    }))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.error()
  }
}
