"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Comments from "../_components/comments";
import Swal from "sweetalert2";
import Like from "../_components/like";
import startChat from "@/app/utils/startChat";
import LoadingComponent from "@/components/loadingComponents/Loading";
import Link from "next/link";
import Modal from "../_components/modal";
interface PageProps {
  params: { id: string };
}

export interface Post {
  id: string;
  user_id: string;
  category: string;
  title: string;
  content: string;
  created_at: string;
  users: {
    nickname: string;
    profile_img: string;
  };
  post_imageURL: string;
  likes: LikeInfo[]; // [{userid : "uuid"}]
}

export interface LikeInfo {
  userid: string;
}

const fetchPost = async (postId: string): Promise<Post> => {
  // const response = await fetch(`/api/detailCommunity/${postId}/?id=${postId}`);
  const response = await fetch(`/api/detailCommunity/${postId}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok.`);
  }
  const data = await response.json();
  return data[0]; // API가 배열을 반환하므로 첫 번째 항목을 가져옵니다
};

const CommunityMain: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [likes, setLikes] = useState<LikeInfo[]>([]);
  const { user } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 모달 컴포넌트 생성
  const [modal, setModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const fetchedPost = await fetchPost(id);
        setPost(fetchedPost);
        setLikes(fetchedPost.likes);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    loadPost();
  }, [id]);

  // 이 페이지에서 수정페이지(createPost)로 유저를 이동시킴
  const handleEdit = () => {
    router.replace(`/community2/createPost/?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "게시물 삭제",
      text: "정말로 이 게시물을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#c0c0c0",
      confirmButtonText: "삭제",
      cancelButtonText: "취소"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/detailCommunity/${id}`, {
            method: "DELETE"
          });

          if (response.ok) {
            Swal.fire({
              title: "완료!",
              text: "게시물이 삭제되었습니다",
              icon: "success"
            }).then(() => {
              router.replace("/community2");
            });
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "오류가 발생했습니다!",
            text: "게시물 삭제 중 오류가 발생했습니다.",
            icon: "error"
          }).then(() => {
            router.replace("/community2");
          });
        }
      }
    });
  };

  // 이미지 클릭 이벤트핸들러 추가
  const handleImgClick = (img: string) => {
    setSelectedImg(img);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedImg(null);
  };

  // return <p>Loading...</p>;
  if (!post) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (!user) {
    // alert("로그인이 필요한 서비스입니다.");
    Swal.fire({
      title: "로그인이 필요합니다!",
      text: "커뮤니티 상세 페이지를 확인하기 위해서는 로그인이 필요합니다",
      icon: "warning"
    });
    router.push("/signin");
    return null;
  }

  return (
    <>
      <div className="mx-auto h-full min-h-screen max-w-[420px] bg-white px-[1.5rem] lg:max-w-full lg:px-[5rem]">
        <div className="mb-[0.5rem] mt-[2rem]">
          {post.category.split(",").map((category) => (
            <span
              key={category}
              className="rounded-full border border-mainColor bg-white px-[0.62rem] py-[0.38rem] text-[1rem] text-mainColor"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="w-full py-[0.5rem] text-[1.375rem] font-medium">
          <h1 className="">{post.title}</h1>
        </div>

        {/* user 카드 */}
        <div className="flex h-full w-full gap-[0.75rem] py-[0.75rem]">
          <div className="flex w-full items-center gap-[0.75rem]">
            {/* 프로필 이미지 */}
            <div className="h-[2rem] w-[2rem] shrink-0 overflow-hidden rounded-full">
              <Image
                src={
                  post.users.profile_img ||
                  "https://eoxrihspempkfnxziwzd.supabase.co/storage/v1/object/public/post_image/1722324396777_xo2ka9.jpg"
                }
                alt={post.users.nickname}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>

            {/* 가운데 내용 부분 */}
            <div className="flex w-full flex-col">
              <Link href={`/userInfo/${post.user_id}`}>
                <div className="cursor-pointer text-[1rem] text-mainColor">{post.users.nickname}</div>
              </Link>
              <div className="text-[0.625rem]">{new Date(post.created_at).toLocaleDateString()}</div>
            </div>
          </div>
          {/* 수정 삭제 */}
          {user.id === post.user_id ? (
            <div className="flex h-full gap-[0.75rem] whitespace-nowrap text-[0.75rem]">
              <button onClick={handleEdit} className="text-[#11BBB0]">
                수정
              </button>
              <button onClick={() => handleDelete(id)} className="text-[#FFB9B9]">
                삭제
              </button>
            </div>
          ) : (
            <div className="whitespace-nowrap">
              <button
                onClick={() => {
                  startChat(post.user_id, user, router);
                }}
                className="rounded-[0.75rem] bg-[#11BBB0] px-[0.88rem] py-[0.38rem] text-[0.875rem] text-white"
              >
                채팅
              </button>
            </div>
          )}
        </div>

        {/* 본문 내용 */}
        <div className="mt-[1rem] max-w-none whitespace-pre-wrap text-[1rem]">
          <p>{post.content}</p>
        </div>

        {/* 게시글 이미지 */}
        {post?.post_imageURL && (
          <div className="mt-4 flex gap-[0.75rem] overflow-x-auto rounded-md">
            {post.post_imageURL.split(",").map((img, index) => (
              <div
                key={index}
                style={{ position: "relative", width: "6.25rem", height: "6.25rem" }}
                className="rounded-md"
                onClick={() => handleImgClick(img)}
              >
                <Image
                  key={index}
                  src={img}
                  alt={`${post.title} - 이미지 ${index + 1}`}
                  fill
                  style={{
                    objectFit: "cover"
                  }}
                  className={`rounded ${index === 0 ? "" : ""} cursor-pointer rounded-md border border-[#e6efff]`}
                />
              </div>
            ))}
          </div>
        )}

        <Like postId={post.id} likes={likes} setLikes={setLikes} />

        <Comments postId={post.id} />
      </div>
      {modal && selectedImg && (
        <Modal isOpen={modal} onClose={closeModal}>
          <Image src={selectedImg} alt="post image" width={400} height={400} className="rounded-lg" />
        </Modal>
      )}
    </>
  );
};

export default CommunityMain;
