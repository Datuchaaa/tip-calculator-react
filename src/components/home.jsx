import React, { useState } from "react";
import "./home.scss";
import logoImg from "./images/logo.svg";
import dolarIcon from "./images/icon-dollar.svg";
import personIcon from "./images/icon-person.svg";

const Home = () => {
  const [billAmount, setBillAmount] = useState();
  const [tipPercent, setTipPercent] = useState();
  const [numOfPeople, setNumOfPeople] = useState();
  const [tipAmount, setTipAmount] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");

  const calculateTipAmount = () => {
    const tipAmount = (billAmount * tipPercent) / 100;
    return tipAmount * numOfPeople || 0;
  };

  const calculateTotalAmount = () => {
    const totalAmount = (billAmount + calculateTipAmount()) / numOfPeople || 0;
    return totalAmount.toFixed(2);
  };

  const handleBillInputChange = (e) => {
    setBillAmount(e.target.value);
    console.log(e.target.value);
  };

  const handlePeopleInputChange = (e) => {
    setNumOfPeople(e.target.value);
    console.log(e.target.value);
  };

  const handleTipButtonClick = (percent) => {
    setTipPercent(percent);
    setTipAmount(calculateTipAmount);
    console.log(percent);
  };

  const handleCustomInputChange = (e) => {
    setTipPercent(e.target.value);
    console.log(e.target.value);
  };

  const handleResetClick = () => {
    setBillAmount(0);
    setTipPercent(0);
    setNumOfPeople(0);
    setTipAmount("0.00");
  };

  return (
    <div>
      <main className="main">
        <header className="img">
          <img src={logoImg} alt="" />
        </header>
        <div className="app">
          <div className="bill">
            <div className="money-input">
              <div className="input-bill user-input-bill">
                <label>Bill</label>
                <img className="icon-dollar" src={dolarIcon} alt="dolar icon" />
                <input
                  className="input bill-input"
                  placeholder="0"
                  value={billAmount}
                  onChange={handleBillInputChange}
                />
              </div>
              <div className="tip-wrapper">
                <label>Select Tip %</label>
                <div className="percents">
                  {[5, 10, 15, 25, 50].map((percent) => (
                    <button
                      key={percent}
                      className="percent-btn"
                      onClick={() => handleTipButtonClick(percent)}
                    >
                      {percent}%
                    </button>
                  ))}
                  <div className="custom">
                    <input
                      className="custom custom-input"
                      placeholder="Custom"
                      value={tipPercent}
                      onChange={handleCustomInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="person-input user-input-people">
                <label>Number of People</label>
                <img
                  className="icon-person"
                  src={personIcon}
                  alt="person icon"
                />
                <input
                  className="input people-input"
                  placeholder="0"
                  onChange={handlePeopleInputChange}
                  value={numOfPeople}
                />
              </div>
            </div>
          </div>
          <div className="amounts">
            <div className="tip-amount">
              <div className="tip-title">
                <p>Tip Amount</p>
                <span>/ person</span>
              </div>
              <div className="money">
                $<span className="money tip-money">{tipAmount}</span>
              </div>
            </div>
            <div className="total-amount">
              <div className="total-title">
                <p>Total</p>
                <span>/ person</span>
              </div>
              <div className="money">
                $<span className="money total-money">{totalAmount}</span>
              </div>
            </div>
            <button className="reset-btn" onClick={handleResetClick}>
              RESET
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
