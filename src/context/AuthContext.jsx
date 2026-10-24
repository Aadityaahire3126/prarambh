// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DEFAULT_USERS = {
  customer: {
    id: "c1",
    name: "Rohit Mehta",
    email: "rohit.mehta@example.com",
    role: "customer",
    city: "Delhi",
    locality: "Lajpat Nagar IV, New Delhi",
  },
  worker: {
    id: "w1",
    name: "Asha Sharma",
    email: "asha.sharma@example.com",
    role: "worker",
    service: "Maid / Housekeeper",
    city: "Delhi",
    locality: "Lajpat Nagar & Hauz Khas",
  },
  admin: {
    id: "admin-1",
    name: "Operations Lead (Pooja Rao)",
    email: "admin.ops@kaamsetu.org",
    role: "admin",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("kaamsetu_auth_v2");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (_) {}
    }
    // Default to Guest for landing page, but user can click demo login
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("kaamsetu_auth_v2", JSON.stringify(user));
    } else {
      localStorage.removeItem("kaamsetu_auth_v2");
    }
  }, [user]);

  const loginAsRole = (role) => {
    const selected = DEFAULT_USERS[role] || DEFAULT_USERS.customer;
    setUser(selected);
    return selected;
  };

  const loginCustom = (credentials) => {
    const { name, role, email } = credentials;
    const customUser = {
      id: `${role[0]}-${Date.now().toString(36)}`,
      name: name || (role === "admin" ? "Admin Ops" : role === "worker" ? "Demo Worker" : "Demo Customer"),
      email: email || "user@kaamsetu.demo",
      role,
      avatar: null,
    };
    setUser(customUser);
    return customUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAsRole, loginCustom, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
