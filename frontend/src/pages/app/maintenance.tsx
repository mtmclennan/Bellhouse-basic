import Layout from "@/components/layoutApp/Layout";
import ButtonBox from "@/components/UI/ButtonBox";
import Heading from "@/components/UI/Heading";
import React from "react";

const maintenance = () => {
  return (
    <Layout>
      <div>
        <Heading text="Maintenance" />
        <ButtonBox label="Report Issue" link="/app/repair-request" />
        <ButtonBox label="Performed Service" link="/app/service-report" />
        <ButtonBox label="Service Requests" link="/app/service-requests" />
      </div>
    </Layout>
  );
};

export default maintenance;
