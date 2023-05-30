import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layoutsWeb/LayoutWeb";
// import logo from "../public/assets/Color EM Large logo - no background.png";

const About = () => {
  return (
    <Fragment>
      <Head>
        <title>About</title>
        <meta name="description" content="About Bellhouse Excavating company" />
      </Head>
      <Layout>
        <section className="contact-hero__section">
          <div className="contact-hero">
            <h3>About</h3>
            <div>
              {/* <Image src={logo} alt="EdgeInMind" layout="responsive" /> */}
            </div>
            <p>Here to help you with your earth moving projects!</p>
          </div>
        </section>
        <section className="about-content__container">
          <p>From footings to rock trucks, gravel we can do it all</p>

          <p></p>
        </section>
      </Layout>
    </Fragment>
  );
};

export default About;
