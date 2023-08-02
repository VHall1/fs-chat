import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { Container } from "../../../components/container";
import { getCurrentUser } from "../../../queries/user-queries";
import { Loading } from "../../../components/loading";
import { AxiosError } from "axios";

export const Waitlist = () => {
  const navigate = useNavigate();
  const [friendCode, setFriendCode] = useState("");
  const {
    mutate: handleClaim,
    error,
    data: claimData,
  } = useMutation<
    { message: string },
    AxiosError<{ error: string }>,
    Parameters<typeof postClaimCode>[0]
  >({
    mutationFn: postClaimCode,
  });
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });

  if (claimData?.message) {
    requestAnimationFrame(() => navigate("/"));
    return null;
  }

  if (isUserLoading) return <Loading />;

  if (!user) {
    requestAnimationFrame(() => navigate("/auth/login"));
    return null;
  } else if (user.active) {
    requestAnimationFrame(() => navigate("/"));
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClaim({ code: friendCode });
  };

  return (
    <Container sx={{ alignItems: "center", justifyContent: "center" }}>
      <Box maxWidth="sm" width={1.0}>
        <Typography variant="h4" component="h1">
          Thanks for creating an account!
        </Typography>
        <Typography variant="body1">
          You're almost there! Our team is currently reviewing your application
          to ensure the best possible experience for all users.
          <br />
          <br />
          We'll send you an email as soon as your account is ready to go.
          <br />
          <br />
          In the meantime, if you know someone who already has access, you can
          skip this step by asking for their friend code.
          <br />
          <br />
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormGroup row sx={{ gap: 1 }}>
            <TextField
              label="Friend code"
              sx={{ flex: 1 }}
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
              required
              error={!!error}
              helperText={
                !!error &&
                (error?.response?.data?.error ||
                  "Something went wrong. Please try again later.")
              }
            />
            <Button variant="contained" type="submit">
              Claim yor account
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Container>
  );
};

const postClaimCode: (data: {
  code: string;
}) => Promise<{ message: string }> = async (data) =>
  (await api.post("/referral_codes/claim", data)).data;
