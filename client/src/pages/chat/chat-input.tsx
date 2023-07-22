import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../api";
import { getCurrentUser } from "../../queries/user-queries";

export const ChatInput = () => {
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
    setInputText("");
    handlePostMessage({ content: inputText });
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
