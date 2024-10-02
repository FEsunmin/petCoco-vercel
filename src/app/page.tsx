"use client";
import AnimalCarousel from "@/components/animalCarousel/AnimalCarousel";
import { EmblaOptionsType } from "embla-carousel";
import MateCarousel from "@/components/mateCarousel/MateCarousel";
import RecentPosts from "@/components/community/CommunityMain";
import Link from "next/link";
import BannerCarousel from "./../components/bannerCarousel/BannerCarousel";
import { BannerImages } from "./utils/Banner";
import LikePosts from "@/components/community/CommunityMainSortLike";

export default function Home() {
  const AnimalOPTIONS: EmblaOptionsType = { align: "center", dragFree: true, loop: true, startIndex: 2 };
  const AnimalSLIDE_COUNT = 7;
  const AnimalSLIDES = Array.from(Array(AnimalSLIDE_COUNT).keys());

  const MateOPTIONS: EmblaOptionsType = { align: "center", dragFree: true, loop: true, startIndex: 0 };
  const MateSLIDE_COUNT = 5;
  const MateSLIDES = Array.from(Array(MateSLIDE_COUNT).keys());

  const BannerOPTIONS: EmblaOptionsType = { align: "center", dragFree: true, loop: true, startIndex: 0 };
  const BannerSLIDE_COUNT = BannerImages.length;
  const BannerSLIDES = Array.from(Array(BannerSLIDE_COUNT).keys());

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#D2CDF6] lg:ml-44">
      <div className="w-full">
        <BannerCarousel slides={BannerSLIDES} options={BannerOPTIONS} />
      </div>

      {/* 게시글 영역 */}
      <div className="mb-4 flex w-full flex-col bg-background px-2 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-28 lg:pb-10">
        {/* 인기글 */}
        <div className="mt-6 w-full rounded-xl bg-white p-4">
          <div>
            <h2 className="text-xl font-bold text-[#8E6EE8] hover:underline">지금 가장 인기 있는 글</h2>
          </div>

          <LikePosts postCount={5} />

          <div className="border-t border-gray-200 py-3">
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/community2`}>
              <h2 className="text-center text-lg text-gray-400 hover:underline">{`커뮤니티 더보기 >`}</h2>
            </Link>
          </div>
        </div>

        {/* 자유게시판 */}
        <div className="mt-6 w-full rounded-xl bg-white p-4">
          <div>
            <h2 className="text-xl font-bold text-[#7FA6EE] hover:underline">방금 올라온 따뜻한 반려이야기</h2>
          </div>

          <RecentPosts postCount={5} />

          <div className="border-t border-gray-200 py-3">
            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/community2`}>
              <h2 className="text-center text-lg text-gray-400 hover:underline">{`커뮤니티 더보기 >`}</h2>
            </Link>
          </div>
        </div>

        {/* 산책메이트 */}
        <div className="mt-6 w-full rounded-xl bg-white p-4">
          <h2 className="pb-2 text-xl font-bold text-[#11BBB0] hover:underline">산책메이트를 찾아요!</h2>
          <div className="mb-16 mt-1 w-full rounded-lg bg-white">
            <MateCarousel slides={MateSLIDES} options={MateOPTIONS} />
          </div>
        </div>

        {/* 유기견 배너+캐러셀*/}
        <div className="mt-6 flex w-auto flex-col items-center justify-center">
          <div className="mb-16 mt-1 w-full rounded-lg bg-white lg:mb-0">
            <AnimalCarousel slides={AnimalSLIDES} options={AnimalOPTIONS} />
          </div>
        </div>
      </div>
    </div>
  );
}
