import { Request, Response } from "express";
import Visitor from "../models/visitors_model";
import Web3 from "web3";
import moment from "moment";
import { promises } from "dns";
import web3 from "web3";

interface Visitor {
  name: string;
  email: string;
  address: string;
  phone: string;
  purpose: string;
  types: string;
  toMeet: string;
  meetPersonEmail: string;
  date: string;
}

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
    console.log("---transactionReceipt---", transactionReceipt);

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
    // const web3 = new Web3();
    // Connect to Ganache (similar to how you did in your frontend code)
    const web3 = new Web3("http://127.0.0.1:7545");
    // console.log("--web3Instrance--", web3Instance);

    const contractJson = require("/home/dev/blockchain/visitor-web/frontend/public/contracts/VisitorAuth.json");
    // console.log("--contractJson--", contractJson);

    const contractInstance = new web3.eth.Contract(
      contractJson.abi,
      "0x23F6c77273528b88A2595BfBb3DE5A1b35cB435c" // Contract address
    );
    // console.log("--contractInstance--", contractInstance);

    // Get accounts from Ganache
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    // console.log("Connected account:", account);

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
      .estimateGas({
        from: account,
        value: web3.utils.toWei("0.1", "ether"),
      });

    console.log("Gas---", gas);

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
        formattedData.date
      )
      .send({
        from: account,
        value: web3.utils.toWei("0.1", "ether"),
        gas: web3.utils.toHex(gas),
      });
    console.log("--transction--", transaction);

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
  try {
    const data = await Visitor.find();
    if (!data || data.length === 0) {
      res.status(404).json({ message: "No visitor data found!" });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const visitorData: Visitor[] = [];

async function getVisitorDataFromGanache(): Promise<Visitor[]> {
  try {
    const web3Instance = new Web3("http://127.0.0.1:7545");
    const contractJson = require("/home/dev/blockchain/visitor-web/frontend/public/contracts/VisitorAuth.json");
    const contractInstance = new web3Instance.eth.Contract(
      contractJson.abi,
      "0x23F6c77273528b88A2595BfBb3DE5A1b35cB435c" // Contract address
    );

    // Call the smart contract method to get visitor data
    const visitorData = await contractInstance.methods.getAllVisitors().call();
    if (!Array.isArray(visitorData)) {
      throw new Error("Invalid data returned from Ganache.");
    }

    // Return the visitor data
    return visitorData as Visitor[];
  } catch (error) {
    console.error("Error fetching visitor data from Ganache:", error);
    throw error;
  }
}

export const filterData = async (req: Request, res: Response) => {
  try {
    const { name, types, toMeet } = req.body;
    const visitorData = await getVisitorDataFromGanache();
    // console.log(visitorData);

    const visitorDataWithoutBigInt = visitorData.map((visitor: any) => {
      const visitorWithoutBigInt: any = {};
      for (const [key, value] of Object.entries(visitor)) {
        visitorWithoutBigInt[key] =
          typeof value === "bigint" ? value.toString() : value;
      }
      return visitorWithoutBigInt;
    });

    console.log("Visitor data without BigInt:", visitorDataWithoutBigInt);
    const filteredData = visitorDataWithoutBigInt.filter((visitor: any) => {
      try {
        if (!visitor) {
          return false;
        }

        let filterName = true;
        let filterTypes = true;
        let filterToMeet = true;

        if (name) {
          const visitorName = visitor.name.toLowerCase();
          filterName = visitorName.includes(name.toLowerCase());
        }

        if (types) {
          const visitorTypes = visitor.types.toLowerCase();
          filterTypes = visitorTypes.includes(types.toLowerCase());
        }

        if (toMeet) {
          const visitorToMeet = visitor.toMeet.toLowerCase();
          filterToMeet = visitorToMeet.includes(toMeet.toLowerCase());
        }

        return filterName && filterTypes && filterToMeet;
      } catch (error) {
        console.error("Error filtering visitor:", error);
        return false;
      }
    });
    const stringifiedData = JSON.parse(JSON.stringify(filteredData));

    res.status(200).json({ filteredData: stringifiedData });
  } catch (error) {
    console.error("Error filtering visitor data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const pagination = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page: number = parseInt(req.query.page as string) || 1; // Default to page 1
  const pageSize: number = parseInt(req.query.pageSize as string) || 10; // Default page size

  try {
    // Calculate skip count based on page number and page size
    const skip: number = (page - 1) * pageSize;

    // Fetch paginated data from the database
    const visitors = await Visitor.find().skip(skip).limit(pageSize);

    // Count total number of visitors for pagination metadata
    const totalVisitors: number = await Visitor.countDocuments();

    // Calculate total pages
    const totalPages: number = Math.ceil(totalVisitors / pageSize);

    res.json({
      visitors,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching paginated visitors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
