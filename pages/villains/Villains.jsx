import React from "react";
import { useParams } from "react-router-dom";
import { GoesToCityButton } from "../../components/Button/Button";

function Villains() {
  const { idCharacter, nameCharacter } = useParams();

  return (
    <div className="container">
      <div className="header">
        <div className="desc-header">
          <h1>Villain List</h1>
          <h2>Choose your Villain !</h2>
        </div>
        <div className="control-button">
          <GoesToCityButton characterId={idCharacter} characterName={nameCharacter} />
        </div>
      </div>
    </div>
  );
}

export default Villains;
