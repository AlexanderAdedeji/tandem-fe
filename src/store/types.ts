import { AuthState } from './slices/authSlice';
import { ListState } from './slices/listSlice';

export interface RootState {
  auth: AuthState;
  list: ListState;
}

// Store selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectList = (state: RootState) => state.list;

// Auth selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;

// List selectors
export const selectItems = (state: RootState) => state.list.items;
export const selectSelectedItem = (state: RootState) => state.list.selectedItem;
export const selectIsLoading = (state: RootState) => state.list.isLoading;
export const selectError = (state: RootState) => state.list.error; 