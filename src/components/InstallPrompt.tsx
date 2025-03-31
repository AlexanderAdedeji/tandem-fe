// src/components/InstallPrompt.tsx
'use client';

import React, { useEffect, useState } from 'react';

// Define an interface for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

// Add proper type definitions
interface INavigator extends Navigator {
  standalone?: boolean;
}

// Add at the top with other interfaces
interface IWindow extends Window {
  MSStream?: any;
}

// Utility function to detect iOS devices
function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as IWindow).MSStream;
}

// Utility function to check if the app is already installed (standalone mode)
function isInStandaloneMode(): boolean {
  const nav = navigator as INavigator;
  const isStandaloneIOS = nav.standalone === true;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  return isStandaloneIOS || isStandalone;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIosDevice, setIsIosDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsIosDevice(isIOS());

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (isInStandaloneMode()) return null;

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.info('User accepted the install prompt');
      } else {
        console.info('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error during install prompt:', error);
    } finally {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        background: '#fff',
        border: '1px solid #ddd',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
      }}
    >
      {isIosDevice ? (
        <div>
          <p style={{ marginBottom: '0.5rem' }}>
            For the best experience, add Tandem to your Home Screen.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#555' }}>
            Tap the Share icon in Safari and then select &quot;Add to Home Screen&quot;.
          </p>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: '0.5rem' }}>
            Install Tandem for an enhanced, app-like experience!
          </p>
          <button
            onClick={handleInstallClick}
            style={{
              background: '#2ABFA3',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Install App
          </button>
        </div>
      )}
    </div>
  );
};

export default InstallPrompt;
