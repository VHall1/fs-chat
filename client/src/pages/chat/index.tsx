import {
  Box,
  SwipeableDrawer,
  styled,
  useMediaQuery,
  drawerClasses,
  useTheme,
} from "@mui/material";
import { ChatMessages } from "./components/chat-messages";
import { Sidenav } from "./sidenav";
import { Userlist } from "./userlist";
import { useState } from "react";

export const Chat = () => {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const variant = matches ? "permanent" : "temporary";

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      <CustomSwipeableDrawer
        open={openLeft}
        variant={variant}
        onOpen={() => setOpenLeft(true)}
        onClose={() => setOpenLeft(false)}
      >
        <Sidenav />
      </CustomSwipeableDrawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <ChatMessages />
      </Box>

      <CustomSwipeableDrawer
        open={openRight}
        anchor="right"
        variant={variant}
        onOpen={() => setOpenRight(true)}
        onClose={() => setOpenRight(false)}
      >
        <Userlist />
      </CustomSwipeableDrawer>
    </Box>
  );
};

const CustomSwipeableDrawer = styled(SwipeableDrawer)(() => ({
  width: 300,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: 300,
    boxSizing: "border-box",
  },
}));
