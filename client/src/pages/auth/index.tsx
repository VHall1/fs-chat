import { Box, Button, Input, Sheet, Typography } from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postAuthenticate } from "../../queries/user-query";

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [discriminator, setDiscriminator] = useState("");

  const { mutate: handleLogin } = useMutation({
    mutationFn: postAuthenticate,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box maxWidth="sm" width={1.0}>
        <Sheet
          variant="soft"
          sx={{ borderRadius: (theme) => theme.radius.sm, p: 4 }}
        >
          <Typography level="h3" textAlign="center" gutterBottom>
            Login
          </Typography>

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Input
            placeholder="Discriminator"
            value={discriminator}
            onChange={(e) => setDiscriminator(e.target.value)}
            sx={{ mt: 1 }}
          />

          <Button
            size="lg"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => handleLogin({ username, discriminator })}
          >
            Login
          </Button>
        </Sheet>
      </Box>
    </Box>
  );
};
