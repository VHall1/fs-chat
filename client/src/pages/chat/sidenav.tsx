import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLogout, getCurrentUser } from "../../queries/user-queries";

export const Sidenav = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
  const { mutateAsync: mutateAsyncLogout } = useMutation({
    mutationFn: deleteLogout,
  });

  const handleLogout = async () => {
    await mutateAsyncLogout();
    queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
  };

  return (
    <Paper
      component="nav"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRight: 1,
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <List sx={{ overflow: "hidden", overflowY: "auto" }} disablePadding>
        <ListItem disablePadding dense selected>
          <ListItemButton># general</ListItemButton>
        </ListItem>
        <ListItem disablePadding dense>
          <ListItemButton># 👏memes👏</ListItemButton>
        </ListItem>
      </List>
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
        {user ? (
          <>
            <Avatar />
            <Box ml={1}>
              <Typography component="div">{user.username}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                component="div"
              >
                #{user.discriminator}
              </Typography>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <IconButton
                sx={{ borderRadius: 1 }}
                onClick={() => handleLogout()}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
              <IconButton
                sx={{ borderRadius: 1 }}
                onClick={() => handleLogout()}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>
          </>
        ) : (
          "loading"
        )}
      </Box>
    </Paper>
  );
};
