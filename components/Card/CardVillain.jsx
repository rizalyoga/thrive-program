import React from "react";

function CardVillain({ dataVillains }) {
  const choosingVillain = (id) => {
    console.log(id);
  };

  return (
    <>
      {dataVillains.map((data) => (
        <div className="card" key={data.id}>
          <img className="image" src={data.imgSrc} alt="avatar" />
          <h1>{data.name}</h1>
          <button className="choose-btn" onClick={() => choosingVillain(data.id)}>
            choose
          </button>
        </div>
      ))}
    </>
  );
}

export default CardVillain;
