import React, { useState, useEffect } from "react";
import "./CardCity-style.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";

function CardCity({ dataCity }) {
  // const [isVisible, setIsVisible] = useState(false);
  const { idCharacter, nameCharacter } = useParams();

  const navigate = useNavigate();

  const goesToVillain = (idCharacter, nameCharacter, cityName) => {
    navigate(`/villains/${idCharacter}/${nameCharacter}/${cityName}`);
  };

  return (
    <>
      {dataCity?.map((data) => (
        <div className="card-wraper" key={data.id}>
          <div className="city-image">
            <img src={data.imgSrc} alt="arena-image" />
          </div>
          <div className="button-title-city">
            {data.heroes.map((el) =>
              el.id == idCharacter ? (
                <button className="choose-btn" onClick={() => goesToVillain(idCharacter, nameCharacter, data.name)}>
                  {data.name}
                </button>
              ) : (
                <button className="disable-btn">{data.name}</button>
              )
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default CardCity;
