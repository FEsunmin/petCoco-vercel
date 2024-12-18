"use Client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import { EmblaOptionsType } from "embla-carousel";
import { formatDateTimeTitle } from "@/app/utils/getConvertTime";
import startChat from "@/app/utils/startChat";
import PetCarousel from "../../_components/petCarousel/petCarousel";
import MateInfoItem from "../../_components/mateInfoItem";
import DetailUserCard from "./detailUserCard";
import Button from "@/components/Button";

import { MatePostAllType } from "@/types/mate.type";

interface DetailViewProps {
  post: MatePostAllType;
  userId: string;
  handleEditPost: () => void;
  handleDeletePost: (id: string) => void;
  handleTogglePost: (id: string) => void;
}
const DynamicMapComponent = dynamic(() => import("@/app/(public)/mate/_components/map/mapDetail"), {
  ssr: false,
  loading: () => <div className="h-[15.875rem] w-full rounded-2xl"></div>
});

const DetailView = ({ post, userId, handleEditPost, handleDeletePost, handleTogglePost }: DetailViewProps) => {
  const router = useRouter();
  const { user } = useAuthStore();

  const OPTIONS: EmblaOptionsType = { align: "start", dragFree: true, loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const handleStartChat = () => {
    startChat(post.user_id, user, router);
  };

  return (
    <div className="">
      {/* 제목 및 버튼 영역 */}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="hidden lg:block lg:mx-[1rem] lg:mt-[2.06rem] lg:ml-[1.75rem] lg:text-[2rem] lg:font-[600]">산책 메이트</h1>
          <div className="hidden lg:block lg:border-gray-200 lg:border-[1px] lg:mt-[2rem] lg:mb-[1.79rem]"></div>
          {/* 수정, 삭제, 상태변경 버튼 */}
          <div className="flex flex-col mx-[1rem]">
            {userId === post.user_id && (
              <div className="mb-[0.5rem] flex justify-end gap-x-[0.625rem]">
                <Button
                  onClick={handleEditPost}
                  className="lg:text-md cursor-pointer text-sm text-editBtnColor hover:text-mainColor lg:font-bold"
                  text="수정"
                />
                <Button
                  onClick={() => handleDeletePost(post.id)}
                  className="lg:text-md cursor-pointer text-sm text-delBtnColor hover:text-mainColor lg:font-bold"
                  text="삭제"
                />
                <Button
                  onClick={() => handleTogglePost(post.id)}
                  className="lg:text-md cursor-pointer text-sm text-gray-700 hover:text-mainColor lg:font-bold"
                  text={post.recruiting === true ? "모집완료" : "모집중"}
                />
              </div>
            )}
            {/* 제목, 일시 */}
            <h2 className="mx-auto break-words text-center text-[1.125rem] font-[600] lg:w-full lg:text-left lg:text-[1.5rem]">
              [{post.date_time ? formatDateTimeTitle(post.date_time) : ""}] {post.title}
            </h2>
          </div>

          {/* 반응형 div */}
          <div className="lg:flex lg:gap-x-4 mx-[1rem] ">
            <div className="lg:w-[70%]">
              {/* 본문 내용 */}
              {/* 산책 위치 지도 */}
              <div className="mt-[1.5rem]">
                <DynamicMapComponent
                  center={{
                    lat: Number(post.position?.center?.lat),
                    lng: Number(post.position?.center?.lng)
                  }}
                  tag={post.place_name || ""}
                  className="h-[15.875rem] w-full rounded-[1rem] lg:h-[19.75rem]"
                  // onMapLoad={() => setIsMapLoading(false)}
                />
              </div>
              <div className="mb-[0.79rem] mt-[0.5rem] flex items-center">
                <div className="h-[1rem] w-[1rem]">
                  <Image
                    src="/assets/svg/ic_info.svg"
                    alt="설명 아이콘"
                    width={16}
                    height={16}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="ml-[0.5rem] text-[0.75rem] text-gray-400">
                  상세 위치는 채팅을 통해 추후 확정할 수 있어요
                </p>
              </div>
              {/* 프로필 영역 */}

              <div className="lg:hidden xl:hidden">
                <DetailUserCard post={post} handleStartChat={handleStartChat} />
              </div>

              {/* 산책 메이트 정보 */}
              <div className="border-b border-t border-gray-200 pb-[0.94rem] pl-[0.75rem] pt-[0.87rem]">
                <MateInfoItem post={post} />
              </div>

              {/* 우천 취소 안내 */}
              <div className="mb-[0.87rem] ml-[0.75rem] mt-[0.37rem] flex items-center">
                <div className="h-[1rem] w-[1rem]">
                  <Image
                    src="/assets/svg/ic_info.svg"
                    alt="설명 아이콘"
                    width={16}
                    height={16}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="ml-[0.5rem] text-[0.75rem] text-gray-400">우천 시 일정이 변경되거나 취소될 수 있어요.</p>
              </div>

              {/* 내용, 본문 */}
              <div className="w-full border-b border-t border-[#EFEFF0] px-[0.75rem] pb-[0.75rem]">
                <p className="flex pt-[0.75rem] font-[400]">{post.content}</p>
              </div>

              {/* 동물 정보 카드 */}
              <div className="mb-[5.95rem] mt-[0.75rem] w-full lg:hidden">
                {post.pet_id && <PetCarousel post={post} slides={SLIDES} options={OPTIONS} />}
              </div>
            </div>

            <div className="hidden w-full lg:mt-[1.5rem] lg:flex lg:w-[30%] lg:flex-col xl:flex xl:flex-col">
              <div className="w-full">
                <DetailUserCard post={post} handleStartChat={handleStartChat} />
              </div>
              <div className="mb-[5.95rem] mt-[0.75rem] hidden w-full lg:block">
                {post.pet_id && <PetCarousel post={post} slides={SLIDES} options={OPTIONS} />}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
