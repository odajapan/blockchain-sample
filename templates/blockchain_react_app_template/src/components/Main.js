import React from 'react'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const Main = () => {
  const { connectWallet, sendTransaction, handleChange, inputFormData } = 
    useContext(TransactionContext);

  const handleSubmit = () => {
    const {addressTo, amount} = inputFormData; // Destructuring assignment
    console.log(addressTo);
    console.log(amount);

    if(addressTo === "" || amount === "") {
        return;
    } else {
        sendTransaction();
    }
  };

  return (
   <div className="mainContainer">
       { /* Left */}
       <div className="cryptContainer">
           <h1 className="title">Crypt Card</h1>
          
           <button type="button">
               <p className="buttonText" onClick={connectWallet}>Connect Wallet</p>
           </button>
       </div>
       { /* Right */}
       <div className="inputContainer">
           <input 
            type="text" 
            placeholder="Address" 
            name="addressTo" 
            onChange={(e) => handleChange(e, "addressTo")} 
           />
           <input 
            type="number" 
            placeholder="Currency(ETH)" 
            name="amount" 
            step="0.0001" 
            onChange={(e) => handleChange(e, "amount")} 
           />
           <button type="button" onClick={handleSubmit}>Send</button>
       </div>
   </div>
 )
}
 
export default Main