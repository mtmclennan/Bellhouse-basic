import useHttp from "@/hooks/use-http";
import { Service } from "@/types/interfaces";
import React, { useEffect, useState } from "react";
import ServiceHistoryListItem from "./ServiceHistoryListItem";
import classes from "./ServiceHistory.module.scss";

const ServiceHistoryList = ({ id }: { id: string }) => {
  const [serviceData, setServiceData] = useState<Service[]>();
  const { sendRequest } = useHttp();

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/service/history/${id}`;

  useEffect(() => {
    const applyData = ({ data }: any) => {
      console.log(data);
      setServiceData(data);
    };
    sendRequest({ url }, applyData);
  }, []);
  return (
    <div className={classes.container}>
      <ul>
        {serviceData &&
          serviceData.map((service) => (
            <ServiceHistoryListItem
              key={service._id}
              date={service.serviceDate}
              id={service._id}
              hours={service.hours}
              maintenance={service.maintenance}
              mileage={service.mileage}
              repair={service.repair}
            />
          ))}
      </ul>
    </div>
  );
};

export default ServiceHistoryList;
