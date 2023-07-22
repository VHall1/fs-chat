import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      <CircularProgress sx={{ margin: "auto" }} size={80} />
    </Box>
  );
};
