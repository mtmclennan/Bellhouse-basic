import React, { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";
import { Context } from "../types/index.types";

type LoginHandlerProps = {
  email: string;
  name: string;
  role: string;
  _id: string;
};

const userInital = {
  name: "",
  email: "",
  role: "",
  _id: "",
};

const AuthContext = React.createContext<Context>({
  isLoggedIn: false,
  user: userInital,
  onLogin: () => {},
  onLogout: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(userInital);

  const { sendRequest } = useHttp();
  const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/users`;

  const loginHandler = ({ email, name, role, _id }: LoginHandlerProps) => {
    console.log("HERE");
    console;
    setUser({
      email,
      name,
      role,
      _id,
    });

    setIsLoggedIn(true);
  };
  useEffect(() => {
    sendRequest(
      {
        url: `${SERVER_URL}/getUser`,
      },
      (data) => {
        console.log(data);
        setUser({
          email: data.email,
          name: data.name,
          role: data.role,
          _id: data._id,
        });
        if (data) {
          setIsLoggedIn(true);
        }
      }
    );
  }, [sendRequest, SERVER_URL]);

  const logoutHandler = () => {
    const logout = (res: { status: string }) => {
      if (res.status === "success") {
        setUser(userInital);
      }
    };

    sendRequest(
      {
        url: `${SERVER_URL}/logout`,
      },
      logout
    );

    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
