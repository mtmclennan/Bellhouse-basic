import { Fragment } from "react";
import Head from "next/head";
import Image from "next/legacy/image";
import Layout from "@/components/layoutsWeb/LayoutWeb";
import logo from "../../public/assets/excvator-white.png";

const About = () => {
  return (
    <Fragment>
      <Head>
        <title>About | BELLHOUSE EXCAVATING</title>
        <meta name="description" content="About Bellhouse Excavating company" />
      </Head>
      <Layout>
        <section className="about-hero__section">
          <div className="about-hero">
            <h1>About</h1>
            <div className="logo__wrapper">
              <Image alt="BELLHOUSE LOGO" src={logo} fill />
            </div>
            <h2 className="logo-text">
              BELLHOUSE <br></br>EXCAVATING
            </h2>
            <div>
              {/* <Image src={logo} alt="EdgeInMind" layout="responsive" /> */}
            </div>
          </div>
        </section>
        <section className="about-content__container">
          <p>Here to help you with your earth moving projects!</p>
          <p>From footings to rock trucks, gravel we can do it all</p>
          <p>
            Serving Brant, Brantford, Hamilton, Waterloo Region and surrounding
            areas
          </p>

          <p></p>
        </section>
      </Layout>
    </Fragment>
  );
};

export default About;
