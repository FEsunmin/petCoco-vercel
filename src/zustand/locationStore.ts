import { create } from "zustand";
import { Position } from "@/types/position.type";

type UseLocationStore = {
  position: Position;
  address: string;
  geoData: {
    center: {
      lat: number;
      lng: number;
    };
    isLoading: boolean;
  };
  isUseGeo: boolean;
  setPosition: (position: Partial<Position>) => void;
  setAddress: (address: string) => void;
  setGeoData: (geoData: Partial<Position>) => void;
  setIsUseGeo: (isUseGeo: boolean) => void;
};

export const locationStore = create<UseLocationStore>((set) => ({
  position: {
    center: { lat: 37.5556236021213, lng: 126.992199507869 },
    errMsg: null,
    isLoading: true
  },
  setPosition: (newPosition) => {
    return set((state) => ({
      position: { ...state.position, ...newPosition }
    }));
  },
  address: "서울특별시 중구 삼일대로 231",
  setAddress: (address) => set({ address }),
  geoData: {
    center: { lat: 37.5556236021213, lng: 126.992199507869 },
    isLoading: true
  },
  setGeoData: (newGeo) => {
    return set((state) => ({
      geoData: { ...state.geoData, ...newGeo }
    }));
  },
  isUseGeo: true,
  setIsUseGeo: (isUseGeo) => set({ isUseGeo }),
}));
