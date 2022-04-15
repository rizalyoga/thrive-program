import React, { useState } from "react";
import Modal from "../modal/Modal";

function CardVillain({ dataVillains }) {
  const [isOpen, setIsOpen] = useState(false);
  const [idVillain, setIdVillain] = useState("");

  const choosingVillain = (id) => {
    setIsOpen(true);
    setIdVillain(id);
  };

  return (
    <>
      {dataVillains.map((data) => (
        <div className="card" key={data.id}>
          <img className="image" src={data.imgSrc} alt="avatar" />
          <h1>{data.name}</h1>
          <button className="choose-btn" onClick={() => choosingVillain(data.id)}>
            Fight {data.name}
          </button>
        </div>
      ))}
      {isOpen && <Modal setIsOpen={setIsOpen} idVillain={idVillain} />}
    </>
  );
}

export default CardVillain;
