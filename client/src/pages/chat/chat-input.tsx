import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api";
import { getCurrentUser } from "../../shared-queries/user-queries";
import { useParams } from "react-router-dom";

export const ChatInput = () => {
  const { channelId } = useParams();
  const [inputText, setInputText] = useState("");
  const { data: user } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });

  const { mutate: handlePostMessage } = useMutation({
    mutationFn: postMessage,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!channelId) return;

    setInputText("");
    handlePostMessage({ content: inputText, channelId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          InputProps={{
            endAdornment: (
              <Box display="flex" gap={1}>
                <IconButton disabled={!user}>
                  <EmojiEmotionsIcon />
                </IconButton>
                <IconButton disabled={!user}>
                  <SendIcon />
                </IconButton>
              </Box>
            ),
          }}
          disabled={!user || !channelId}
          required
        />
      </Box>
    </form>
  );
};

const postMessage: (data: {
  content: string;
  channelId: string;
}) => Promise<Message> = async (data) =>
  (await api.post<Message>("/messages", data)).data;
