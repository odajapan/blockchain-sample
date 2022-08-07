import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/connect";

export const TransactionContext = createContext();

const { ethereum } = window;

// get SmartContract: 
// note: compile .sol file -> ABI(.json) -> utils/connect.js -> context/*Context.js -> components/Main.js
const getSmartContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer= provider.getSigner();
    const smartContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    )
    console.log(provider, signer, smartContract);

    return smartContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [inputFormData, setInputFormData] = useState({
        addressTo: "",
        amount: "",
    });

    const handleChange = (e, name) => {
        setInputFormData((prevInputFormData) => ({
            ...prevInputFormData,   // ... Destructuring assignment
            [name]: e.target.value,
        }));
    }

    // メタマスクウォレットと連携しているか確認
    const checkMetaMaskWalletConnected = async () => {
        if (!ethereum) return alert("Please install MetaMask");

        // メタマスクのアカウントIDを取得
        const accounts = await ethereum.request({method: "eth_accounts"});
        console.log(accounts);
        setCurrentAccount(accounts[0]);
    };

    // MetaMask Walletと連携する
    const connectWallet = async () =>{
        if (!ethereum) return alert("Please install MetaMask");

        // メタマスクを持っていれば接続を開始する
        // https://docs.metamask.io/guide/getting-started.html#basic-considerations
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts[0]);
    };

    // Send Currency
    const sendTransaction = async () => {
        if (!ethereum) return alert("Please install MetaMask");
        console.log("sendTransaction");

        const transactionContract = getSmartContract();
        const {addressTo, amount} = inputFormData; // Destructuring assignment
        const parsedAmount = ethers.utils.parseEther(amount);
        
        // https://docs.metamask.io/guide/sending-transactions.html
        


        const transactionParameters = {
            gas: '0x2710',            // customizable by user during MetaMask confirmation.
            to: addressTo,            // Required except during contract publications.
            from: currentAccount,     // must match user's active address.
            value: parsedAmount._hex, // Only required to send ether to the recipient from the initiating external account.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        console.log(txHash);

        // addToBlockChain: defined in Transactions.sol.
        const transactionHash = await transactionContract.addToBlockChain(
            addressTo,
            parsedAmount
        );
        console.log(`loading...${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Sccuessfully send ETH. ${transactionHash.hash}`)
    };
    

    // react hooks https://ja.reactjs.org/docs/hooks-intro.html
    useEffect(() => {
        checkMetaMaskWalletConnected();
    }, []);

    return (<TransactionContext.Provider value={{ connectWallet, sendTransaction, handleChange, inputFormData }}>
        {children}
    </TransactionContext.Provider>)
};