import React from "react";
import Image from "next/image";

type SearchBarProps = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  value?: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  className: string;
};

const SearchBar = ({ onSubmit, value, setSearchTerm, className }: SearchBarProps) => {
  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="flex px-[1.5rem] py-[0.75rem]">
        <input
          type="text"
          className="mr-[1.12rem] w-full text-[0.875rem] placeholder-[#D2CDF6] focus:outline-none"
          placeholder="검색어를 입력하세요."
          value={value}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit" className="">
          <div className="h-[1.5rem] w-[1.5rem]">
            <Image
              src="/assets/svg/search.svg"
              alt="검색 아이콘"
              width={24}
              height={24}
              className="h-full w-full object-cover"
            />
          </div>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
