import { Avatar, Box, Typography } from "@mui/material";

export const ChatMessage = ({
  message,
  username,
  timestamp,
}: {
  message: string;
  username: string;
  timestamp: string;
}) => {
  const formatDate = (date: string) => {
    const d = new Date(date);

    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);

    let dateStart = "";
    if (diffInDays < 1) {
      dateStart = "Today at";
    } else if (diffInDays < 2) {
      dateStart = "Yesterday at";
    } else {
      dateStart = d.toLocaleDateString();
    }

    const hoursString = d.getHours().toString().padStart(2, "0");
    const minutesString = d.getMinutes().toString().padStart(2, "0");

    return `${dateStart} ${hoursString}:${minutesString}`;
  };

  return (
    <Box display="flex">
      <Avatar>T</Avatar>
      <Box ml={1}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography>{username}</Typography>
          <Typography variant="subtitle2">{formatDate(timestamp)}</Typography>
        </Box>
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
};
