import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt from 'jwt-decode';

const RequireAuth = ({ allowedRoles }: any) => {
    const token = localStorage.getItem('authorization')
    const location = useLocation();
    var role: any
    if (token != null) {
        var decode: any = jwt(token)
        console.log("Decode token: ", decode)
        if (decode != null) {
            role = decode["role"]
            localStorage.setItem('email', decode["email"])
        }
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return (
        // TO DO: Check role
        allowedRoles?.includes(role)
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;