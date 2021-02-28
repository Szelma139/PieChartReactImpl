import logo from "./logo.svg";
import "./App.css";
import { WelcomePage } from "./pages/WelcomePage";
import { Card } from "./Card";
import { CreditCard } from "./CreditCard/CreditCard";

import React from "react";
import { usteState } from "react";
import { TextLineThrough } from "./TextLineThrough";
import { CreditCardUI } from "./CreditCardUI";
import { UserCard } from "./UserCard";
import { PieChart } from "./PieChart";

function App() {
  const [value, setValue] = React.useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="App">
      <div style={{ marginLeft: "2rem", marginTop: "2rem" }}>
      <PieChart initialValues={[230, 308, 520, 130, 200]}/>
      </div>
      {/* <CreditCardUI/> */}
      {/* <div class="slidecontainer">
        <input
          type="range"
          min="0"
          max="200"
          onChange={handleChange}
          value={value}
          class="slider"
          id="myRange"
        />
        <p>Value: {value} </p>
        <div className="through">
          <TextLineThrough
            leftCrossPercentage={value}
            rightCrossPercentage={value}
            crossedText="Ala ma kota"
          />
        </div>
      </div> */}
    </div>
  );
}

export default App;
