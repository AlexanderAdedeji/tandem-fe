// "use client";

// import React, { useEffect, useState } from "react";

// interface BeforeInstallPromptEvent extends Event {
//   prompt: () => Promise<void>;
//   userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
// }

// interface INavigator extends Navigator {
//   standalone?: boolean;
// }

// interface IWindow extends Window {
//   MSStream?: any;
// }

// function isIOS(): boolean {
//   if (typeof window !== "undefined") {
//     return (
//       /iPad|iPhone|iPod/.test(navigator.userAgent) &&
//       !(window as IWindow).MSStream
//     );
//   }
//   return false;
// }

// function isInStandaloneMode(): boolean {
//   if (typeof window !== "undefined") {
//     const nav = navigator as INavigator;
//     const isStandaloneIOS = nav.standalone === true;
//     const isStandalone = window.matchMedia(
//       "(display-mode: standalone)"
//     ).matches;
//     return isStandaloneIOS || isStandalone;
//   }
//   return false;
// }

// const InstallPrompt: React.FC = () => {
//   const [deferredPrompt, setDeferredPrompt] =
//     useState<BeforeInstallPromptEvent | null>(null);
//   const [showPrompt, setShowPrompt] = useState<boolean>(false);
//   const [isIosDevice, setIsIosDevice] = useState<boolean>(false);

//   useEffect(() => {
//     setIsIosDevice(isIOS());

//     if (typeof window !== "undefined") {
//       const handler = (e: Event) => {
//         e.preventDefault();

//         console.log("beforeinstallprompt event fired");

//         setDeferredPrompt(e as BeforeInstallPromptEvent);
//         setShowPrompt(true);
//       };

//       window.addEventListener("beforeinstallprompt", handler);
//       return () => {
//         window.removeEventListener("beforeinstallprompt", handler);
//       };
//     }
//   }, []);

//   if (isInStandaloneMode()) return null;

//   const handleInstallClick = async () => {
//     if (!deferredPrompt) return;
//     try {
//       await deferredPrompt.prompt();
//       const choiceResult = await deferredPrompt.userChoice;
//       if (choiceResult.outcome === "accepted") {
//         console.info("User accepted the install prompt");
//       } else {
//         console.info("User dismissed the install prompt");
//       }
//     } catch (error) {
//       console.error("Error during install prompt:", error);
//     } finally {
//       setDeferredPrompt(null);
//       setShowPrompt(false);
//     }
//   };

//   if (!showPrompt) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "1rem",
//         right: "1rem",
//         background: "#000",
//         border: "1px solid #ddd",
//         padding: "1rem",
//         borderRadius: "8px",
//         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//         zIndex: 1000,
//       }}
//     >
//       {isIosDevice ? (
//         <div>
//           <p>For the best experience, add Tandem to your Home Screen.</p>
//           <p>
//             Tap the Share icon in Safari and then select &quot;Add to Home
//             Screen&quot;.
//           </p>
//         </div>
//       ) : (
//         <div>
//           <p>Install Tandem for an enhanced, app-like experience!</p>
//           <button onClick={handleInstallClick}>Install App</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstallPrompt;
// src/components/InstallPrompt.tsx
"use client";

import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// Utility to detect iOS devices
function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

// Utility to check if app is already installed (standalone mode)
function isInStandaloneMode(): boolean {
  const isStandaloneIOS = (navigator as any).standalone === true;
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  return isStandaloneIOS || isStandalone;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showAndroidPrompt, setShowAndroidPrompt] = useState<boolean>(false);
  const [isIosDevice, setIsIosDevice] = useState<boolean>(false);

  useEffect(() => {
    const iOS = isIOS();
    setIsIosDevice(iOS);

    // For non-iOS devices, listen for the beforeinstallprompt event
    if (!iOS) {
      const handler = (e: Event) => {
        e.preventDefault();
        console.log("beforeinstallprompt event fired");
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowAndroidPrompt(true);
      };

      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  // If app is already installed, don't show any prompt
  if (isInStandaloneMode()) return null;

  // Function to handle install prompt for Android (and other non-iOS devices)
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log(`User choice: ${choiceResult.outcome}`);
    } catch (error) {
      console.error("Error during install prompt:", error);
    } finally {
      setDeferredPrompt(null);
      setShowAndroidPrompt(false);
    }
  };

  // Render for iOS: always show manual instructions if on iOS and not installed
  if (isIosDevice) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          background: "#fff",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        <p style={{ marginBottom: "0.5rem" }}>
          For the best experience, add Tandem to your Home Screen.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#555" }}>
          On iOS, tap the Share icon in Safari and then select &quot;Add to Home Screen&quot;.
        </p>
      </div>
    );
  }

  // Render for Android (and other browsers that support beforeinstallprompt)
  if (showAndroidPrompt && deferredPrompt) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          background: "#fff",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        <p style={{ marginBottom: "0.5rem" }}>
          Install Tandem for an enhanced, app-like experience!
        </p>
        <button
          onClick={handleInstallClick}
          style={{
            background: "#2ABFA3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Install App
        </button>
      </div>
    );
  }

  // If no prompt should be shown
  return null;
};

export default InstallPrompt;
