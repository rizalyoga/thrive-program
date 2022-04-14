import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoesToCityButton } from "../../components/Button/Button";
import { getVillains, loadings } from "../../data/api";
import LoadingComponent from "../../components/loading/Loading";
import CardVillains from "../../components/Card/CardVillain";

function Villains() {
  const [dataVillains, setDataVillains] = useState([]);
  const [loading, setLoading] = useState();
  const { idCharacter, nameCharacter } = useParams();

  useEffect(() => {
    getVillains()
      .then((response) => setDataVillains(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

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
      {loading ? <LoadingComponent /> : <div className="card-container">{dataVillains && <CardVillains dataVillains={dataVillains} />}</div>}
    </div>
  );
}

export default Villains;
