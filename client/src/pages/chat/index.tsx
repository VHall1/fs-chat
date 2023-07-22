import { Box } from "@mui/material";
import { ChatMessages } from "./components/chat-messages";
import { Sidenav } from "./sidenav";
import { Userlist } from "./userlist";

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

      <Userlist />
    </Box>
  );
};
