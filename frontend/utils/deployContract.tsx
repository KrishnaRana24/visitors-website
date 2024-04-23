import fs from "fs";
import Web3 from "web3";

const compileContract = (sourceCode: string) => {
  const input = {
    language: "Solidity",
    sources: {
      "VisitorAuth.sol": {
        content: sourceCode,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  const solc = require("solc"); // Import solc here to avoid TypeScript error
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  return {
    abi: output.contracts["VisitorAuth.sol"]["VisitorAuth"].abi,
    bytecode:
      output.contracts["VisitorAuth.sol"]["VisitorAuth"].evm.bytecode.object,
  };
};

// Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");

// Read the Solidity source code
const sourceCode = fs.readFileSync("VisitorAuth.sol", "utf8");

// Compile the Solidity code
const { abi, bytecode } = compileContract(sourceCode);

// Deploy the contract
const deployContract = async () => {
  // Get the accounts from Ganache
  const accounts = await web3.eth.getAccounts();

  // Create a contract instance
  const contract = new web3.eth.Contract(abi as any);

  // Deploy the contract
  const deployedContract = await contract
    .deploy({
      data: bytecode as string,
      arguments: [
        /* constructor arguments if any */
      ],
    })
    .send({
      from: accounts[0], // Use the first account from Ganache
      gas: "6721975", // Gas limit
    });

  console.log("Contract deployed at:", deployedContract.options.address);
};

deployContract();
