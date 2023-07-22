import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../queries/user-queries";

export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    // Cache for 24 hours
    cacheTime: 24 * 60 * 60 * 1000,
    retry: false,
  });

  if (isLoading) return null;

  if (!user) {
    requestAnimationFrame(() => navigate("/auth/login", { replace: true }));
    return null;
  }

  return children;
};
