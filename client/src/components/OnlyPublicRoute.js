import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const OnlyPublicRoute = () => {
  const { auth } = useAuth();

  return !auth ? <Outlet /> : <Navigate to={"/"} />;
};

export default OnlyPublicRoute;
