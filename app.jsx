import React from "react";
import ReactDOM from "react-dom";
import { dataCharacter } from "./data";

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

const Card = ({ dataCharacter }) => {
  const { imageProfile, name, city, age } = dataCharacter;

  return (
    <div className="card">
      <img className="image" src={imageProfile} alt="avatar" />
      <h1>{name}</h1>
      <h2>{age}</h2>
      <h3>{city}</h3>
    </div>
  );
};

const App = () => {
  return (
    <div className="container">
      {dataCharacter.map((data) => (
        <Card dataCharacter={data} key={data.id} />
      ))}
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
