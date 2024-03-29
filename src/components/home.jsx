import React, { useState, useEffect } from "react";
import "./home.scss";
import logoImg from "./images/logo.svg";
import dolarIcon from "./images/icon-dollar.svg";
import personIcon from "./images/icon-person.svg";

const Home = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [tipAmount, setTipAmount] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [customTipPercent, setCustomTipPercent] = useState("");
  const [billInputError, setBillInputError] = useState(false);
  const [numOfPeopleinputError, setNumOfPeopleinputError] = useState(false);

  const handleBillInputChange = (e) => {
    if (!billAmount) {
      setBillInputError(false);
    }

    setBillAmount(e.target.value);
    console.log(e.target.value);
  };

  const handlePeopleInputChange = (e) => {
    if (!numOfPeople) {
      setNumOfPeopleinputError(false);
    }
    setNumOfPeople(e.target.value);
  };

  useEffect(() => {
    const calculateTipAmount = () => {
      const bill = Number(billAmount);
      const percent = Number(tipPercent);
      const tipAmount = (bill * percent) / 100;
      setTipAmount(tipAmount.toFixed(2));
    };
    const calculateTotalAmount = () => {
      const totalAmount =
        Number(billAmount) / Number(numOfPeople) + Number(tipAmount);
      if (isNaN(totalAmount)) return;
      if (!isFinite(totalAmount)) return;
      setTotalAmount(totalAmount.toFixed(2));
    };

    calculateTipAmount();
    calculateTotalAmount();
  }, [billAmount, numOfPeople, tipAmount, tipPercent, customTipPercent]);

  const handleTipButtonClick = (percent) => {
    if (!billAmount.trim()) {
      setBillInputError(true);
    }
    if (!numOfPeople.trim()) {
      setNumOfPeopleinputError(true);
    } else {
      setBillInputError(false);
      setNumOfPeopleinputError(false);
    }

    setTipPercent(percent);
  };

  const handleCustomInputChange = (e) => {
    const customPercent = e.target.value;
    setCustomTipPercent(customPercent);

    // Check if the entered value is a valid number
    if (!isNaN(customPercent)) {
      setTipPercent(Number(customPercent));
    }
  };

  const handleResetClick = () => {
    setNumOfPeopleinputError(false);
    setBillInputError(false);
    setBillAmount("");
    setTipPercent("");
    setNumOfPeople("");
    setTipAmount("0.00");
    setTotalAmount("0.00");
    setCustomTipPercent("");
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
                {billInputError && (
                  <p className="error-message">can't be zero</p>
                )}
                <input
                  className={`input bill-input ${
                    billInputError ? "error" : ""
                  }`}
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
                      value={customTipPercent}
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
                {numOfPeopleinputError && (
                  <p className="error-message">can't be zero</p>
                )}
                <input
                  className={`input people-input ${
                    numOfPeopleinputError ? "error" : ""
                  }`}
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
