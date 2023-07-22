import { api } from "../api";

export const getCurrentUser: () => Promise<User> = async () =>
  (await api.get("/auth/me")).data;

export const postLogin: (data: {
  email: string;
  password: string;
}) => Promise<User> = async (data) =>
  (await api.post("/auth/login", data)).data;

export const postRegister: (data: {
  email: string;
  username: string;
  password: string;
}) => Promise<User> = async (data) =>
  (await api.post("/auth/register", data)).data;

export const deleteLogout: () => Promise<void> = async () =>
  (await api.delete("/auth/logout")).data;
