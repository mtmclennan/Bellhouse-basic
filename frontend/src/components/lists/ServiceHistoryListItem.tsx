import React from "react";

interface ServiceHistoryListItemProps {
  id: string;
  date: string;
  hours?: number;
  mileage?: number;
  repair?: string;
  maintenance?: string;
}

const ServiceHistoryListItem = ({
  id,
  date,
  hours,
  mileage,
  repair,
  maintenance,
}: ServiceHistoryListItemProps) => {
  return (
    <li>
      <h5>Service Date</h5>
      <span>{date.split("T", 1)}</span>
      <h5>Hours</h5>
      <span>{hours}</span>
      <h5>Mileage</h5>
      <span>{mileage}</span>
      {maintenance && (
        <>
          <h6>Maintenace Performed</h6>
          <p>{maintenance}</p>
        </>
      )}
      {repair && (
        <>
          <h6>Repairs Preformed</h6>
          <p>{repair}</p>
        </>
      )}
    </li>
  );
};

export default ServiceHistoryListItem;
