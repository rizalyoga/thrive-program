import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getAllData, getSkill } from "./data/api";

/* ------------------------- CHARACTER YANG DIPILIH ------------------------- */
const SkillButton = ({ characterId }) => {
  const [dataSkill, setDataSkill] = useState([]);

  /* --------------------------- GET SKILL HANDLING --------------------------- */
  const getSkillCharacter = () => {
    getSkill(characterId).then((response) => setDataSkill(response));
  };

  return (
    <button id="show-skill-btn" className="choose-btn" onClick={getSkillCharacter}>
      Show Skill
    </button>
  );
};

/* ---------------------------------- CARD ---------------------------------- */
const Card = ({ dataCharacter, updateChoosing, background }) => {
  const { id, imgSrc, name, city, age } = dataCharacter;

  const choosingCharacter = () => {
    updateChoosing(id);
  };

  return (
    <div className={id == background ? "card active" : "card"}>
      <img className="image" src={imgSrc} alt="avatar" />
      <h1>{name}</h1>
      <h2>{age}</h2>
      <h3>{city}</h3>
      <button className="choose-btn" onClick={choosingCharacter}>
        choose
      </button>
    </div>
  );
};

/* ----------------------------------- APP ---------------------------------- */
const App = () => {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [chooseCharacter, setChooseCharacter] = useState("");
  const [idCaracter, setIdCharacter] = useState("");

  const chooseTheCharacter = (id) => {
    setChooseCharacter(id);
    setIdCharacter(id);
  };

  useEffect(() => {
    getAllData().then((response) => setDataCharacter(response));
  }, []);

  return (
    <div className="container">
      {dataCharacter.map((data) => (
        <Card dataCharacter={data} background={idCaracter} updateChoosing={chooseTheCharacter} key={data.id} />
      ))}
      <SkillButton characterId={chooseCharacter} />
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
