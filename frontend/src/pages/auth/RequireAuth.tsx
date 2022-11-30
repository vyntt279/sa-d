import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: any) => {
    const role = Number(localStorage.getItem('role'))
    const location = useLocation();
    console.log(allowedRoles?.includes(role))
    return (
        // TO DO: Check role
        allowedRoles?.includes(role)
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;