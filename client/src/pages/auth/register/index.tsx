import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../queries/user-queries";
import { AuthLayout } from "../layout";
import { Link as RouterLink } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: handleLogin, error } = useMutation<
    User,
    AxiosError<{ error: string }>,
    // Extracts the type of the first argument of postLogin
    Parameters<typeof postLogin>[0]
  >({
    mutationFn: postLogin,
    onSuccess: () => navigate("/"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthLayout>
        <Typography variant="h5" component="div" textAlign="center" mb={2}>
          Sign Up
        </Typography>

        <Stack spacing={2}>
          <TextField
            required
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/auth/login" variant="subtitle2" component={RouterLink}>
            Already have an account?
          </Link>
        </Stack>

        {error && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="error">
              {error.response?.data?.error ||
                "Something went wrong. Please try again later."}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button size="large" variant="contained" type="submit">
            Sign up
          </Button>
        </Box>
      </AuthLayout>
    </form>
  );
};
