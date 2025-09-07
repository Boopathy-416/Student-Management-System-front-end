// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // { role: "teacher" | "admin", token: string }

//   useEffect(() => {
//     const raw = localStorage.getItem("smd_user");
//     if (raw) {
//       try { setUser(JSON.parse(raw)); } catch {}
//     }
//   }, []);

//   const login = (role, token = "demo-token") => {
//     const u = { role, token };
//     setUser(u);
//     localStorage.setItem("smd_user", JSON.stringify(u));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("smd_user");
//   };

//   const value = useMemo(() => ({
//     user,
//     isAuthenticated: !!user?.token,
//     role: user?.role ?? null,
//     login,
//     logout,
//   }), [user]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);









// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getAuth as getStoredAuth,
  setAuth as saveAuth,
  clearAuth as removeAuth,
} from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { role, token, user }
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // ✅ Load user/token from localStorage once
    const existing = getStoredAuth();
    if (existing?.token) {
      setUser(existing);
    }
    setInitializing(false);
  }, []);

  const login = (role, token, userData) => {
    const u = { role, token, user: userData };
    setUser(u);
    saveAuth(u); // persist to localStorage
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      removeAuth(); // clear localStorage
      window.location.href = "/choose-role"; // redirect
    }
  };

  const value = useMemo(
    () => ({
      user,
      token: user?.token ?? null,        // ✅ expose token directly
      isAuthenticated: !!user?.token,
      role: user?.role ?? null,
      name: user?.user?.name ?? null,
      login,
      logout,
      initializing,
    }),
    [user, initializing]
  );

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
