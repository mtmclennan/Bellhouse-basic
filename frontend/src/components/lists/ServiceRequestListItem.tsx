import { LiOnClick } from "@/types/index.types";
import { useRouter } from "next/router";
import React from "react";
import classes from "./ServiceRequestList.module.scss";

interface ServiceRequestListItemProps {
  unitNumber: string;
  year: number;
  make: string;
  model: string;
  request: string;
  id: string;
}

const ServiceRequestListItem = ({
  unitNumber,
  year,
  make,
  model,
  request,
  id,
}: ServiceRequestListItemProps) => {
  const router = useRouter();

  const onClickHandler = (event: LiOnClick) => {
    event.preventDefault();
    const id = event.currentTarget.id;

    router.push({
      pathname: "/service-request",
      query: { id: id },
    });
  };

  return (
    <li id={id} className={classes.item} onClick={onClickHandler}>
      <span>{unitNumber}</span>
      <span>{year}</span>
      <span>{make}</span>
      <span>{model}</span>
      <span className={classes.title}>Problem</span>
      <p>{request}</p>
    </li>
  );
};

export default ServiceRequestListItem;
