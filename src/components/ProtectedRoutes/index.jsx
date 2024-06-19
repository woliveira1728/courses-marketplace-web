import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../providers/UserContext";

export const ProtectedRoutes = () => {
    const { isLogged } = useContext(UserContext);

    return isLogged ? <Outlet /> : <Navigate to="/" />;
};