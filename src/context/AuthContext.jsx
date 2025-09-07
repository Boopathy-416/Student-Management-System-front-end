import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { role: "teacher" | "admin", token: string }

  useEffect(() => {
    const raw = localStorage.getItem("smd_user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const login = (role, token = "demo-token") => {
    const u = { role, token };
    setUser(u);
    localStorage.setItem("smd_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smd_user");
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user?.token,
    role: user?.role ?? null,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
