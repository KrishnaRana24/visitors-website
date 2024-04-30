import { Request, Response } from "express";
import Visitor from "../models/visitors_model";
import Web3 from "web3";
import moment from "moment";

export const visitorSign = async (req: Request, res: Response) => {
  try {
    const { date, ...rest } = req.body;
    const formattedDate = moment(date, "DD-MM-YYYY").toDate();
    // const visitorData = req.body;
    const visitor = new Visitor({ ...rest, date: formattedDate });

    const create = await visitor.save();
    // console.log(create);

    // Once data is stored in MongoDB, trigger the Ganache transaction
    const transactionReceipt = await triggerGanacheTransaction(create);

    const transactionReceiptString = JSON.stringify(
      transactionReceipt.toString()
    );
    // console.log("---transactionReceipt---", transactionReceipt);

    res
      .status(201)
      .json({ create, transactionReceipt: transactionReceiptString });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

async function triggerGanacheTransaction(visitorData: any) {
  try {
    // Connect to Ganache (similar to how you did in your frontend code)
    const web3Instance = new Web3("http://127.0.0.1:7545");
    // console.log("--web3Instrance--", web3Instance);

    const contractJson = require("/home/dev/blockchain/visitor-web/frontend/public/contracts/VisitorAuth.json");
    // console.log("--contractJson--", contractJson);

    const contractInstance = new web3Instance.eth.Contract(
      contractJson.abi,
      "0x46fa8C6Ab96011c16D5f274074E1a6d1D778c804" // Contract address
    );
    // console.log("--contractInstance--", contractInstance);

    // Get accounts from Ganache
    const accounts = await web3Instance.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found.");
    }
    // console.log("--account--", accounts);

    // Convert visitor data to suitable format for Ganache transaction
    const formattedData = {
      name: visitorData.name,
      email: visitorData.email,
      add: visitorData.add,
      phone: visitorData.phone,
      purpose: visitorData.purpose,
      types: visitorData.types,
      toMeet: visitorData.toMeet,
      meetPersonemail: visitorData.meetPersonemail,
      date: formatDateToUnixTimestamp(visitorData.date),
    };
    console.log("formattedData===", formattedData);

    const gas = await contractInstance.methods
      .registerVisitor(
        formattedData.name,
        formattedData.email,
        formattedData.add,
        formattedData.phone,
        formattedData.purpose,
        formattedData.types,
        formattedData.toMeet,
        formattedData.meetPersonemail,
        formattedData.date,
        "0x0000000000000000000000000000000000000000"
      )
      .estimateGas({ from: accounts[0] });

    const gasLimit: string = gas.toString();

    // Trigger transaction to store data in Ganache
    const transaction = await contractInstance.methods
      .registerVisitor(
        formattedData.name,
        formattedData.email,
        formattedData.add,
        formattedData.phone,
        formattedData.purpose,
        formattedData.types,
        formattedData.toMeet,
        formattedData.meetPersonemail,
        formattedData.date,
        "0x0000000000000000000000000000000000000000" // Assuming you don't need visitorAddress for Ganache
      )
      .send({ from: accounts[0], gas: gasLimit });
    // console.log("--transction--", transaction);

    console.log("Data stored successfully on Ganache.");
    return transaction;
  } catch (error) {
    console.error("Error storing data in Ganache:", error);
    throw error;
  }
}
function formatDateToUnixTimestamp(unixTimestamp: number): number {
  return Math.floor(unixTimestamp / 1000); // Convert milliseconds to seconds
}
// function formatDateToUnixTimestamp(dateString: string): number {
//   if (typeof dateString !== "string") {
//     throw new Error("Invalid date format: dateString is not a string");
//   }

//   const parts = dateString.split(" ");
//   if (parts.length !== 3) {
//     throw new Error(
//       "Invalid date format: dateString does not contain day/month/year"
//     );
//   }

//   const [day, month, year] = parts;
//   const date = new Date(`${year}-${month}-${day}`); // Construct date in yyyy-mm-dd format
//   return Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds
// }
