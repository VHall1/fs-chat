import { Box, IconButton, Input } from "@mui/joy";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useUserStore } from "../../global-store/user-store";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api";

export const ChatInput = ({
  onSubmit,
}: {
  onSubmit: () => void;
}) => {
  const [inputText, setInputText] = useState("");
  const { user } = useUserStore();

  const { mutateAsync: handlePostMessage } = useMutation({
    mutationFn: postMessage,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputText("");
    await handlePostMessage({ content: inputText });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 1 }}>
        <Input
          variant="outlined"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          endDecorator={
            <Box display="flex" gap={1}>
              <IconButton variant="plain" color="neutral" disabled={!user}>
                <EmojiEmotionsIcon />
              </IconButton>
              <IconButton variant="plain" color="neutral" disabled={!user}>
                <SendIcon />
              </IconButton>
            </Box>
          }
          disabled={!user}
          required
        />
      </Box>
    </form>
  );
};

const postMessage: (data: { content: string }) => Promise<Message> = async (
  data
) => (await api.post<Message>("/messages", data)).data;
