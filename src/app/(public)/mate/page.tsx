"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import MatePostList from "./_components/post/matePostList";
import PostListFilterTab from "./_components/postListFilterTab";
import PostItemFilterTab from "./_components/postItemFilterTab";
// import SearchBar from "./_components/searchBar";
import FilterSelectChip from "./_components/filterSelectChip";
import FilterDateChip from "./_components/filterDateChip";

import { useAuthStore } from "@/zustand/useAuth";
import NotLogInView from "./_components/notLogInView";
import FilterWeightChip from "./_components/filterWeightChip";
import { age, gender, male_female, position } from "./array";
import { DateValue } from "@nextui-org/react";

export type PositionData = {
  center: {
    lat: number;
    lng: number;
  };
  errMsg?: string;
  isLoading: boolean;
} | null;

const MatePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCurrentPosts, setIstCurrentPosts] = useState<boolean>(true);
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const { user } = useAuthStore();


  const [filters, setFilters] = useState({
    gender: null,
    age: null,
    date_time: null,
    position: null,
    male_female: null,
    weight: null,
  });
  const [date_time, setDate_time] = useState<DateValue | null>(null);

  const updateFilter = (filterName: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSearchPosts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveSearchTerm(searchQuery);
  };

  const handleToggleAllPosts = () => setIstCurrentPosts(!isCurrentPosts);
  const handleDateSort = () => setSortBy("date");
  const handleDistanceSort = () => setSortBy("distance");
  const handleDistanceFilter = () =>  setFilterBy("distance");
  const handleResetFilter = () => {
    // 초기화를 위한 
    setFilterBy("reset");
  }

  if (user === null) {
    return (
      <NotLogInView />
    );
  }

  return (
    <div className="mx-8">
      <h1 className="mb-7 p-2 text-3xl">산책 메이트</h1>
      <div className="flex flex-row gap-x-5">
        {/* 왼쪽 메인 컨텐츠 영역 */}
        <div className="w-3/4">
          <div className="mb-5">
            <PostListFilterTab
              isCurrentPosts={isCurrentPosts}
              handleToggleAllPosts={handleToggleAllPosts}
              handleDateSort={handleDateSort}
              handleDistanceSort={handleDistanceSort}
            />
          </div>
          <MatePostList
            activeSearchTerm={activeSearchTerm}
            isCurrentPosts={isCurrentPosts}
            sortBy={sortBy}
            filters={filters}
          />
        </div>

        {/* 오른쪽 사이드바 영역 */}
        <div className="w-1/4 pl-5">
          <div className="mt-1 flex">
            <Link href="/mate/posts" className="mb-4 h-10 w-full items-center rounded-lg bg-mainColor p-2 text-center">
              <div>글쓰기 🐾</div>
            </Link>
          </div>
          <div className="mb-5 flex">
            <form onSubmit={handleSearchPosts} className="flex w-full flex-row items-center rounded-full border p-1">
              <input
                type="text"
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ml-2">
                🔍
              </button>
            </form>
          </div>
          {/* <PostItemFilterTab updateFilter={updateFilter} filters={filters} /> */}
          {/* <PostItemFilterTab handleDistanceFilter={handleDistanceFilter}  updateFilter={updateFilter} filters={filters}  /> */}
          <div className="w-full">
      <div>
        <p className="text-lg">메이트 상세 필터</p>
        <FilterSelectChip
          label="성별"
          array={gender}
          selected={filters.gender}
          onSelect={(items) => updateFilter("gender", items)}
        />
        <FilterSelectChip
          label="연령대"
          array={age}
          selected={filters.age}
          onSelect={(items) => updateFilter("age", items)}
        />
        <FilterDateChip 
          label="산책일" 
          selectedDate={date_time} 
          onDateChange={setDate_time} 
        />  
        <FilterSelectChip
          label="거리"
          array={position}
          selected={filters.position}
          onSelect={(items) => updateFilter("position", items)}
        />
      </div>
      <div className="mt-5">
        <p className="text-lg">반려견 정보 필터</p>
        <FilterWeightChip label="반려견 몸무게" />
        <FilterSelectChip
          label="성별"
          array={male_female}
          selected={filters.male_female}
          onSelect={(items) => updateFilter("male_female", items)}
        />
      </div>
    </div>
          <div className="mt-5 flex">
              <div className="mb-4 h-10 w-full items-center rounded-lg bg-gray-300 p-2 text-center" onClick={handleResetFilter}>초기화</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatePage;
