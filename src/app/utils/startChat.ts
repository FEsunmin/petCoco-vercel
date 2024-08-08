import Swal from "sweetalert2";
import { createClient } from "@/supabase/client";
import { User } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";

const startChat = async (receiverId: string, user: User | null, router: any) => {
  const supabase = createClient();

  if (!user) {
    Swal.fire({
      title: "로그인이 필요합니다!",
      text: "1:1 대화를 하려면 로그인이 필요합니다.",
      icon: "warning"
    });
    router.replace("/signin");
    return;
  }

  try {
    // 채팅방이 이미 존재하는지 확인
    const { data: existingChat, error: chatError } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .or(`sender_id.eq.${receiverId},receiver_id.eq.${receiverId}`)
      .limit(1);

    if (chatError) throw chatError;

    if (existingChat && existingChat.length > 0) {
      // 이미 채팅방이 존재하면 해당 채팅방으로 이동
      router.push(`/message?selectedUser=${receiverId}`);
    } else {
      // 새로운 채팅방 생성
      const { error: insertError } = await supabase.from("messages").insert([
        {
          sender_id: user.id,
          receiver_id: receiverId,
          content: "채팅이 시작되었습니다."
        }
      ]);

      if (insertError) throw insertError;

      // 새로 생성된 채팅방으로 이동
      router.push(`/message?selectedUser=${receiverId}`);
    }
  } catch (error) {
    console.error("채팅 시작 오류:", error);
    Swal.fire({
      title: "채팅 시작 오류",
      text: "채팅을 시작하는 데 문제가 발생했습니다. 다시 시도해 주세요.",
      icon: "error"
    });
  }
};

export default startChat;
