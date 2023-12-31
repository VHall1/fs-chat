import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { wss } from "../../api";
import { getCurrentUser } from "../../shared-queries/user-queries";

export const Userlist = () => {
  const [_users, setUsers] = useState<User[]>([]);
  const { data: user } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (!user) return;

    const channel = wss.subscriptions.create(`UserlistChannel`, {
      received: (data) => {
        console.log("New message received", data);
        setUsers(data);
      },
      connected: () => {
        console.log(`Connected to userlist:${user.id}`);
      },
    });

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  return (
    <Paper
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderLeft: 1,
        borderColor: (theme) => theme.palette.divider,
        borderRadius: 0,
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
