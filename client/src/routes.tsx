import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { Chat } from "./pages/chat";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    ),
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
