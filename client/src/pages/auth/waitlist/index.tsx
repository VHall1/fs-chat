import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import { Container } from "../../../components/container";

export const Waitlist = () => {
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
          In the meantime, if you know someone who already has an account, you
          can ask them to send you an invite.
          <br />
          <br />
        </Typography>

        <FormGroup row sx={{ gap: 1 }}>
          <TextField label="Friend code" sx={{ flex: 1 }} />
          <Button variant="contained">Claim yor account</Button>
        </FormGroup>
      </Box>
    </Container>
  );
};
