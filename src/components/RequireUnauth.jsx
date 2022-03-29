import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireUnauth({ children }) {
  const { loading, authUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && authUser) {
      navigate("/");
    }
  }, [navigate, loading, authUser]);
  if (!loading && authUser) {
    return null;
  }
  return <>{children}</>;
}
export default RequireUnauth;
