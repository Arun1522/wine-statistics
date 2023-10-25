import React from "react";
import Flavanoids from "./Components/Flavanoids";
import Gamma from "./Components/Gamma";

const App = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const marginStyle = {
    margin: "20px 0", // Adjust the margin as needed
  };
  return (
    <div style={containerStyle}>
      <h1>Wine Statistics</h1>
      <h4>Flavanoids</h4>
      <Flavanoids />
      <div style={marginStyle}></div>
      <h4>Gamma</h4>
      <Gamma />
    </div>
  );
};

export default App;
