import { Box } from "@mui/joy";
import { PropsWithChildren } from "react";

export const MessagesContainer: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        px: 2,
        flexGrow: 1,
        overflow: "hidden",
        overflowY: "auto",
        gap: 1,
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {children}
    </Box>
  );
};
