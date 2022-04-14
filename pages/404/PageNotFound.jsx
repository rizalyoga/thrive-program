import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <div className="container" style={{ marginTop: "45vh" }}>
      <h1 className="title-page">Oops, Page not Found !!!</h1>
    </div>
  );
}

export default PageNotFound;
