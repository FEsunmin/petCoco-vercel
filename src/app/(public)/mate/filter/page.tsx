"use client";

import FilterDateSelect from "../_components/select/filterDateSelect";
import FilterWeightSelect from "../_components/select/filterWeightSelect";
import FilterOptionSelect from "../_components/select/filterOptionSelect";
import Button from "@/components/Button";
import { gender, age, regions, times, male_female } from "../selectOptionArray";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Male_femaleFilter from "../_components/filter/button/male_femaleFilter";
import NeuteredFilter from "../_components/filter/button/neuteredFilter";
import { useFilterStore } from "@/zustand/useFilterStore";

export type Filters = {
  gender: string | null;
  age: string | null;
  date_time: string | undefined;
  male_female: string | null;
  weight: string | null;
  regions: string | null;
  times: string | null;
  neutralized: string | null;
};

const FilterPage = () => {
  const { filters, setFilters } = useFilterStore();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedNeutered, setSelectedNeutered] = useState<string | null>(null);

  const router = useRouter();

  const updateFilter = (filterName: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleSaveFilter = () => {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });

    router.push(`/mate?${queryParams.toString()}`);
    // router.replace(`/mate?${queryParams.toString()}`);
  };

  const handleResetFilter = () => {
    setFilters({
      gender: null,
      age: null,
      date_time: undefined,
      male_female: null,
      weight: null,
      regions: null,
      times: null,
      neutralized: null
    });
    setSelectedGender(null);
    setSelectedNeutered(null);

    router.push("/mate");
  };

  // console.log(filters);

  return (
    <div>
      <div className="mx-auto max-w-[420px]">
        <p className="ml-[1rem] mt-[1rem] text-[1.5rem] font-[600]">산책 메이트 상세 필터</p>
        <div className="w-full px-[1.5rem]">
          <FilterOptionSelect
            label="성별"
            array={gender}
            selected={filters.gender}
            onSelect={(items) => updateFilter("gender", items)}
          />
          <FilterOptionSelect
            label="연령대"
            array={age}
            selected={filters.age}
            onSelect={(items) => updateFilter("age", items)}
          />
          <FilterOptionSelect
            label="지역별"
            array={regions}
            selected={filters.regions}
            onSelect={(items) => updateFilter("regions", items)}
          />
          <FilterDateSelect
            label="산책일"
            selected={filters.date_time}
            onSelect={(items) => updateFilter("date_time", items)}
          />
          <FilterOptionSelect
            label="시간대"
            array={times}
            selected={filters.times}
            onSelect={(items) => updateFilter("times", items)}
          />
        </div>
        <p className="ml-[1rem] mt-[3.38rem] text-[1.5rem] font-[600]">반려견 정보 필터</p>
        <div className="mt-5 px-[1.5rem]">
          <Male_femaleFilter
            selectedGender={selectedGender || filters.male_female}
            setSelectedGender={setSelectedGender}
            onSelect={(items) => updateFilter("male_female", items)}
          />
          <NeuteredFilter
            selectedNeutered={selectedNeutered || filters.neutralized}
            setSelectedNeutered={setSelectedNeutered}
            onSelect={(items) => updateFilter("neutralized", items)}
          />
          <FilterWeightSelect
            label="몸무게"
            selected={filters.weight}
            onSelect={(items) => updateFilter("weight", items)}
          />
        </div>
        <div className="mb-[6.63rem] mt-[3.63rem] flex flex-col gap-y-[0.5rem] px-[1.5rem]">
          <Button
            className="flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-[0.5rem] bg-mainColor px-[8.53rem] py-[0.75rem] text-[0.9375rem] font-[590] text-white"
            text="저장하기"
            onClick={handleSaveFilter}
          />
          <Button
            className="mb-[2rem] flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-[0.5rem] border-1 border-mainColor px-[8rem] py-[0.75rem] text-[0.9375rem] font-[590] text-mainColor"
            text="초기화 하기"
            onClick={handleResetFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
