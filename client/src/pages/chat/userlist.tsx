import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { wss } from "../../api";

export const Userlist = () => {
  const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   if (!user) return;

  //   const channel = wss.subscriptions.create(`UserlistChannel`, {
  //     received: (data) => {
  //       console.log("New message received", data);
  //       setUsers(data);
  //     },
  //     connected: () => {
  //       console.log(`Connected to userlist:${user.id}`);
  //     },
  //   });

  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }, [user]);

  return (
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
  );
};
