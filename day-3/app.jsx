import React, { useState } from "react";
import ReactDOM from "react-dom";
import { dataCharacter } from "./data";

/* ------------------------- CHARACTER YANG DIPILIH ------------------------- */
const CharacterChoose = ({ nameCharacter }) => {
  return <h1 style={{ textAlign: "center", color: "white" }}>{nameCharacter}</h1>;
};

/* ---------------------------------- CARD ---------------------------------- */
const Card = ({ dataCharacter, updateChoosing, background }) => {
  const { id, imageProfile, name, city, age } = dataCharacter;

  const choosingCharacter = () => {
    updateChoosing(name, id);
  };

  return (
    <div className={id == background ? "card active" : "card"}>
      <img className="image" src={imageProfile} alt="avatar" />
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
  const [chooseCharacter, setChooseCharacter] = useState("");
  const [idCaracter, setIdCharacter] = useState("");

  const chooseTheCharacter = (nameCharacter, id) => {
    setChooseCharacter(nameCharacter);
    setIdCharacter(id);
  };

  return (
    <>
      <div className="container">
        {dataCharacter.map((data) => (
          <Card dataCharacter={data} background={idCaracter} updateChoosing={chooseTheCharacter} key={data.id} />
        ))}
        <CharacterChoose nameCharacter={chooseCharacter} />
      </div>
    </>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));

// DAY-2
// const AnimeBio = () => {
//   return dataCharacter.map((data) =>
//     React.createElement("div", { className: "card" }, [
//       React.createElement("img", { className: "image", src: data.imageProfile }),
//       React.createElement("h1", {}, data.name),
//       React.createElement("h2", {}, data.age),
//       React.createElement("h2", {}, data.city),
//     ])
//   );
// };
