import { createBrowserRouter } from "react-router-dom";
import { Chat } from "./pages/chat";
import { Auth } from "./pages/auth";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default routes;
