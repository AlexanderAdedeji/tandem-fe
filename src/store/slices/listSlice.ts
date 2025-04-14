import { create } from 'zustand';

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListStateType {
  items: ListItem[];
  isLoading: boolean;
  error: string | null;
  selectedItem: ListItem | null;
  setItems: (items: ListItem[]) => void;
  addItem: (item: ListItem) => void;
  updateItem: (id: string, updates: Partial<ListItem>) => void;
  deleteItem: (id: string) => void;
  setSelectedItem: (item: ListItem | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useListStore = create<ListStateType>()((set) => ({
  items: [],
  isLoading: false,
  error: null,
  selectedItem: null,
  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})); 