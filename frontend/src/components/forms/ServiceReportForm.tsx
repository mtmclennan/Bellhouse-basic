import useHttp from "@/hooks/use-http";
import React, { useContext, useState } from "react";
import InputEquipment from "../lists/InputEquipment";
import InputDate from "../UI/InputDate";
import InputNumber from "../UI/InputNumber";
import InputTextArea from "../UI/InputTextArea";
import { useRouter } from "next/router";
import useModal from "../../hooks/use-modal";
import Modal from "../UI/Modal";
import AuthContext from "@/store/auth-context";

interface Res {
  status: string;
}

const ServiceReportForm = () => {
  const [unit, setUnit] = useState("");
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState(0);
  const [maintenance, setMaintenance] = useState("");
  const [repair, setRepair] = useState("");
  const { sendRequest, error } = useHttp();
  const AuthCtx = useContext(AuthContext);

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/service`;

  const router = useRouter();

  const {
    setModalMessage,
    showModal,
    hideModal,
    showModalButtons,
    modalMessage,
    setShowModalButtons,
  } = useModal(error);

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
          serviceDate: date,
          hours,
          mileage,
          maintenance,
          repair,
        },
      },
      response
    );
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => hideModal()}>
          <h3>{modalMessage}</h3>
        </Modal>
      )}
      <form className="service-form" onSubmit={formSubmitHandler}>
        <InputDate inputLabel="Date" setText={setDate} />
        <InputEquipment setUnitId={setUnit} />
        <InputNumber inputLabel="Hours" setText={setHours} />
        <InputNumber inputLabel="Mileage" setText={setMileage} />
        <InputTextArea label="Maintenance Performed" setText={setMaintenance} />
        <InputTextArea label="Repair Performed" setText={setRepair} />
        <button className="service-form__button">Save Report</button>
      </form>
    </>
  );
};

export default ServiceReportForm;
