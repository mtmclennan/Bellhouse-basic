import AuthContext from "@/store/auth-context";
import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React, { Fragment, useContext } from "react";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const AutxCtx = useContext(AuthContext);

  console.log(AutxCtx.user);
  if (typeof window !== "undefined") {
    if (!AutxCtx.user.name) router.push("/app/login");
  }

  return <Fragment>{children}</Fragment>;
};

export default Protected;
