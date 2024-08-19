"use client";

import { UsersPetType } from "@/types/auth.type";
import { MatePostType } from "@/types/mate.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { defaultUserImg, defaultPetImg } from "@/components/DefaultImg";
import { EmblaOptionsType } from "embla-carousel";

import Image from "next/image";
import { useEffect } from "react";

import LoadingComponent from "@/components/loadingComponents/Loading";
import MyPetCarousel from "../MyPetCarousel/MyPetCarousel";
import startChat from "@/app/utils/startChat";
import { useAuthStore } from "@/zustand/useAuth";

type PetType = UsersPetType;

function UserInfoPage() {
  const params = useParams();
  const router = useRouter();
  const { user: MyUsers } = useAuthStore();

  let id = params?.id || 0;
  id = id === "undefined" ? 0 : id;

  if (!id) {
    router.push(`/`);
  }

  const getProfileData = async () => {
    if (!id) return null;
    const response = await fetch(`/api/mypage/${id}/myprofile`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = response.json();

    return data;
  };

  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ["user"],
    queryFn: getProfileData
  });

  const getPetData = async () => {
    if (!id) return null;
    const response = await fetch(`/api/mypage/${id}/mypetprofile`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = response.json();

    return data;
  };

  const {
    data: pets,
    isPending: isPetPending,
    isError: isPetError
  } = useQuery<PetType[]>({
    queryKey: ["pets", id],
    queryFn: getPetData
  });

  // const { data: myMate } = useQuery<MatePostType[]>({
  //   queryKey: ["myMate", id],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/mate/my/${id}`);
  //     const data = response.json();
  //     return data;
  //   },
  //   enabled: !!id
  // });

  // const recruitingTrueCount = myMate?.filter((post) => post.recruiting === true).length || 0;
  // const recruitingFalseCount = myMate?.filter((post) => post.recruiting === false).length || 0;

  useEffect(() => {
    if (!id) {
      router.push(`/`);
    }
  }, [id]);

  if (isPending || isPetPending) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  if (isError || isPetError || !user) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  const OPTIONS: EmblaOptionsType = { align: "center", dragFree: true, loop: true, startIndex: 2 };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-between whitespace-nowrap border-y-1 px-[24px] py-[34px] text-lg leading-tight text-neutral-800">
        <div className="flex gap-6">
          <Image
            className="aspect-square h-[60px] w-[60px] shrink-0 rounded-full object-cover"
            width={60}
            height={60}
            src={user.profile_img || defaultUserImg}
            alt=""
          />
          <div className="my-auto w-[52px] self-stretch text-[18px] font-semibold leading-[23.4px]">
            {user.nickname}
          </div>
        </div>
        <Link href={`/userInfo/${user.id}/userProfile`}>
          <div className="mb-[13px] mt-[15px] whitespace-nowrap rounded-lg bg-[#8E6EE8] px-4 py-[6px] text-xs font-semibold leading-relaxed tracking-wide text-[#FFFFFF]">
            유저 프로필 확인
          </div>
        </Link>
      </div>

      <div className="w-full border-b-1 px-[14px] py-[15px]">
        <div className="flex w-full flex-row items-center justify-between px-[12px]">
          <div className="text-lg font-bold leading-[23.4px] text-[#3e3e3e]">유저의 반려동물 ({pets?.length})</div>
          {pets && pets.length ? (
            <Link href={`/userInfo/${user.id}/petProfile/${pets[0]?.id}`}>
              <button className="ml-2 self-stretch rounded-lg bg-[#8E6EE8] px-4 py-[6px] text-sm font-semibold text-[#FFFFFF]">
                반려동물 프로필 확인
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full">
          <MyPetCarousel slides={SLIDES} options={OPTIONS} />
        </div>
      </div>

      {/* <div className="flex w-full items-center px-[24px] pt-[16px]">
        <div className="text-lg font-bold leading-[23.4px] text-[#3e3e3e]">유저의 산책</div>
      </div> */}

      {/* <div className="border-b-1 px-[14px] py-4">
        <div>
          <div className="flex items-center justify-center rounded-lg bg-[#D2CDF6]">
            <div className="flex flex-col items-center border-r-1 px-5 py-5 font-bold text-[#222225]">
              {recruitingFalseCount}
              <div className="items-center whitespace-nowrap font-normal leading-tight">산책 완료</div>
            </div>
            <div className="flex flex-col items-center border-r-1 px-5 py-5 font-bold">
              {recruitingTrueCount}
              <div className="items-center whitespace-nowrap font-normal leading-tight">산책 예정</div>
            </div>
            <div className="flex flex-col items-center px-5 py-5 font-bold">
              {myMate?.length}
              <div className="items-center whitespace-nowrap font-normal leading-tight">기록 완료</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full px-[14px] py-[16px]">
        <div className="flex w-full items-center px-[12px]">
          <div className="text-lg font-bold leading-[23.4px] text-[#3e3e3e]">유저의 활동</div>
        </div>
        <div className="my-[16px] flex w-full flex-col rounded-lg bg-[#EFEFF0] px-[8px] pt-[8px]">
          <Link href={`/userInfo/${user.id}/userPosts`}>
            <div className="flex items-center justify-between border-b-1 px-[16px] py-[12px]">
              <div className="text-[16px] font-normal leading-5 text-[#61646B]">유저의 포스트</div>
              <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.313439 11.0201C0.135928 10.8425 0.11979 10.5648 0.265027 10.369L0.313439 10.313L4.62633 5.99984L0.313439 1.68672C0.135928 1.50921 0.11979 1.23144 0.265027 1.0357L0.313439 0.979617C0.49095 0.802106 0.768726 0.785969 0.964467 0.931205L1.02055 0.979617L5.68721 5.64628C5.86472 5.82379 5.88086 6.10157 5.73562 6.29731L5.68721 6.35339L1.02055 11.0201C0.825283 11.2153 0.508701 11.2153 0.313439 11.0201Z"
                  fill="#999999"
                />
              </svg>
            </div>
          </Link>
          <Link href={`/userInfo/${user.id}/userMatePosts`}>
            <div className="flex items-center justify-between border-b-1 px-[16px] py-[12px] leading-5">
              <div className="text-[16px] font-normal leading-5 text-[#61646B]">유저의 산책메이트</div>
              <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.313439 11.0201C0.135928 10.8425 0.11979 10.5648 0.265027 10.369L0.313439 10.313L4.62633 5.99984L0.313439 1.68672C0.135928 1.50921 0.11979 1.23144 0.265027 1.0357L0.313439 0.979617C0.49095 0.802106 0.768726 0.785969 0.964467 0.931205L1.02055 0.979617L5.68721 5.64628C5.86472 5.82379 5.88086 6.10157 5.73562 6.29731L5.68721 6.35339L1.02055 11.0201C0.825283 11.2153 0.508701 11.2153 0.313439 11.0201Z"
                  fill="#999999"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full px-[14px] whitespace-nowrap">
        <button
          onClick={() => {
            startChat(user.id, MyUsers, router);
          }}
          className="w-full rounded-[0.75rem] bg-[#11BBB0] px-[0.88rem] py-[0.38rem] text-[0.875rem] text-white"
        >
          채팅
        </button>
      </div>
    </div>
  );
}

export default UserInfoPage;