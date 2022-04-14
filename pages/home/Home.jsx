import React, { useState, useEffect } from "react";
import { getAllData, getSkill, loadings } from "../../data/api";
import LoadingComponent from "../../components/loading/Loading";
import Card from "../../components/Card/Card";
import { HeroesButton, GoesToCityButton } from "../../components/Button/Button";

const Home = () => {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [dataSkill, setDataSkill] = useState([]);
  const [chooseCharacter, setChooseCharacter] = useState("");
  const [idCaracter, setIdCharacter] = useState("");
  const [loading, setLoading] = useState();
  const [switchButton, setSwitchButton] = useState(false);

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

  // GET SKILL FROM CHARACTER
  // const getSkillCharacter = (id) => {
  //   getSkill(id).then((response) => setDataSkill(response));
  // };

  // SWITCH RENDER BUTTON
  // const switchRenderButton = () => {
  //   setTimeout(() => {
  //     setSwitchButton((switchButton) => !switchButton);
  //   }, 300);
  // };

  // REMOVE SKILL DATA FROM STATE WHEN HEROS BUTTON ON CLIKCK
  // const removeSkillData = () => {
  //   setDataSkill([]);
  //   setIdCharacter("");
  //   setChooseCharacter("");
  // };

  return (
    <div className="container">
      <h1 className="title-page">Choose Your Heros</h1>
      <div className="card-container">{loading ? <LoadingComponent /> : <Card dataCharacter={dataCharacter} background={idCaracter} updateChoosing={chooseTheCharacter} skill={dataSkill} />}</div>
      <div className="button-wrap">
        <GoesToCityButton characterId={idCaracter} characterName={chooseCharacter} />
      </div>
    </div>
  );
};

export default Home;
