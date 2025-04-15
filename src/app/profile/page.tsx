'use client'



import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Moon, Palette, Archive, User, Bell } from "lucide-react";

import { useThemeCustomization } from "@/shared/context/ThemeCustomisationContext";
import { useAchievements } from "../achievements/context/AchievementContext";
import { AchievementBadge } from "../achievements/components/AchiebementBadge";
import { ArchivedLists } from "./components/ArchivedLists";
import ColorPaletteSelector from "./components/ColorPalleteSelector";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const router = useRouter();
  const { isDarkMode, toggleTheme, colors } = useThemeCustomization();
  const { achievements, currentStreak, unlockedAchievements } =
    useAchievements();
  const [showPaletteSelector, setShowPaletteSelector] = useState(false);
  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B25]">
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-4"
          >
            <ArrowLeft
              size={20}
              className="text-[#2E2E2E] dark:text-[#E9E9E9]"
            />
          </button>
          <h1 className="text-xl font-bold text-[#2E2E2E] dark:text-[#E9E9E9]">
            Profile
          </h1>
        </div>
      </header>
      <div className="p-6">
        <div className="mb-8 flex items-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            A
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#E9E9E9]">
              Alex Johnson
            </h2>
            <p className="text-[#666] dark:text-[#AAA]">alex@example.com</p>
            {currentStreak > 0 && (
              <div className="flex items-center mt-2 text-sm">
                <span className="text-[#5855FF] dark:text-[#FF914D] font-medium">
                  🔥 {currentStreak} day streak!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#2E2E2E] dark:text-[#E9E9E9] mb-4">
            Achievements ({unlockedAchievements.length}/{achievements.length})
          </h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex flex-col items-center">
                <AchievementBadge achievement={achievement} />
                <span className="text-xs text-center mt-2 text-[#666] dark:text-[#AAA]">
                  {achievement.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-[#2B2C5D] rounded-xl overflow-hidden mb-6">
          <button
            onClick={() => setShowPaletteSelector(true)}
            className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center">
              <Palette
                size={20}
                style={{
                  color: colors.primary,
                }}
                className="mr-3"
              />
              <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                Color Theme
              </span>
            </div>
            <div
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor: colors.primary,
              }}
            />
          </button>
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Moon
                size={20}
                style={{
                  color: colors.primary,
                }}
                className="mr-3"
              />
              <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                Dark Mode
              </span>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                id="darkModeToggle"
                checked={isDarkMode}
                onChange={toggleTheme}
                className="sr-only"
              />
              <label
                htmlFor="darkModeToggle"
                className="block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out"
                style={{
                  backgroundColor: isDarkMode ? colors.primary : "#D1D5DB",
                }}
              >
                <span
                  className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transform transition-transform duration-300 ease-in-out ${
                    isDarkMode ? "translate-x-6" : ""
                  }`}
                />
              </label>
            </div>
          </div>
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Archive
                size={20}
                style={{
                  color: colors.primary,
                }}
                className="mr-3"
              />
              <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                Archived Lists
              </span>
            </div>
            <span className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              3
            </span>
          </button>
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Bell
                size={20}
                style={{
                  color: colors.primary,
                }}
                className="mr-3"
              />
              <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                Notifications
              </span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4">
            <div className="flex items-center">
              <User
                size={20}
                style={{
                  color: colors.primary,
                }}
                className="mr-3"
              />
              <span className="text-[#2E2E2E] dark:text-[#E9E9E9]">
                Account Settings
              </span>
            </div>
          </button>
        </div>
        <ArchivedLists />
      </div>
      {showPaletteSelector && (
        <ColorPaletteSelector onClose={() => setShowPaletteSelector(false)} />
      )}
    </div>
  );
};

export default Profile;
