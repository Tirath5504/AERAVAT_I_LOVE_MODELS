import { User } from '@prisma/client';
import {create} from 'zustand';

type MyStoreState = {
    auth: boolean;
    setAuth: (item:boolean) => void;
    creator: boolean;
    setCreator: (item:boolean) => void;
    user: User | null;
    setUser: (item:User | null) => void;
};

const useMyStore = create<MyStoreState>((set) => ({
    auth: false,
    setAuth: (item : boolean) => set(() => ({ auth: item })),
    creator: false,
    setCreator: (item : boolean) => set(() => ({ creator: item })),
    user: null,
    setUser: (item : User | null) => set(() => ({ user: item}))
}));

export default useMyStore;