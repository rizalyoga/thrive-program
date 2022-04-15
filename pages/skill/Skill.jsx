import React, { useEffect, useState } from "react";
import { getSkill, loadings } from "../../data/api";
import { useParams } from "react-router-dom";
import CardSkill from "../../components/Card/Card";
import { GoesToCityButton } from "../../components/Button/Button";
import LoadingComponent from "../../components/loading/Loading";

function Skill() {
  const [dataSkill, setDataSkill] = useState({});
  const [loading, setLoading] = useState();
  const { idCharacter } = useParams();

  //Get Skills Data
  useEffect(() => {
    getSkill(idCharacter)
      .then((response) => setDataSkill(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  return (
    <div className="container">
      <h1 className="title-page">
        <span>{dataSkill?.name?.toUpperCase()} </span> skills
      </h1>
      {loading ? <LoadingComponent /> : <div className="card-container">{dataSkill && <CardSkill skill={dataSkill} />}</div>}
      <div className="button-wrap">
        <GoesToCityButton characterId={dataSkill.id} characterName={dataSkill.name} />
      </div>
    </div>
  );
}

export default Skill;
