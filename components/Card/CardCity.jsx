import React, { useState, useEffect } from "react";
import "./CardCity-style.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";

function CardCity({ dataCity }) {
  // const [isVisible, setIsVisible] = useState(false);
  const { idCharacter, nameCharacter } = useParams();

  const navigate = useNavigate();

  // GOES TO VILAIN PAGE HANDLER
  const goesToVillain = (idCharacter, nameCharacter, cityName) => {
    navigate(`/villains/${idCharacter}/${nameCharacter}/${cityName}`);
  };

  // const changeVisible = () => {
  //   setIsVisible((prev) => !prev);
  // };

  return (
    <>
      {dataCity?.map((data) => (
        <div className="card-wraper" key={data.id}>
          <div className="city-image">
            <img src={data.imgSrc} alt="arena-image" />
          </div>
          <div className="button-title-city">
            {data.heroes.map(
              (el) =>
                el.id == idCharacter ? (
                  <button key={el.id} className="choose-btn" onClick={() => goesToVillain(idCharacter, nameCharacter, data.name)}>
                    Battle in {data.name}
                  </button>
                ) : null
              // <button className="disable-btn">{data.name}</button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default CardCity;
