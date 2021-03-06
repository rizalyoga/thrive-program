import React, { useState, useEffect } from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { getSelectedVillain, postFight, loadings } from "../../data/api";
import { useParams } from "react-router-dom";
import { useGetCity } from "../../hooks/useGetCity";
import { resultAlert } from "../alert/resultAlert";

const Modal = ({ setIsOpen, idVillain }) => {
  const [dataVillain, setDataVillain] = useState([]);
  const [heroHP, setHeroHP] = useState();
  const [villainHP, setVillainHP] = useState();
  const [loading, setLoading] = useState();
  const [loadingButton, setLoadingButton] = useState(false);
  const [statusBattle, setStatusBattle] = useState("READY");
  const [imageSource, setImageSource] = useState("");

  const { nameCharacter } = useParams();
  const { nameCity } = useParams();

  const { dataCity } = useGetCity();

  // Get Data Villain Function
  useEffect(() => {
    getSelectedVillain(idVillain)
      .then((response) => setDataVillain(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  // Set imageSource and HP bar (villain, hero) state
  useEffect(() => {
    if (dataVillain[0]?.name && dataCity) {
      // Check and set HP bar when there is fight data in local storage
      const anyDataFight = JSON.parse(localStorage.getItem(`${nameCharacter}VS${dataVillain[0]?.name}`));
      setVillainHP(anyDataFight ? anyDataFight.villainHP : dataVillain[0]?.maxHP);
      setHeroHP(anyDataFight ? anyDataFight.heroHP : 100);

      // Filter background Modal that match with city name and set to imageSource state
      dataCity.forEach((el) => (el.name == nameCity ? setImageSource(el.imgSrc) : null));
    }
  }, [dataVillain, dataCity]);

  // Close Modal Handler
  const closeModal = () => {
    setIsOpen(false);
  };

  // Even Handler when fight is ended
  const fightEndhandler = (villainHP, heroHP) => {
    heroHP == 0 ? setStatusBattle("YOU LOSE") : villainHP == 0 ? setStatusBattle("YOU WIN") : null;
    setTimeout(() => {
      heroHP == 0 ? resultAlert("Sorry You LOSE ????") : villainHP == 0 ? resultAlert("Congratulations, You WIN ????") : null;
      closeModal();
    }, 650);
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
          //set hit status battle, WIN or LOSE from response
          response.heroHP < heroHP ? setStatusBattle("YOU LOSE, YOUR HP -10%") : response.villainHP < villainHP ? setStatusBattle("YOU WIN, VILLAIN HP -10%") : null;

          //set bar hero and villain HP from response
          setVillainHP(response.villainHP), setHeroHP(response.heroHP);

          //close modal and show alert when the fight is end
          response.heroHP == 0 || response.villainHP == 0 ? fightEndhandler(response.villainHP, response.heroHP) : null;

          //set final status battle, WIN or LOSE from response
          // response.heroHP == 0 ? setStatusBattle("YOU LOSE") : response.villainHP == 0 ? setStatusBattle("YOU WIN") : null;

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
        <div className="modal" style={{ backgroundImage: `linear-gradient(#b3b3b3b2, #ffffffb1),url(${imageSource})`, backgroundSize: "cover" }}>
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
                {/*  ------------------------------ Description Villain ------------------------------  */}
                <div className="villainAvatar">
                  <img src={dataVillain[0]?.imgSrc} alt="villain-avatar" />
                </div>
                <h3>- {dataVillain[0]?.name.toUpperCase()} -</h3>

                {/*  ----------------------------- HP Bar Villain -----------------------------  */}
                <div className="progress" style={{ maxWidth: `${villainHP}%` }}>
                  <p className="statusHP">{villainHP} %</p>
                  <div
                    className="villainHP progressBar"
                    style={
                      villainHP >= 70
                        ? { width: `${villainHP}%`, background: "repeating-linear-gradient(135deg, #fa68a2, #fa68a2 20px, #19baeb 20px, #19baeb 40px)" }
                        : villainHP >= 40
                        ? { width: `${villainHP}%`, background: "repeating-linear-gradient(135deg, #fab668, #fab668 20px, #ebc519 20px, #ebc519 40px)" }
                        : { width: `${villainHP}%`, background: "repeating-linear-gradient(135deg, #a80226, #a80226 20px, #ff3f39 20px, #ff3f39 40px)" }
                    }
                  ></div>
                </div>

                {/* ------------------------------ Battle Status -----------------------------  */}
                <div className="boxStatus">
                  <h2>{statusBattle}</h2>
                </div>

                {/*  ----------------------------- HP Bar Player -----------------------------  */}
                <div className="progress">
                  <p className="statusHP">{heroHP} %</p>
                  <div
                    className="playerHP progressBar"
                    style={
                      heroHP >= 70
                        ? { width: `${heroHP}%`, background: "repeating-linear-gradient(135deg, #fa68a2, #fa68a2 20px, #19baeb 20px, #19baeb 40px)" }
                        : heroHP >= 40
                        ? { width: `${heroHP}%`, background: "repeating-linear-gradient(135deg, #fab668, #fab668 20px, #ebc519 20px, #ebc519 40px)" }
                        : { width: `${heroHP}%`, background: "repeating-linear-gradient(135deg, #a80226, #a80226 20px, #ff3f39 20px, #ff3f39 40px)" }
                    }
                  ></div>
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
