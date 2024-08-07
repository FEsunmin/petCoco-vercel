"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/zustand/useAuth";
import { MatePostFullType } from "@/types/mate.type";
import Link from "next/link";
import { getConvertTime } from "@/app/utils/getConvertTime";

const MyMate = () => {
  const { user } = useAuthStore();
  const userId = user?.id;
  const extractDong = (address: string) => {
    const match = address?.match(/(\S+(?:동\d*가?|읍|면))(?=\s|$)/);
    return match ? match[0] : "";
  };

  const { data, isPending, error } = useQuery<MatePostFullType[]>({
    queryKey: ["myMatePosts", userId],
    queryFn: async () => {
      const response = await fetch(`/api/mypage/${userId}/myMate`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!userId
  });

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="mb-[30px] flex h-[80%] flex-col items-center gap-4 overflow-y-scroll rounded-[10px] scrollbar-hide sm:w-[640px]">
      {data.map((data) => (
        <div key={data.id} className="border-gray rounded-[10px] border bg-white sm:w-[440px]">
          <Link href={`/mate/posts/${data.id}`} className="mt-5 flex flex-col items-center justify-center">
            <div className="h-[90%] w-[90%] py-5">
              <p className="mb-4 font-semibold sm:text-2xl">{data.title}</p>
              <p className="mt-2 overflow-y-auto rounded-lg bg-[#eef4ff] p-4 scrollbar-hide sm:h-[150px]">
                {data.content}
              </p>
              <div className="mt-5 flex">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <p className="w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                      {`${extractDong(data.address || "")}, ${data.place_name || ""}`}
                    </p>
                    <p>
                      {data.date_time?.split("T")[0]} | {getConvertTime({ date_time: data.date_time || "" })}
                    </p>
                  </div>
                  <p>{data.members}명 모집</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyMate;
