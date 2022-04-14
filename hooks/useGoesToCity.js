import { useNavigate } from "react-router-dom";

const useGoesToCity = (idCharacter) => {
  const navigate = useNavigate();
  if (idCharacter) {
    navigate(`/city/${idCharacter}`);
  }
};

export default useGoesToCity;
