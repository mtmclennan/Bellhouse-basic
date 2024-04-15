import React from "react";

export type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export type SetStateString = React.Dispatch<React.SetStateAction<string>>;

export type FormEvent = React.FormEvent<HTMLFormElement>;

export type LiOnClick = React.UIEvent<HTMLLIElement>;

export type SetStateNumber = React.Dispatch<React.SetStateAction<number>>;

export type ButtonOnClick = React.UIEvent<HTMLButtonElement>;

export type DateOptions = {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day: "numeric" | "2-digit";
};

export type User = {
  email: string;
  name: string;
  role: string;
  _id: string;
};

export type Context = {
  isLoggedIn: boolean;
  user: User;
  onLogin: (user: User) => void;
  onLogout: () => void;
};

export type UserRes = {
  status: string;
  user: { email: string; name: string; role: string; _id: string };
};
