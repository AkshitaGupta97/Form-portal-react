import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({children}) {
  
  const {user} = useAuth();
  return user ? children : <Navigate to='/login' replace />
}

// 
// return user ? children : <Navigate to='/login' replace />
// it means if user is present go to navigate page else do login

