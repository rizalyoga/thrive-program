import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getAllData, getSkill, loadingHome } from "./data/api";
import LoadingComponent from "./components/loading/Loading";

/* ------------------------- CHARACTER YANG DIPILIH ------------------------- */
const SkillButton = ({ characterId, getSkillCharacter }) => {
  /* --------------------------- GET SKILL HANDLING --------------------------- */
  const getSkill = () => {
    getSkillCharacter(characterId);
  };

  return (
    <button disabled={characterId ? false : true} id="show-skill-btn" className={characterId && "choose-btn"} onClick={getSkill}>
      Show Skill
    </button>
  );
};

/* ---------------------------------- CARD ---------------------------------- */
const Card = ({ dataCharacter, updateChoosing, background, skill }) => {
  const { id, imgSrc, name, city, age } = dataCharacter;
  const { skills } = skill;

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
  const [dataSkill, setDataSkill] = useState([]);
  const [chooseCharacter, setChooseCharacter] = useState("");
  const [idCaracter, setIdCharacter] = useState("");
  const [loading, setLoading] = useState();

  const chooseTheCharacter = (id) => {
    setChooseCharacter(id);
    setIdCharacter(id);
  };

  useEffect(() => {
    getAllData()
      .then((response) => setDataCharacter(response))
      .then(() => setLoading(false));
    setLoading(loadingHome);
  }, []);

  const getSkillCharacter = (id) => {
    getSkill(id).then((response) => setDataSkill(response));
  };

  return (
    <div className="container">
      {loading ? <LoadingComponent /> : dataCharacter.map((data) => <Card dataCharacter={data} background={idCaracter} updateChoosing={chooseTheCharacter} skill={dataSkill} key={data.id} />)}
      <SkillButton characterId={chooseCharacter} getSkillCharacter={getSkillCharacter} />
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
