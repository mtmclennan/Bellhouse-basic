import React, { useState } from "react";
import Input from "../UI/Input";
import InputNumber from "../UI/InputNumber";
import useHttp from "@/hooks/use-http";
import useModal from "@/hooks/use-modal";
import { useRouter } from "next/router";
import Modal from "../UI/Modal";

interface Res {
  status: string;
}

const AddEquipmentForm = () => {
  const [unitNumber, setUnitNumber] = useState("");
  const [vin, setVin] = useState("");
  const [year, setYear] = useState(0);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();
  const { sendRequest, error, isLoading } = useHttp();

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/equipment`;

  const {
    setModalMessage,
    showModal,
    hideModal,
    showModalButtons,
    modalMessage,
    setShowModalButtons,
  } = useModal(error);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const response = (res: Res) => {
      if (res.status === "success") {
        setModalMessage("Unit Saved");
        setTimeout(() => {
          hideModal();
          router.push("/app/equipment");
        }, 2000);
      } else {
        setTimeout(() => {
          console.log("error");
        }, 3000);
      }
    };
    console.log(unitNumber, vin, year, make, model, engine, type);

    sendRequest(
      {
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          unitNumber,
          vin,
          year,
          make,
          model,
          engine,
          unitType: type,
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
      <form className="equip-form" onSubmit={formSubmitHandler}>
        <Input inputLabel="Unit Number" setText={setUnitNumber} />
        <Input inputLabel="VIN Number" setText={setVin} />
        <InputNumber inputLabel="Year" setText={setYear} />
        <Input inputLabel="Make" setText={setMake} />
        <Input inputLabel="Model" setText={setModel} />
        <Input inputLabel="Engine" setText={setEngine} />
        <Input inputLabel="Unit Type" setText={setType} />
        <button className="form__button">Save</button>
      </form>
    </>
  );
};

export default AddEquipmentForm;
