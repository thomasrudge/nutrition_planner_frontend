import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (localStorage.getItem("token") === null) {
        return <Navigate to="/" />;
    }
    else{
        return children;
    }
  
};

export default ProtectedRoute;