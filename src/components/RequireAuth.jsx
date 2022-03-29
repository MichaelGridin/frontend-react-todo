import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children }) {
  const { loading, authUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !authUser) {
      navigate("/signin");
    }
  }, [navigate, loading, authUser]);
  if (!loading && !authUser) {
    return null;
  }
  return <>{children}</>;
}
export default RequireAuth;
