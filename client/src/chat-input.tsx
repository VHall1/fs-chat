import { Box, IconButton, Input } from "@mui/joy";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export const ChatInput = () => {
  const [inputText, setInputText] = useState("");

  return (
    <Box sx={{ p: 1 }}>
      <Input
        variant="outlined"
        placeholder="Type a message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        endDecorator={
          <Box display="flex" gap={1}>
            <IconButton variant="plain" color="neutral">
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton variant="plain" color="neutral">
              <SendIcon />
            </IconButton>
          </Box>
        }
      />
    </Box>
  );
};
