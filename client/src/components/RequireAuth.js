import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const checking = allowedRoles.map((role) =>
    auth?.roles?.includes(role) ? true : false
  );

  return !checking.includes(false) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to={"/unauthorized"} />
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default RequireAuth;
