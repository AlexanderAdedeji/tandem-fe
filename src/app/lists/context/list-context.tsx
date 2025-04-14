'use client'

import React, { useState, createContext, useContext } from 'react'
interface List {
  id: string
  title: string
  type: 'grocery' | 'tasks' | 'event' | 'other' | 'registry' | 'goal' | 'bills'
  itemCount: number
  collaborators: number
  updatedAt: string
  targetDate?: string
  description?: string
  archived?: boolean
  archivedAt?: string
}
interface ListItem {
  id: string
  content: string
  description?: string
  completed: boolean
  dueDate?: string
  time?: string
  location?: string
  attendees?: number
  quantity?: number
  category?: string
  price?: string
  assignedTo?: string
  priority?: 'low' | 'medium' | 'high'
  links?: {
    url: string
    title: string
    type: string
  }[]
  virtualMeetingUrl?: string
}
interface ListContextType {
  lists: List[]
  addList: (list: List) => void
  deleteList: (id: string) => void
  getListById: (id: string) => List | undefined
  updateListCollaborators: (id: string, count: number) => void
  updateListItems: (listId: string, items: ListItem[]) => void
  getListItems: (listId: string) => ListItem[]
  archiveList: (id: string) => void
  unarchiveList: (id: string) => void
  getArchivedLists: () => List[]
  addItem: (listId: string, item: Omit<ListItem, 'id'>) => void
}
const ListContext = React.createContext<ListContextType>({
  lists: [],
  addList: () => {},
  deleteList: () => {},
  getListById: () => undefined,
  updateListCollaborators: () => {},
  updateListItems: () => {},
  getListItems: () => [],
  archiveList: () => {},
  unarchiveList: () => {},
  getArchivedLists: () => [],
  addItem: () => {},
})
export const useList = () => React.useContext(ListContext)
export const ListProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [lists, setLists] = useState<List[]>([])
  const [listItems, setListItems] = useState<Record<string, ListItem[]>>({})
  
  const addList = (list: List) => {
    setLists([...lists, list])
    setListItems({
      ...listItems,
      [list.id]: [],
    })
  }
  
  const deleteList = (id: string) => {
    setLists(lists.filter((list) => list.id !== id))
    const newListItems = {
      ...listItems,
    }
    delete newListItems[id]
    setListItems(newListItems)
  }
  
  const getListById = (id: string) => {
    return lists.find((list) => list.id === id)
  }
  
  const updateListCollaborators = (id: string, count: number) => {
    setLists(
      lists.map((list) =>
        list.id === id
          ? {
              ...list,
              collaborators: count,
            }
          : list,
      ),
    )
  }
  
  const updateListItems = (listId: string, items: ListItem[]) => {
    setListItems({
      ...listItems,
      [listId]: items,
    })
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              itemCount: items.length,
              updatedAt: new Date().toISOString(),
            }
          : list,
      ),
    )
  }
  
  const getListItems = (listId: string) => {
    return listItems[listId] || []
  }
  
  const archiveList = (id: string) => {
    setLists(
      lists.map((list) =>
        list.id === id
          ? {
              ...list,
              archived: true,
              archivedAt: new Date().toISOString(),
            }
          : list,
      ),
    )
  }
  
  const unarchiveList = (id: string) => {
    setLists(
      lists.map((list) =>
        list.id === id
          ? {
              ...list,
              archived: false,
              archivedAt: undefined,
            }
          : list,
      ),
    )
  }
  
  const getArchivedLists = () => {
    return lists.filter((list) => list.archived)
  }
  
  const addItem = (listId: string, item: Omit<ListItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    };
    
    setListItems((prevListItems) => {
      const updatedItems = {
        ...prevListItems,
        [listId]: [...(prevListItems[listId] || []), newItem],
      };
      
      // Update lists with the new item count
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? {
                ...list,
                itemCount: updatedItems[listId].length,
                updatedAt: new Date().toISOString(),
              }
            : list,
        ),
      );
      
      return updatedItems;
    });
  };
  
  return (
    <ListContext.Provider
      value={{
        lists,
        addList,
        deleteList,
        getListById,
        updateListCollaborators,
        updateListItems,
        getListItems,
        archiveList,
        unarchiveList,
        getArchivedLists,
        addItem,
      }}
    >
      {children}
    </ListContext.Provider>
  )
}
