import React, {useState} from "react";
import { Principal } from "@dfinity/principal";

import {token_backend} from '../../../declarations/token_backend';

function Balance() {
  const [inputValue, setInputValue] = useState("");
  const [balance, setBalance] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balanceResult = await token_backend.balanceOf(principal);
    const symbolResult = await token_backend.getSymbol();

    setBalance(balanceResult.toLocaleString());
    setCurrencySymbol(symbolResult);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={balance === ""}>This account has a balance of {balance} {currencySymbol}.</p>
    </div>
  );
}

export default Balance;
