import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, IconButton, Sheet, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../../global-store/user-store";
import { getCurrentUser } from "../../../queries/user-query";

export const Sidenav = () => {
  const { user, setUser } = useUserStore();

  useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    onSuccess: (data) => setUser(data),
  });

  return (
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
        {user ? (
          <>
            <Avatar variant="solid">T</Avatar>
            <Box ml={1}>
              <Typography>
                {user.username}
                <Typography level="body3">#{user.discriminator}</Typography>
              </Typography>
              <Typography level="body3">Cool! :)</Typography>
            </Box>
            <IconButton sx={{ ml: "auto" }} variant="plain" color="neutral">
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          "loading"
        )}
      </Box>
    </Sheet>
  );
};
