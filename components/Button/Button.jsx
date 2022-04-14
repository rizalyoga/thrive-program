import { useNavigate } from "react-router-dom";

export const GoesToCityButton = ({ characterId, characterName }) => {
  const navigate = useNavigate();

  const goToCity = () => {
    navigate(`/city/${characterId}/${characterName}`);
  };

  return (
    <button disabled={characterId ? false : true} id="visible-btn" className={characterId && "choose-btn"} onClick={goToCity}>
      Goes To City
    </button>
  );
};
