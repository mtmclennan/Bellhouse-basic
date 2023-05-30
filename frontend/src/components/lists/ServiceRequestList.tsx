import useHttp from "@/hooks/use-http";
import { ServiceRequest } from "@/types/interfaces";
import React, { useEffect, useState } from "react";
import ServiceRequestListItem from "./ServiceRequestListItem";
import classes from "./ServiceRequestList.module.scss";

const ServiceRequestList = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>();
  const { sendRequest } = useHttp();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/service/request`;

  useEffect(() => {
    const applyData = ({ data }: any) => {
      setRequests(data);
      console.log(data);
    };

    sendRequest({ url }, applyData);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <span>Unit</span>
        <span>Year</span>
        <span>Make</span>
        <span>Model</span>
      </div>
      <ul className={classes.list}>
        {requests &&
          requests.map((request: ServiceRequest) => (
            <ServiceRequestListItem
              key={request._id}
              id={request._id}
              unitNumber={request.unit.unitNumber}
              year={request.unit.year}
              make={request.unit.make}
              model={request.unit.model}
              request={request.serviceRequest}
            />
          ))}
      </ul>
    </div>
  );
};

export default ServiceRequestList;
