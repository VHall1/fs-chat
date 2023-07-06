import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { Chat } from "./pages/chat";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default routes;
