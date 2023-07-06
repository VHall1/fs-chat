import { Avatar, Box, Paper, Typography } from "@mui/material";
import { ChatMessages } from "./chat-messages";
import { Sidenav } from "./sidenav";

export const Chat = () => {
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
        <ChatMessages />
      </Box>

      <Paper
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
              <Avatar sx={{ mr: 1 }}>T</Avatar>
              <Typography>@mrfrk</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
