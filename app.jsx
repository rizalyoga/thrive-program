import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getAllData, getSkill, loadingHome } from "./data/api";
import LoadingComponent from "./components/loading/Loading";

/* ------------------------- BUTTON COMPONENT ------------------------- */
const SkillButton = ({ characterId, getSkillCharacter, switchButton }) => {
  /* --------------------------- GET SKILL HANDLING --------------------------- */
  const getSkill = () => {
    getSkillCharacter(characterId);
    switchButton();
  };

  return (
    <button disabled={characterId ? false : true} id="show-skill-btn" className={characterId && "choose-btn"} onClick={getSkill}>
      Show Skill
    </button>
  );
};

const HeroesButton = ({ switchButton, removeSkillData }) => {
  const getHeroes = () => {
    switchButton();
    removeSkillData();
  };

  return (
    <button id="show-skill-btn" className="choose-btn" onClick={getHeroes}>
      Show Heroes
    </button>
  );
};

/* ---------------------------------- CARD COMPONENT ---------------------------------- */
const Card = ({ dataCharacter, updateChoosing, background, skill }) => {
  const { skills } = skill;

  const choosingCharacter = (id) => {
    updateChoosing(id);
  };

  return (
    <>
      {skill.length === 0
        ? dataCharacter.map((data) => (
            <div className={data.id == background ? "card active" : "card"} key={data.id}>
              <img className="image" src={data.imgSrc} alt="avatar" />
              <h1>{data.name}</h1>
              <h2>{data.age}</h2>
              <h3>{data.city}</h3>
              <button className="choose-btn" onClick={() => choosingCharacter(data.id)}>
                choose
              </button>
            </div>
          ))
        : skills.map((data) => (
            <div className="card" key={data.id}>
              <img className="image" src={data.imgSrc} alt="avatar" />
              <h3>{data.name}</h3>
            </div>
          ))}
    </>
  );
};

/* ----------------------------------- APPJ SX ---------------------------------- */
const App = () => {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [dataSkill, setDataSkill] = useState([]);
  const [chooseCharacter, setChooseCharacter] = useState("");
  const [idCaracter, setIdCharacter] = useState("");
  const [loading, setLoading] = useState();
  const [switchButton, setSwitchButton] = useState(false);

  const chooseTheCharacter = (id) => {
    setChooseCharacter(id);
    setIdCharacter(id);
  };

  //  GET ALL DATA HEROES
  useEffect(() => {
    getAllData()
      .then((response) => setDataCharacter(response))
      .then(() => setLoading(false));
    setLoading(loadingHome);
  }, []);

  // GET SKILL FROM CHARACTER
  const getSkillCharacter = (id) => {
    getSkill(id).then((response) => setDataSkill(response));
  };

  // SWITCH RENDER BUTTON
  const switchRenderButton = () => {
    setTimeout(() => {
      setSwitchButton((switchButton) => !switchButton);
    }, 300);
  };

  // REMOVE SKILL DATA FROM STATE WHEN HEROS BUTTON ON CLIKCK
  const removeSkillData = () => {
    setDataSkill([]);
    setIdCharacter("");
    setChooseCharacter("");
  };

  return (
    <div className="container">
      {loading ? <LoadingComponent /> : <Card dataCharacter={dataCharacter} background={idCaracter} updateChoosing={chooseTheCharacter} skill={dataSkill} />}
      {!switchButton ? <SkillButton characterId={chooseCharacter} getSkillCharacter={getSkillCharacter} switchButton={switchRenderButton} /> : <HeroesButton removeSkillData={removeSkillData} switchButton={switchRenderButton} />}
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
