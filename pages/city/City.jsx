import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCity, loadings } from "../../data/api";
import CardCity from "../../components/Card/CardCity";
import LoadingComponent from "../../components/loading/Loading";

function City() {
  const [dataCity, setDataCity] = useState([]);
  const [loading, setLoading] = useState();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCity()
      .then((response) => setDataCity(response))
      .then(() => setLoading(false));
    setLoading(loadings);
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
            Welcome <span>{params?.nameCharacter?.toUpperCase()}</span>
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
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="card-container">
          <CardCity dataCity={dataCity} />
        </div>
      )}
    </div>
  );
}

export default City;
