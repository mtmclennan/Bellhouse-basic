import Head from "next/head";
import Image from "next/legacy/image";
import Layout from "@/components/layoutApp/Layout";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ButtonBox from "@/components/UI/ButtonBox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>BELLHOUSE</title>
        <meta name="description" content="BELLHOUSE EXCAVATING" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="main">
          <ButtonBox label="Maintenance" link="/app/maintenance" />
          <ButtonBox label="Equipment" link="/app/equipment" />
          <ButtonBox label="Timesheet" link="/app/timesheet" />
          <ButtonBox label="Fueling" link="/app/fueling" />
        </div>
      </Layout>
    </>
  );
}
