import React, { useState, useEffect } from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { getSelectedVillain, postFight, loadings } from "../../data/api";
import { useParams } from "react-router-dom";
// import { useLocalStorage } from "../../hooks/useLocalStorage";

const Modal = ({ setIsOpen, idVillain }) => {
  const [dataVillain, setDataVillain] = useState([]);
  const [heroHP, setHeroHP] = useState();
  const [villainHP, setVillainHP] = useState();
  const [loading, setLoading] = useState();
  const [loadingButton, setLoadingButton] = useState(false);
  const [statusBattle, setStatusBattle] = useState("READY");

  const { nameCharacter } = useParams();

  // Get Data Villain Function
  useEffect(() => {
    getSelectedVillain(idVillain)
      .then((response) => setDataVillain(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  // Set HP Bar Villain and Hero, when there is fight data in Local Storage
  useEffect(() => {
    if (dataVillain[0]?.name) {
      const anyDataFight = JSON.parse(localStorage.getItem(`${nameCharacter}VS${dataVillain[0]?.name}`));
      setVillainHP(anyDataFight ? anyDataFight.villainHP : dataVillain[0]?.maxHP);
      setHeroHP(anyDataFight ? anyDataFight.heroHP : 100);
    }
  }, [dataVillain]);

  // Close Modal Handler
  const closeModal = () => {
    setIsOpen(false);
  };

  // Battle Handler
  const startBattle = (HPHero, HPVillain) => {
    if (HPHero === 0 || HPVillain === 0) {
      villainHP == 0 ? setStatusBattle("YOU WIN") : heroHP == 0 ? setStatusBattle("YOU LOSE") : setStatusBattle("THE FIGHT IS ON");
      villainHP == 0 ? alert("YOU WIN") : heroHP == 0 ? alert("YOU LOSE") : null;
    } else {
      // setStatusBattle("THE FIGHT IS ON");
      const payload = {
        heroHP: HPHero,
        villainHP: HPVillain,
      };

      setLoadingButton(true);

      postFight(payload)
        .then((response) => {
          //set bar hero and villain HP from response
          setVillainHP(response.villainHP), setHeroHP(response.heroHP);

          //set status battle from response
          response.heroHP == 0 ? setStatusBattle("YOU LOSE") && alert("YOU LOSE") : response.villainHP == 0 ? setStatusBattle("YOU WIN") : setStatusBattle("THE FIGHT IS ON");

          //save data battle in local storage
          window.localStorage.setItem(`${nameCharacter}VS${dataVillain[0]?.name}`, JSON.stringify({ villainHP: response.villainHP, heroHP: response.heroHP }));
        })
        .then(() =>
          setTimeout(() => {
            setLoadingButton(false);
          }, 500)
        );
    }
  };

  return (
    <>
      <div className="darkBG" onClick={closeModal} />
      <div className="centered">
        <div className="modal" style={{ backgroundImage: `linear-gradient(#b3b3b3b2, #ffffffb1),url(https://i.pinimg.com/originals/33/9f/b7/339fb7afe67658a9019f3b5cfb84ec19.jpg)`, backgroundSize: "cover" }}>
          <div className="modalHeader">
            <h5 className="heading">- BATTLE WITH {dataVillain[0]?.name.toUpperCase()} -</h5>
          </div>
          <button className="closeBtn" onClick={closeModal}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className="modalContent">
            {loading ? (
              <h3 className="loadingModal">PLEASE WAIT . . .</h3>
            ) : (
              <>
                {/*  ------------------------------ DESC Villain ------------------------------  */}
                <div className="villainAvatar">
                  <img src={dataVillain[0]?.imgSrc} alt="villain-avatar" />
                </div>
                <h3>- {dataVillain[0]?.name.toUpperCase()} -</h3>

                {/*  ----------------------------- HP Bar Villain -----------------------------  */}
                <div className="progress" style={{ maxWidth: `${dataVillain[0]?.maxHP}` + "%" }}>
                  <p className="statusHP">{villainHP} %</p>
                  <div className="villainHP progressBar" style={villainHP >= 0 ? { width: `${villainHP}` + "%" } : { width: `${dataVillain[0]?.maxHP}` + "%" }}></div>
                </div>

                {/* ------------------------------ Battle Status -----------------------------  */}
                <div className="boxStatus">
                  <h2>{statusBattle}</h2>
                </div>

                {/*  ----------------------------- HP Bar Player -----------------------------  */}
                <div className="progress">
                  <p className="statusHP">{heroHP} %</p>
                  <div className="playerHP progressBar" style={{ width: `${heroHP}` + "%" }}></div>
                </div>
                <h3>- {nameCharacter.toUpperCase()} -</h3>

                {/*  ----------------------------- Action Control -----------------------------  */}
                <div className="modalActions">
                  <div className="actionsContainer">
                    <button className={loadingButton ? "disableBtn" : "fightBtn"} disabled={loadingButton ? true : false} onClick={() => startBattle(heroHP, villainHP ? villainHP : villainHP == 0 ? 0 : dataVillain[0].maxHP)}>
                      {loadingButton ? "Wait" : "Fight"}
                    </button>
                    {/* <button className="cancelBtn" onClick={closeModal}>
                      Cancel
                    </button> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
