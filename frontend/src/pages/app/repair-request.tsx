import ServiceRequestForm from "@/components/forms/ServiceRequestForm";
import Layout from "@/components/layoutApp/Layout";
import Heading from "@/components/UI/Heading";
import React from "react";

const RepairRequest = () => {
  return (
    <Layout>
      <div>
        <Heading
          text="
        Report Issue"
        />
        <ServiceRequestForm />
      </div>
    </Layout>
  );
};

export default RepairRequest;
