import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layoutsWeb/LayoutWeb";
import logo from "../../public/assets/BellhouseLogo-text.png";

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
            <h1>About Us</h1>
            <div className="logo__wrapper">
              <Image alt="BELLHOUSE LOGO" src={logo} fill />
            </div>

            <div>
              {/* <Image src={logo} alt="EdgeInMind" layout="responsive" /> */}
            </div>
          </div>
        </section>
        <section className="about-content__container">
          <h3>Our History</h3>
          <p>
            Bellhouse Excavating has been a trusted name in excavation and
            construction services since its establishment in 1982. Founded with
            a commitment to excellence and customer satisfaction, the company
            quickly gained a reputation for delivering high-quality workmanship
            and reliable service.
          </p>
          <p>
            In 2020, Bellhouse Excavating underwent a significant change in
            management. Darryl, a long-time employee of the company and highly
            skilled in all areas of our services, took over management. With his
            in-depth knowledge and expertise, Darryl has continued the
            company&apos;s legacy of excellence, ensuring that Bellhouse
            Excavating remains a leader in the industry.
          </p>
          <p>
            Today, Bellhouse Excavating serves Brant County, Brantford,
            Hamilton, Waterloo Region, Woodstock, Oxford County, Halton, and
            surrounding areas, providing top-notch excavation and construction
            services to residential and commercial clients. With a focus on
            quality, safety, and customer satisfaction, we are committed to
            delivering exceptional results for every project.
          </p>
        </section>
      </Layout>
    </Fragment>
  );
};

export default About;
