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
import { getAuth as getStoredAuth, setAuth as saveAuth, clearAuth as removeAuth } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { role, token, user }
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // read from localStorage once on mount
    const existing = getStoredAuth();
    if (existing) setUser(existing);
    setInitializing(false);
  }, []);

  const login = (role, token, userData) => {
    const u = { role, token, user: userData };
    setUser(u);
    saveAuth(u);
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      removeAuth();
      window.location.href = "/choose-role";
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user?.token,
      role: user?.role ?? null,
      name: user?.user?.name ?? null,
      login,
      logout,
      initializing, // expose it
    }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
