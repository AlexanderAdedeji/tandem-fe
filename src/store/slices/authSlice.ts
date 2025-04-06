
import { AuthDataSchemaInterface } from '@/shared/model';
import { StateCreator } from 'zustand';


export type AuthStateType = {
  authLoading: boolean;
  loggedIn: boolean;
  setLoggedIn: (arg: boolean) => void;
  setAuthLoading: (arg: boolean) => void;
  authDetails: AuthDataSchemaInterface;
  setAuthDetails: (arg: AuthDataSchemaInterface) => void;
  setPartialAuthDetails: (arg: Partial<AuthDataSchemaInterface>) => void

};

const authSlice: StateCreator<AuthStateType, [['zustand/devtools', never]], []> = (set) => ({
  authLoading: true,
  loggedIn: false,
  authDetails: {
    email: '',
    first_name: '',
    last_name: '',
    token: '',
    
  },
  setAuthLoading: (arg) => set({ authLoading: arg }),
  setLoggedIn: (arg) => set({ loggedIn: arg }),
  setAuthDetails: (arg) => set({ authDetails: arg }),

  setPartialAuthDetails: (partialDetails) =>
    set((state) => ({
      authDetails: state.authDetails ? { ...state.authDetails, ...partialDetails } : partialDetails as AuthDataSchemaInterface,
    })),
});

export default authSlice;