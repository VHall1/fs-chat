import { Avatar, Box, Sheet, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { ChatMessage } from "./chat-message";
import { MessagesContainer } from "./chat-message/messages-container";
import { ChatInput } from "./chat-input";
import { Sidenav } from "./sidenav";

export const Chat = () => {
  // This is very inneficient
  // 1. We're fetching ALL messages
  // 2. We're re-fetching ALL messages on every new message
  // Ideally we would only fetch the last X messages on initial load and
  // then use the last message on the list as the cursor to fetch the next X messages
  const {
    data: messages,
    isLoading,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["getMessages"],
    queryFn: getMessages,
  });

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      <Sidenav />

      <Box
        component="main"
        width={1.0}
        marginX="auto"
        sx={(theme) => ({
          [theme.breakpoints.up("xs")]: {
            maxWidth: "xl",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "md",
          },
          [theme.breakpoints.up("xl")]: {
            maxWidth: "lg",
          },
        })}
      >
        <Sheet
          variant="soft"
          sx={{ height: 1.0, display: "flex", flexDirection: "column" }}
        >
          <MessagesContainer>
            {isLoading && <Typography>Loading...</Typography>}
            {messages?.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </MessagesContainer>

          <ChatInput onSubmit={refetchMessages} />
        </Sheet>
      </Box>

      <Sheet
        variant="soft"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderLeft: 1,
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            px: 1,
            py: 2,
            overflow: "none",
            overflowY: "auto",
          }}
        >
          {[...new Array(20)].map(() => (
            <Box display="flex">
              <Avatar variant="solid" sx={{ mr: 1 }}>
                T
              </Avatar>
              <Typography>@mrfrk</Typography>
            </Box>
          ))}
        </Box>
      </Sheet>
    </Box>
  );
};

const getMessages: () => Promise<Message[]> = async () =>
  (await api.get("/messages")).data;
