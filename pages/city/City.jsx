import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCity } from "../../data/api";
import CardCity from "../../components/Card/CardCity";

function City() {
  const [dataCity, setDataCity] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCity().then((response) => setDataCity(response));
  }, []);

  //Back to Home Handler
  const goesToHome = () => {
    navigate("/");
  };

  //Goes to Skill Character
  const goesToSkill = () => {
    navigate(`/skill/${params.idCharacter}/${params.nameCharacter}`);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="desc-header">
          <h1>
            Welcome <span>{params.nameCharacter}</span>
          </h1>
          <h2>Choose your battle ground !</h2>
        </div>
        <div className="control-button">
          <button className="choose-btn" onClick={goesToSkill}>
            Hero Information
          </button>
          <button className="choose-btn" onClick={goesToHome}>
            Other Hero
          </button>
        </div>
      </div>

      <div className="card-container">
        <CardCity dataCity={dataCity} />
      </div>
    </div>
  );
}

export default City;
