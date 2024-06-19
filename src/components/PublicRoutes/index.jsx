import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../providers/UserContext";

export const PublicRoutes = () => {
    const { isUser } = useContext(UserContext);

    return (!isUser ? <Outlet /> : <Navigate to="/" />);
};