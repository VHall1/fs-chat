import axios from "axios";
import ActionCable from "actioncable";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const wss = ActionCable.createConsumer("ws://localhost:3000/cable");
