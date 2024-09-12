import { UserType } from "./auth.type";
import { Json, Tables } from "./supabase";
export type MatePostType = Tables<"matePosts">;
export type matepostpetsType = Tables<"matepostpets">;
export type UsersPetType = Tables<"usersPet">;

export type UserTypeForUsers = {
  id: string;
  age: string | null;
  mbti: string | null;
  email: string | null;
  gender: string | null;
  nickname: string;
  created_at: string;
  profile_img: string | null;
  introduction: string | null;
};

export type MatePostFullType = MatePostType & {
  position: {
    center: {
      lat: number;
      lng: number;
    };
    errMsg: string | null;
    isLoading: boolean;
  };
  users: UserType;
};

export type MatePostAllTypeForItem = MatePostType & {
  position: {
    center: {
      lat: number;
      lng: number;
    };
    errMsg: string | null;
    isLoading: boolean;
  };
  users: UserType;
  distance: number;
};

export type MatePostAllType = MatePostType & {
  position: {
    center: {
      lat: number;
      lng: number;
    };
    errMsg: string | null;
    isLoading: boolean;
  };
  users: UserType;
};

export type MateNextPostType = Omit<MatePostFullType, "id" | "created_at" | "users">;

export type MatePostPetType = {
  post_id?: number; // post_id를 추가
  male_female: string;
  neutralized: string | null;
  weight: number | null;
  characteristics: string;
  age: string;
  pet_name: string;
};

export type Pets_ = {
  male_female: string;
  neutralized: null | string;
  weight: number | null;
  characteristics: string;
  age: string;
  pet_name: string;
};

export type Pets = {
  userId: string;
  pet_id?: string[];
};

export type PostsResponse = {
  data: MatePostAllTypeForItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type valiMatePostAllTypeForItem = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  position: Json;
  members: string;
  date_time: string;
  recruiting: boolean;
  address: string;
  place_name: string;
  location: unknown;
  users: UserType;
  distance: number;
  usersPet: Json | null;
  pet_id: Json;
};
