import { Avatar, Box, IconButton, Sheet, Typography } from "@mui/joy";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { MessagesContainer } from "./chat-message/messages-container";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello, world!",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      <Sheet
        variant="soft"
        component="nav"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: 1,
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <Box>Channels go here</Box>
        <Box
          sx={{
            mt: "auto",
            px: 1,
            py: 2,
            display: "flex",
            alignItems: "center",
            borderTop: 1,
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <Avatar variant="solid" sx={{ mr: 1 }}>
            T
          </Avatar>
          <Box>
            <Typography>@mrfrk</Typography>
            <Typography level="body3">#3357</Typography>
          </Box>
          <IconButton sx={{ ml: "auto" }} variant="plain" color="neutral">
            <LogoutIcon />
          </IconButton>
        </Box>
      </Sheet>
      <Box component="main" width={1.0} maxWidth="md" marginX="auto">
        <Sheet
          variant="soft"
          sx={{ height: 1.0, display: "flex", flexDirection: "column" }}
        >
          <MessagesContainer>
            {messages.map((message) => (
              <ChatMessage key={message.id} content={message.content} />
            ))}
          </MessagesContainer>

          <ChatInput />
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
}
