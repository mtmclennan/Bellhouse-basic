import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../../public/assets/excvator-white.png";
import classes from "./Header.module.scss";

const Header = () => {
  const router = useRouter();
  return (
    <div className={classes.header}>
      <button onClick={() => router.back()}>
        <ArrowBackIcon fontSize="inherit" />
      </button>
      <div className="logo">
        <Link href="/app">
          <Image src={logo} alt="Bellhouse" layout="fill" />
        </Link>
      </div>
      <div>
        <Link href="/app">
          <h1>BELLHOUSE</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
