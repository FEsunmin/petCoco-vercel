"use client";

import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import PostList from "./_components/PostList";
import {
  handleTabIntroduction,
  sortCategory,
  tabs
} from "@/components/community/communityTabAndSortTab/TabAndCategory";

const CommunityMainPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("전체");
  const [selectedSort, setSelectedSort] = useState<string>("최신순");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [showMoreKeywords, setShowMoreKeywords] = useState<boolean>(false);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveSearchTerm(searchTerm);
  };

  return (
    <div className="mx-auto min-h-screen">
      <div className="h-full w-full bg-white px-[1.5rem] lg:px-0">
        <div className="max-w-[420px] lg:max-w-full">
          <div className="lg:ml-[20%]">
            <h2 className="mb-4 mt-[2rem] text-[2rem] font-semibold">커뮤니티</h2>
            <div className="mb-4 text-[1rem]">
              여러분의 소중한 반려동물 이야기를 <br />
              자유롭게 들려주세요
            </div>
          </div>
          <div className="lg:mx-auto lg:max-w-2xl">
            <SearchBar onSubmit={handleSearchSubmit} value={searchTerm} setSearchTerm={setSearchTerm} />
            {/* 최근 핫 키워드 */}
            <div>
              <div className="flex w-full justify-center gap-[0.62rem] py-[0.62rem]">
                {tabs.slice(0, showMoreKeywords ? undefined : 9).map((keyword, index) => (
                  <button
                    key={keyword}
                    className={`rounded-full border px-[0.62rem] py-[0.38rem] text-[0.89rem] ${
                      selectedTab === keyword ? "bg-mainColor text-white" : "border border-mainColor text-mainColor"
                    }`}
                    onClick={() => {
                      if (index === 8 && !showMoreKeywords) {
                        setShowMoreKeywords(true);
                      } else {
                        setSelectedTab(keyword);
                      }
                    }}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:px-[1.5rem]">
          <div className="">
            {/* 정렬영역 - components의 TabAndCategory에서 관리 */}
            <div className="">
              <div className="flex gap-[0.62rem]">
                {sortCategory.map((sort) => (
                  <button
                    key={sort}
                    className={`py-[0.62rem] text-[1rem] ${selectedSort === sort ? "font-bold" : ""}`}
                    onClick={() => setSelectedSort(sort)}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:bg-[#D2CDF6] lg:p-12">
          <div className="lg:rounded-xl lg:bg-white lg:px-6 lg:py-2">
            <PostList selectedCategory={selectedTab} searchTerm={activeSearchTerm} selectedSort={selectedSort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityMainPage;
