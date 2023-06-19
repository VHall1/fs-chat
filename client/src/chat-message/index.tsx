import { Avatar, Box, Typography } from "@mui/joy";

export const ChatMessage: React.FC<ChatMessageProps> = ({ content }) => {
  return (
    <Box display="flex">
      <Avatar variant="solid" sx={{ mr: 1 }}>
        T
      </Avatar>
      <Box>
        <Typography>@mrfrk</Typography>
        <Typography>{content}</Typography>
      </Box>
    </Box>
  );
};

interface ChatMessageProps {
  content: string;
}
