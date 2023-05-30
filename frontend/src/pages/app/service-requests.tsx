import ServiceRequestList from "@/components/lists/ServiceRequestList";
import React from "react";
import Heading from "@/components/UI/Heading";
import Layout from "@/components/layoutApp/Layout";

const ServiceRequests = () => {
  return (
    <Layout>
      <div>
        <Heading text="Service Requests" />

        <ServiceRequestList />
      </div>
    </Layout>
  );
};

export default ServiceRequests;
