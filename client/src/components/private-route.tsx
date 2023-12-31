import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../shared-queries/user-queries";
import { Loading } from "./loading";

export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    // Cache for 24 hours
    cacheTime: 24 * 60 * 60 * 1000,
    retry: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    requestAnimationFrame(() => navigate("/auth/login", { replace: true }));
    return null;
  } else if (!user.active) {
    requestAnimationFrame(() => navigate("/auth/waitlist", { replace: true }));
    return null;
  }

  return children;
};
