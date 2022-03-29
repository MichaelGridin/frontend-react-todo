import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import AuthUserProvider from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import RequireUnauth from "./components/RequireUnauth";

function App() {
  return (
    <BrowserRouter>
      <AuthUserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/signin"
            element={
              <RequireUnauth>
                <Signin />
              </RequireUnauth>
            }
          />
          <Route
            path="/signup"
            element={
              <RequireUnauth>
                <Signup />
              </RequireUnauth>
            }
          />
        </Routes>
      </AuthUserProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
