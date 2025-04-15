"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Bell,
  Link as LinkIcon,
  Repeat,
  Share,
} from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import { useCalendar } from "@/shared/context/calendar-context";
import { MonthView } from "./components/MonthView";
import { TimelineView } from "./components/TimeLineView";
import { DayView } from "./components/DayView";
import { WeekView } from "./components/WeekView";
import { EventModal } from "./components/EventModal";
import { BottomNavigation } from "../dashboard/components/BottomNavigation";

export default function Calendar() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const { view, setView, selectedDate, setSelectedDate } = useCalendar();
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date | null>(null);
  const highlightedItem = searchParams?.get("highlightedItem") || undefined;
  const handleDateClick = (date: Date) => {
    setSelectedTimeSlot(date);
    setShowEventModal(true);
  };
  const handlePrevious = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };
  const handleNext = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };
  const renderViewContent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -10,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        {view === "month" && (
          <MonthView
            highlightedItem={highlightedItem}
            onDateClick={handleDateClick}
          />
        )}
        {view === "week" && <WeekView onTimeSlotClick={handleDateClick} />}
        {view === "day" && <DayView />}
        {view === "timeline" && <TimelineView />}
      </motion.div>
    </AnimatePresence>
  );
  return (
    <div className="min-h-screen bg-white dark:bg-[#1A1B25] p-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {format(selectedDate, "MMMM yyyy")}
            </h1>
            <div className="flex items-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={handlePrevious}
                className=" rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={handleNext}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {(["month", "week", "day", "timeline"] as const).map((v) => (
                <motion.button
                  key={v}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === v
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </motion.button>
              ))}
            </div>
            {/* <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => setShowEventModal(true)}
              className="p-2 bg-[#5855FF] dark:bg-[#FF914D] rounded-full text-white shadow-lg flex items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </motion.button> */}
          </div>
        </div>
        {renderViewContent()}
        <AnimatePresence>
          {showEventModal && (
            <EventModal
              onClose={() => {
                setShowEventModal(false);
                setSelectedTimeSlot(null);
              }}
              initialDate={selectedTimeSlot}
            />
          )}
        </AnimatePresence>
      </div>
      <BottomNavigation onAddAction={() => setShowEventModal(true)} />
    </div>
  );
}
