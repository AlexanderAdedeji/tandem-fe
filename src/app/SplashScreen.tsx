import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const SplashScreen: React.FC = () => {
  const [showLogo, setShowLogo] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 500);
    router.push("/intro");
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#5855FF] to-[#2B2C5D] flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: showLogo ? 1 : 0,
          scale: showLogo ? 1 : 0.8,
          rotate: showLogo ? 0 : -10,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex flex-col items-center"
      >
        <Image
           src= '/splash-screen.png'
          alt="Tandem Logo"
          width={160}
          height={160}
          className="object-contain mb-6"
          priority
        />
        <motion.h1
          className="text-white text-3xl font-bold"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: showLogo ? 1 : 0,
            y: showLogo ? 0 : 20,
          }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
        >
          Tandem
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
