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
  Skeleton,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import {
  deleteLogout,
  getCurrentUser,
} from "../../shared-queries/user-queries";

export const Sidenav = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
  const { data: channels, isLoading: isLoadingChannels } = useQuery({
    queryKey: ["getSubscribedChannels"],
    queryFn: getChannels,
  });
  const { mutateAsync: mutateAsyncLogout } = useMutation({
    mutationFn: deleteLogout,
  });

  const { channelId } = useParams();
  if (channels && !isLoadingChannels && !channelId) {
    requestAnimationFrame(() => navigate(`/chat/${channels[0].id}`));
  }

  const handleLogout = async () => {
    await mutateAsyncLogout();
    queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
  };

  const handleClickChannel = (channels: Channel[], channelId: string) => {
    if (channels.find((channel) => channel.id === channelId)) {
      navigate(`/chat/${channelId}`);
    }
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
      {isLoadingChannels ? (
        <List sx={{ overflow: "hidden", overflowY: "auto" }} disablePadding>
          {[...new Array(10)].map((_, i) => (
            <ListItem disablePadding dense key={i}>
              <ListItemButton disabled>
                <Skeleton sx={{ width: 1.0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <List sx={{ overflow: "hidden", overflowY: "auto" }} disablePadding>
          {channels?.map((channel, _, channels) => (
            <ListItem
              disablePadding
              dense
              key={`${channel.name}-${channel.id}`}
            >
              <ListItemButton
                selected={channel.id === channelId}
                onClick={() => handleClickChannel(channels, channel.id)}
              >
                # {channel.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
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
              <IconButton sx={{ borderRadius: 1 }}>
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

const getChannels: () => Promise<Channel[]> = async () =>
  (await api.get("/channels")).data;
