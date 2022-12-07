import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

const RequireAuth = ({ allowedRoles }: any) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('authorization')
    const location = useLocation();
    var role: any
    if (token != null && token !== "undefined") {
        var decode: any = jwt(token)
        console.log("Decode token: ", decode)
        if (decode != null) {
            role = decode["role"]
            if (allowedRoles?.includes(role)) {
                localStorage.setItem('email', decode["email"])
                localStorage.setItem('role', role)
            } else {
                localStorage.removeItem('authorization')
                navigate("/login")
            }
        }
    } else {
        localStorage.removeItem('authorization')
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