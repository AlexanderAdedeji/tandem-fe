import { AuthStateType } from "./slices/authSlice";
import { ListStateType } from "./slices/listSlice";

export interface RootState {
  auth: AuthStateType;
  list: ListStateType;
}

// Store selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectList = (state: RootState) => state.list;

// Auth selectors
export const selectAuthDetails = (state: RootState) => state.auth.authDetails;
export const selectIsLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectAuthLoading = (state: RootState) => state.auth.authLoading;

// List selectors
export const selectItems = (state: RootState) => state.list.items;
export const selectSelectedItem = (state: RootState) => state.list.selectedItem;
export const selectIsLoading = (state: RootState) => state.list.isLoading;
export const selectError = (state: RootState) => state.list.error; 