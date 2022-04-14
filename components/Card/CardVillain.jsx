import React from "react";

function CardVillain({ dataVillains }) {
  const choosingVillain = (name) => {
    alert(`Your Villain is ${name}`);
  };

  return (
    <>
      {dataVillains.map((data) => (
        <div className="card" key={data.id}>
          <img className="image" src={data.imgSrc} alt="avatar" />
          <h1>{data.name}</h1>
          <button className="choose-btn" onClick={() => choosingVillain(data.name)}>
            Fight {data.name}
          </button>
        </div>
      ))}
    </>
  );
}

export default CardVillain;
