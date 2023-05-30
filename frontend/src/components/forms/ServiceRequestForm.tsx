import React, { useContext, useState } from "react";
import useHttp from "@/hooks/use-http";

import InputEquipment from "../lists/InputEquipment";
import InputDate from "../UI/InputDate";
import InputNumber from "../UI/InputNumber";
import InputTextArea from "../UI/InputTextArea";
import useModal from "../../hooks/use-modal";
import { useRouter } from "next/router";
import AuthContext from "@/store/auth-context";

interface Res {
  status: string;
}

const ServiceRequestForm = () => {
  const [unit, setUnit] = useState("");
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState(0);
  const [request, setRequest] = useState("");
  const { sendRequest, error } = useHttp();
  const router = useRouter();

  const AuthCtx = useContext(AuthContext);

  const {
    setModalMessage,
    showModal,
    hideModal,
    showModalButtons,
    modalMessage,
    setShowModalButtons,
  } = useModal(error);

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/service/request`;

  const formSubmitHandler = (
    event: React.FormEvent<HTMLFormElement> | React.TouchEvent
  ) => {
    event.preventDefault();
    const response = (res: Res) => {
      if (res.status === "success") {
        setModalMessage("Report Saved");
        setTimeout(() => {
          hideModal();
          router.push("/app/maintenance");
        }, 2000);
        console.log("success");
      } else {
        setTimeout(() => {
          console.log("errorr");
        }, 3000);
      }
    };

    sendRequest(
      {
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          user: AuthCtx.user._id,
          unit,
          requestDate: date,
          hours,
          mileage,
          request,
        },
      },
      response
    );
  };

  return (
    <form className="service-form" onSubmit={formSubmitHandler}>
      <InputDate inputLabel="Date" setText={setDate} />
      <InputEquipment setUnitId={setUnit} />
      <InputNumber inputLabel="Hours" setText={setHours} />
      <InputNumber inputLabel="Mileage" setText={setMileage} />
      <InputTextArea label="Service Request" setText={setRequest} />
      <button type="submit" className="service-form__button">
        Save Report
      </button>
    </form>
  );
};

export default ServiceRequestForm;
