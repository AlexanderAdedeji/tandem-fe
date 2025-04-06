import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import authSlice, { AuthStateType } from './slices/authSlice';

// import templateCartSlice, { TemplateCartStateType } from './template-cart';


export type StoreType = AuthStateType


const useStore = create<StoreType>()(
    persist(
        devtools((...a) => ({
            ...authSlice(...a),
            //   ...templateCartSlice(...a)
        })),
        { name: 'e-affidavit-public-store' }
    )
);


export default useStore;



