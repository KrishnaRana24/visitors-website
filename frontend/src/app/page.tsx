import HeroSection from "@/components/HeroSection/page";

import VisitorAuth from "./userSignup/page";
import HomePage from "@/components/Home/page";
import { Provider } from "react-redux";
import { Web3Modal } from "@/context/web3modal";
import dotenv from "dotenv";

dotenv.config();

export default function Home() {
  return (
    <>
      {/* <VisitorAuth /> */}
      {/* <HeroSection /> */}
      <HomePage />
    </>
  );
}
