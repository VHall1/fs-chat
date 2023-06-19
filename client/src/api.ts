import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
);
