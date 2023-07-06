import { Box, BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";

export const MessagesContainer: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...props
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
      {...props}
    >
      {children}
    </Box>
  );
};
