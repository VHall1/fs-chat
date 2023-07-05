import { Box, Card, CardContent, styled } from "@mui/material";
import { PropsWithChildren } from "react";

export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Box maxWidth="sm" width={1.0}>
        <Card sx={{ width: 1.0 }}>
          <CardContent>{children}</CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const Container = styled(Box)(() => ({
  display: "flex",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
}));
