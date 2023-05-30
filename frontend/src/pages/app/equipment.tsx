import Layout from "@/components/layoutApp/Layout";
import EquipmentList from "@/components/lists/EquipmentList";
import Heading from "@/components/UI/Heading";
import React, { useEffect, useState } from "react";
import ButtonBox from "@/components/UI/ButtonBox";
import { useRouter } from "next/router";

const Equipment = () => {
  const [unitId, setUnitId] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("here");
    if (unitId === "") return;
    router.push({
      pathname: `/app/unit`,
      query: { id: unitId },
    });
  }, [unitId]);

  return (
    <Layout>
      <div>
        <Heading text="Equipment" />
        <ButtonBox label="Add Equipment" link="/app/add-equipment" />
        <EquipmentList setUnitId={setUnitId} />
      </div>
    </Layout>
  );
};

export default Equipment;
