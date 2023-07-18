import axios from "axios";
import ActionCable from "actioncable";

export const api = axios.create({
  baseURL: import.meta.env["API_URL"] || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const wss = ActionCable.createConsumer(
  import.meta.env["WS_URL"] || "ws://localhost:3000/cable"
);
