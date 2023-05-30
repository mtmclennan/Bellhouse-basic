import AddEquipmentForm from "@/components/forms/AddEquipmentForm";
import Layout from "@/components/layoutApp/Layout";
import Heading from "@/components/UI/Heading";
import React from "react";

const AddEquipment = () => {
  return (
    <Layout>
      <div>
        <Heading text="Add New Equipment" />
        <AddEquipmentForm />
      </div>
    </Layout>
  );
};

export default AddEquipment;
