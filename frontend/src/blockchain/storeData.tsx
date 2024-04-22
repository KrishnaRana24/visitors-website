import Web3 from "web3";
import React from "react";

interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = () => {
  const [web3, setWeb3] = React.useState<Web3 | null>(null);
  const [contract, setContract] = React.useState<Web3.Contract | null>(null);
  const [data, setData] = React.useState<string>("");

  // Connect to Ganache on component mount
  React.useEffect(() => {
    const initializeWeb3 = async () => {
      const web3Instance = new Web3("http://localhost:7545");
      setWeb3(web3Instance);

      // Replace 'YourContract.json' with your contract's JSON file
      const contractJson = require("./VisitorAuth.json");
      const contractInstance = new web3Instance.eth.Contract(
        contractJson.abi,
        "0xa31Ec3f44B4cEadd336afB9Cb45de2E5E850dD39"
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
      const accounts = await web3.eth.getAccounts();
      await contract.methods.storeData(data).send({ from: accounts[0] });

      console.log("Data stored successfully.");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <div>
      <input type="text" value={data} onChange={handleDataChange} />
      <button onClick={handleButtonClick}>Store Data</button>
    </div>
  );
};

export default MyComponent;
