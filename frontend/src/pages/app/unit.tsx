import Layout from "@/components/layoutApp/Layout";
import ServiceHistoryList from "@/components/lists/ServiceHistoryList";
import ButtonDropDown from "@/components/UI/ButtonDropDown";
import Heading from "@/components/UI/Heading";
import useHttp from "@/hooks/use-http";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Equipment } from "../../types/interfaces";

const Unit = () => {
  const router = useRouter();
  const [unitData, setUnitData] = useState<Equipment>();
  const [showHistory, setShowHistory] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showParts, setShowParts] = useState(false);

  const { sendRequest } = useHttp();
  const id = router.query.id as string;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/equipment/${id}`;

  useEffect(() => {
    const applyData = ({ data }: any) => {
      console.log(data);
      setUnitData(data);
    };

    sendRequest({ url }, applyData);
  }, []);

  return (
    <Layout>
      <Heading text="Unit" />
      {unitData && (
        <div className="unit">
          <ul>
            <li>
              <span>Number:</span>
              <span>{unitData.unitNumber}</span>
            </li>
            <li>
              <span>Year:</span>
              <span>{unitData.year}</span>
            </li>
            <li>
              <span>Make:</span>
              <span>{unitData.make}</span>
            </li>
            <li>
              <span>Model:</span>
              <span>{unitData.model}</span>
            </li>
            <li>
              <span>Engine:</span>
              <span>{unitData.engine}</span>
            </li>
            <li>
              <span>Body Type:</span>
              <span>{unitData.unitType}</span>
            </li>
            <li>
              <span>VIN:</span>
              <span>{unitData.vin}</span>
            </li>
          </ul>
          <ButtonDropDown setOpen={setShowHistory} label="Service History" />
          {showHistory && <ServiceHistoryList id={id} />}
          <ButtonDropDown setOpen={setShowRequests} label="Service Requests" />
          <ButtonDropDown setOpen={setShowParts} label="Parts List" />
        </div>
      )}
    </Layout>
  );
};

export default Unit;
