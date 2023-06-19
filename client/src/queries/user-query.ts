import { api } from "../api";

export const getCurrentUser: () => Promise<User> = async () =>
  (await api.get("/auth/me")).data;

export const postAuthenticate: (data: {
  username: string;
  discriminator: string;
}) => Promise<User> = async (data) =>
  (await api.post("/auth/authenticate", data)).data;
