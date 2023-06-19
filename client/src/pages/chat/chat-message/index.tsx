import { Avatar, Box, Typography } from "@mui/joy";

export const ChatMessage = ({ message }: { message: Message }) => {
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
      <Avatar variant="solid">T</Avatar>
      <Box ml={1}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography>Frk</Typography>
          <Typography level="body4">{formatDate(message.createdAt)}</Typography>
        </Box>
        <Typography>{message.content}</Typography>
      </Box>
    </Box>
  );
};
