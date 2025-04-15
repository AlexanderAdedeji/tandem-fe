"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  X,
  Calendar,
  List,
  Target,
  Gift,
} from "lucide-react";

import { useList } from "../lists/context/list-context";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  type: "list" | "item";
  listId?: string;
  description?: string;
  parentList?: string;
  itemType?:
    | "event"
    | "tasks"
    | "grocery"
    | "registry"
    | "goal"
    | "bills"
    | "other";
}
export const SearchScreen: React.FC = () => {
  const router = useRouter();
  const { lists, getListItems } = useList();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const searchItems = () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      const searchQuery = query.toLowerCase();
      // Search through lists and their items
      const searchResults: SearchResult[] = [];
      lists.forEach((list) => {
        // Search in list titles
        if (list.title.toLowerCase().includes(searchQuery)) {
          searchResults.push({
            id: list.id,
            title: list.title,
            type: "list",
            itemType: list.type,
            description: `${
              list.type.charAt(0).toUpperCase() + list.type.slice(1)
            } List`,
          });
        }
        // Search in list items
        const items = getListItems(list.id);
        items.forEach((item) => {
          if (
            item.content.toLowerCase().includes(searchQuery) ||
            item.description?.toLowerCase().includes(searchQuery)
          ) {
            searchResults.push({
              id: item.id,
              title: item.content,
              type: "item",
              listId: list.id,
              description: item.description,
              parentList: list.title,
              itemType: list.type,
            });
          }
        });
      });
      setResults(searchResults);
      setIsLoading(false);
    };
    const debounce = setTimeout(searchItems, 300);
    return () => clearTimeout(debounce);
  }, [query, lists]);
  const getIcon = (type?: string) => {
    switch (type) {
      case "event":
        return <Calendar className="w-5 h-5 text-yellow-500" />;
      case "goal":
        return <Target className="w-5 h-5 text-emerald-500" />;
      case "registry":
        return <Gift className="w-5 h-5 text-purple-500" />;
      default:
        return <List className="w-5 h-5 text-blue-500" />;
    }
  };
  return (
    <div className="fixed inset-0 bg-white dark:bg-[#1A1B25] z-50">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lists and items..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5855FF] dark:focus:ring-[#FF914D]"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </button>
            )}
          </div>
          <button
            onClick={() => router.back()}
            className="ml-4 px-4 py-2 text-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
        </div>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
                className="w-8 h-8 border-2 border-[#5855FF] dark:border-[#FF914D] border-t-transparent rounded-full"
              />
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Searching...
              </p>
            </motion.div>
          ) : query && results.length === 0 ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              className="text-center py-12"
            >
              <SearchIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No results found for "{query}"
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="space-y-4"
            >
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  onClick={() =>
                    router.push(
                      result.type === "list"
                        ? `/list/${result.id}`
                        : `/list/${result.listId}`
                    )
                  }
                  className="bg-white dark:bg-[#2B2C5D] rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 mr-3">
                      {getIcon(result.itemType)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </h3>
                      {result.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {result.description}
                        </p>
                      )}
                      {result.type === "item" && result.parentList && (
                        <p className="text-xs text-[#5855FF] dark:text-[#FF914D] mt-2">
                          From: {result.parentList}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {!query && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-center py-12"
          >
            <SearchIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Start typing to search...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
