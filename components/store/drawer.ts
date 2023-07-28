'use client';
import { create } from 'zustand'
import { PlinkoState, GameState, DrawerState } from "@/components/store/types";


export const useDrawerStore = create<DrawerState>((set, get) => ({
  sideBar: false,
  setSideBar: (sideBar) => set({ sideBar })
}))
