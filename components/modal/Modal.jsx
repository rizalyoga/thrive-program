import React, { useState, useEffect } from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { getSelectedVillain, loadings } from "../../data/api";
import { useParams } from "react-router-dom";

const Modal = ({ setIsOpen, idVillain }) => {
  const [dataVillain, setDataVillain] = useState([]);
  const [playerHP, setPlayerHP] = useState(100);
  const [villainHP, setVillainHP] = useState();
  const [loading, setLoading] = useState();

  const { nameCharacter } = useParams();

  //Get Data Villain
  useEffect(() => {
    getSelectedVillain(idVillain)
      .then((response) => setDataVillain(response))
      .then(() => setLoading(false));
    setLoading(loadings);
  }, []);

  // Close Modal Handler
  const closeModal = () => {
    setIsOpen(false);
  };

  // Start Battle
  const startBattle = () => {
    alert("Bertarungan dimulai");
  };

  return (
    <>
      <div className="darkBG" onClick={closeModal} />
      <div className="centered">
        <div className="modal" style={{ backgroundImage: `linear-gradient(#b3b3b3b2, #ffffffb1),url(https://i.pinimg.com/originals/33/9f/b7/339fb7afe67658a9019f3b5cfb84ec19.jpg)`, backgroundSize: "cover" }}>
          <div className="modalHeader">
            <h5 className="heading">- Battle with {dataVillain[0]?.name.toUpperCase()} -</h5>
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
                <h3>- {dataVillain[0]?.name} -</h3>

                {/*  ----------------------------- HP Bar Villain -----------------------------  */}
                <div className="progress" style={villainHP ? { width: `${villainHP}` } : { width: `${dataVillain[0]?.maxHP}` + "%" }}>
                  <p className="statusHP">{villainHP ? `${villainHP}` : `${dataVillain[0]?.maxHP}`} %</p>

                  <div className="villainHP progressBar" style={villainHP ? { width: `${villainHP}` } : { maxWidth: `${dataVillain[0]?.maxHP}` + "%" }}></div>
                </div>

                <div className="boxStatus">
                  <h2>Ready</h2>
                </div>

                {/*  ----------------------------- HP Bar Player -----------------------------  */}
                <div className="progress">
                  <p className="statusHP">{playerHP} %</p>
                  <div className="playerHP progressBar" style={{ width: `${playerHP}` + "%" }}></div>
                </div>
                <h3>- {nameCharacter} -</h3>

                {/*  ----------------------------- Action Control -----------------------------  */}
                <div className="modalActions">
                  <div className="actionsContainer">
                    <button className="fightBtn" onClick={startBattle}>
                      Fight
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
