import React, { useState, useEffect } from "react";
import { getAllData, loadings } from "../../data/api";
import LoadingComponent from "../../components/loading/Loading";
import Card from "../../components/Card/Card";
import { GoesToCityButton } from "../../components/Button/Button";

const Home = () => {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [dataSkill] = useState([]);
  const [chooseCharacter, setChooseCharacter] = useState("");
  const [idCaracter, setIdCharacter] = useState("");
  const [loading, setLoading] = useState();

  // HANDLE CHOOSEN CHARACTER
  const chooseTheCharacter = (name, id) => {
    setChooseCharacter(name);
    setIdCharacter(id);
  };

  //  GET ALL DATA HEROES
  useEffect(() => {
    getAllData()
      .then((response) => setDataCharacter(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  // RESET GAME HANDLER
  const resetGame = () => {
    localStorage.clear();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="desc-header">
          <h1 className="title-page">Choose Your Hero</h1>
        </div>
        <div className="button-control">
          <button className="choose-btn" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="card-container">
          <Card dataCharacter={dataCharacter} background={idCaracter} updateChoosing={chooseTheCharacter} skill={dataSkill} />
        </div>
      )}

      <div className="button-wrap">
        <GoesToCityButton characterId={idCaracter} characterName={chooseCharacter} />
      </div>
    </div>
  );
};

export default Home;
