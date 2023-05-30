import React, { useState } from "react";
import EquipmentList from "../../components/lists/EquipmentList";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Heading from "@/components/UI/Heading";
import InputEquipment from "@/components/lists/InputEquipment";
import InputTextArea from "@/components/UI/InputTextArea";
import ServiceReportForm from "@/components/forms/ServiceReportForm";
import Layout from "@/components/layoutApp/Layout";

const ServiceReport = () => {
  const [vehicleNum, setVehicleNumber] = useState("");

  return (
    <Layout>
      <div>
        <Heading text="Service Report" />
        <ServiceReportForm />
      </div>
    </Layout>
  );
};

export default ServiceReport;
