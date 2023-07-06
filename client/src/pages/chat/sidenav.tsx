import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../global-store/user-store";
import { deleteLogout, getCurrentUser } from "../../queries/user-queries";

export const Sidenav = () => {
  const { user, setUser } = useUserStore();

  useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    onSuccess: (data) => setUser(data),
  });

  const { mutate: handleLogout } = useMutation({
    mutationFn: deleteLogout,
    onSuccess: () => setUser(null),
  });

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
        {user ? (
          <>
            <Avatar>T</Avatar>
            <Box ml={1}>
              <Typography component="span">
                {user.username}
                <Typography variant="subtitle2" component="span">
                  #{user.discriminator}
                </Typography>
              </Typography>

              <Typography variant="subtitle1">Cool! :)</Typography>
            </Box>
            <IconButton sx={{ ml: "auto" }} onClick={() => handleLogout()}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          "loading"
        )}
      </Box>
    </Paper>
  );
};
