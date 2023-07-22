import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { postLogin } from "../../../shared-queries/user-queries";
import { AuthLayout } from "../layout";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
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
          Sign In
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
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link
              to="/auth/register"
              variant="subtitle2"
              component={RouterLink}
            >
              Don't have an account?
            </Link>
            <Link variant="subtitle2">Forgot your password?</Link>
          </Box>
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
            Sign in
          </Button>
        </Box>
      </AuthLayout>
    </form>
  );
};
