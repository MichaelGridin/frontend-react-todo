import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  authUser: null,
  loading: true,
});

function AuthUserProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const { user } = await res.json();
      setAuthUser(user);
    })();
    setLoading(false);
  }, []);

  async function logout() {
    const res = await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      setAuthUser(null);
    }
  }

  async function signin(user) {
    const res = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const { user } = await res.json();
      setAuthUser(user);
    }
  }

  const auth = {
    authUser,
    loading,
    signin,
    logout,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => React.useContext(AuthContext);
export default AuthUserProvider;
