import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import City from "./pages/city/City";
import Skill from "./pages/skill/Skill";
import Villains from "./pages/villains/Villains";
import PageNotFound from "./pages/404/PageNotFound";
// import LandingPage from "./pages/landingPage/LandingPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/city/:idCharacter/:nameCharacter" element={<City />} />
        <Route path="/skill/:idCharacter/:nameCharacter" element={<Skill />} />
        <Route path="/villains/:idCharacter/:nameCharacter/:nameCity" element={<Villains />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

ReactDOM.render(React.createElement(App), document.getElementById("root"));
