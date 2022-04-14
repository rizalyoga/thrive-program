import React, { useEffect, useState } from "react";
import { getSkill } from "../../data/api";
import { useParams } from "react-router-dom";
import CardSkill from "../../components/Card/Card";
import { GoesToCityButton } from "../../components/Button/Button";

function Skill() {
  const [dataSkill, setDataSkill] = useState({});
  const { idCharacter } = useParams();

  useEffect(() => {
    getSkill(idCharacter).then((response) => setDataSkill(response));
  }, []);

  return (
    <div className="container">
      <h1 className="title-page">
        Skills Possessed by <span>{dataSkill.name}</span>
      </h1>
      <div className="card-container">{dataSkill && <CardSkill skill={dataSkill} />}</div>
      <div className="button-wrap">
        <GoesToCityButton characterId={dataSkill.id} characterName={dataSkill.name} />
      </div>
    </div>
  );
}

export default Skill;
