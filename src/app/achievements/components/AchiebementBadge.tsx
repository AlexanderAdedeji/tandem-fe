import React from "react";
import { motion } from "framer-motion";
import { Achievement } from "../context/AchievementContext";
interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
}
export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = "md",
  showProgress = true,
}) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-2xl",
    md: "w-16 h-16 text-3xl",
    lg: "w-20 h-20 text-4xl",
  };
  const getProgressColor = () => {
    if (!achievement.progress || !achievement.maxProgress) return "bg-gray-200";
    const progress = (achievement.progress / achievement.maxProgress) * 100;
    if (progress >= 100) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="relative"
    >
      <div
        className={`${sizeClasses[size]} rounded-full bg-white dark:bg-[#2B2C5D] shadow-lg flex items-center justify-center relative overflow-hidden`}
      >
        {showProgress &&
          achievement.progress !== undefined &&
          achievement.maxProgress && (
            <div className="absolute inset-0">
              <div
                className={`h-full ${getProgressColor()} transition-all duration-500`}
                style={{
                  width: `${
                    (achievement.progress / achievement.maxProgress) * 100
                  }%`,
                }}
              />
            </div>
          )}
        <span className="relative z-10">{achievement.icon}</span>
      </div>
      {achievement.unlockedAt && (
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};
