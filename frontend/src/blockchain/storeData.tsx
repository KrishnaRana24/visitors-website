"use client";
import Web3, { AbiItem } from "web3";
import { Contract } from "web3-eth-contract";
import React, { useEffect, useState } from "react";

interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract<AbiItem[]> | null>(null);
  const [data, setData] = useState<string>("");

  // Connect to Ganache on component mount
  useEffect(() => {
    const initializeWeb3 = async () => {
      const web3Instance = new Web3("http://localhost:7545");
      setWeb3(web3Instance);

      // Load contract ABI and address
      const contractJson = require("/public/contracts/VisitorAuth.json");
      const contractInstance = new web3Instance.eth.Contract(
        contractJson.abi,
        "0xa31Ec3f44B4cEadd336afB9Cb45de2E5E850dD39" // contract address
      );
      setContract(contractInstance);
    };

    initializeWeb3();
  }, []);

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!contract || !data) return;

    try {
      const accounts = await web3?.eth.getAccounts(); // Get user accounts
      await contract.methods.storeData(data).send({ from: accounts![0] }); // Send transaction to store data
      console.log("Data stored successfully on the blockchain.");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <div>
      <input type="text" value={data} onChange={handleDataChange} />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
};

export default MyComponent;
