import React, {useState} from "react";
import { Principal } from "@dfinity/principal";

import {token_backend} from "../../../declarations/token_backend";

function Transfer() {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  async function handleClick() {
    setIsDisabled(true);

    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);
    const result = await token_backend.transfer(recipient, amountToTransfer);
    setFeedback(result);

    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={feedback === ""}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
