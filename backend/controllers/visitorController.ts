import { Request, Response } from "express";
import Visitor from "../models/visitors_model";
import Web3 from "web3";
import moment from "moment";

export const visitorSign = async (req: Request, res: Response) => {
  try {
    const { date, ...rest } = req.body;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    // const visitorData = req.body;
    const visitor = new Visitor({ ...rest, date: formattedDate });

    const create = await visitor.save();

    // Once data is stored in MongoDB, trigger the Ganache transaction
    const transactionReceipt = await triggerGanacheTransaction(create);

    const transactionReceiptString = JSON.stringify(
      transactionReceipt.toString()
    );
    // console.log("---transactionReceipt---", transactionReceipt);

    res.status(201).json({
      visitorId: create._id,
      create,
      transactionReceipt: transactionReceiptString,
    });
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
      "0x008e94D6D6282575b55e5d464B55d595C8140449" // Contract address
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
      date: formatDateToUnixTimestamp(visitorData.date).toString(),
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
  return Math.floor(unixTimestamp / 1000).valueOf(); // Convert milliseconds to seconds
}

export const getVisitorData = async (req: Request, res: Response) => {
  let data;
  try {
    data = await Visitor.find();
  } catch (error) {
    console.error("error to dispaly visitor data", error);
  }
  if (!data) {
    return res.status(400).json({ message: "no visitor data found!!" });
  }
  return res.status(200).json({ data });
};

// export const getVisitorData = async (req: Request, res: Response) => {
//   let data;
//   try {
//     const { year, month, week } = req.query;

//     const queryConditions: any = {};

//     if (year) {
//       queryConditions.year = year;
//     }
//     console.log("year---", year);

//     if (month) {
//       queryConditions.month = month;
//     }
//     console.log("month---", month);

//     if (week) {
//       queryConditions.week = week;
//     }
//     console.log("week---", week);
//     // data = await Visitor.find();
//     data = await Visitor.find(queryConditions);
//   } catch (error) {
//     console.error("Error fetching visitor data:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }

//   if (!data || data.length === 0) {
//     return res.status(404).json({ message: "No visitor data found" });
//   }

//   return res.status(200).json({ data });
// };
