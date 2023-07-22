import { Box, Card, CardContent } from "@mui/material";
import { PropsWithChildren } from "react";
import { Container } from "../../components/container";

export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container sx={{ alignItems: "center", justifyContent: "center" }}>
      <Box maxWidth="sm" width={1.0}>
        <Card sx={{ width: 1.0 }}>
          <CardContent>{children}</CardContent>
        </Card>
      </Box>
    </Container>
  );
};
