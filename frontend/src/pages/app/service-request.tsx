import Layout from "@/components/layoutApp/Layout";
import useHttp from "@/hooks/use-http";
import { ServiceRequest } from "@/types/interfaces";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

const ServiceRequest = () => {
  const router = useRouter();
  const { sendRequest } = useHttp();
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest>();

  const id = router.query.id;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/service/request/${id}`;

  useEffect(() => {
    const applyData = ({ data }: any) => {
      console.log(data);
      setServiceRequest(data);
    };

    sendRequest(
      {
        url,
      },
      applyData
    );
  }, []);

  return (
    <Layout>
      <div>
        {serviceRequest && (
          <Fragment>
            <div>
              <span>{serviceRequest.unit.unitNumber}</span>
              <span>{serviceRequest.unit.year}</span>
              <span>{serviceRequest.unit.make}</span>
              <span>{serviceRequest.unit.model}</span>
            </div>
            <div>
              <span>Date Reported:</span>
              <span>{serviceRequest.requestDate.split("T")[0]}</span>
            </div>
            <div>
              <span>Reported By:</span>
              <span>Jake</span>
            </div>
            <div>
              <span>Problem</span>
              <p>{serviceRequest.serviceRequest}</p>
            </div>
          </Fragment>
        )}
      </div>
    </Layout>
  );
};

export default ServiceRequest;
