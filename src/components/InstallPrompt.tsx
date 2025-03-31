// src/components/InstallPrompt.tsx
'use client';

import React, { useEffect, useState } from 'react';

// Utility function to detect iOS devices
function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Utility function to check if app is already installed
function isInStandaloneMode(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
}

const InstallPrompt: React.FC = () => {
  // Holds the beforeinstallprompt event for Android and other browsers
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  // Whether to show the custom install UI
  const [showPrompt, setShowPrompt] = useState(false);
  // Detect if the device is iOS
  const [isIosDevice, setIsIosDevice] = useState(false);

  useEffect(() => {
    setIsIosDevice(isIOS());

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from showing
      e.preventDefault();
      // Save the event for triggering later
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // If in standalone mode, no need to prompt
  const isInstalled = isInStandaloneMode();
  if (isInstalled) return null;

  // Function to handle the install prompt on Android/other browsers
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      (deferredPrompt as any).prompt();
      const choiceResult = await (deferredPrompt as any).userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.info('User accepted the install prompt');
      } else {
        console.info('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error during install prompt:', error);
    } finally {
      // Clear the saved prompt
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  // Render custom UI based on platform
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        background: '#ffffff',
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
            Tap the Share icon in Safari and then select "Add to Home Screen".
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
