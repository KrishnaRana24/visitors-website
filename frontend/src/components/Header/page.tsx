"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DropdownUser from "./DropdownUser";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { Web3Provider } from "@ethersproject/providers";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const router = useRouter();
  const { open: openWeb3Modal } = useWeb3Modal(); // Rename open to openWeb3Modal to avoid conflicts

  const trigger = useRef<HTMLButtonElement>(null);

  const openModalIfNotConnected = async () => {
    if (!connected) {
      try {
        const provider = (await openWeb3Modal()) as unknown as Web3Provider;
        if (provider) {
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          const network = await provider.getNetwork();
          setConnected(true);
          setAccount(account);
          setNetwork(network.name);
          setSignedIn(true);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error connecting:", error);
      }
    }
  };

  const handleConnect = () => {
    openModalIfNotConnected();
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={!!sidebarOpen}
            className="block bg-red-900"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <div className="flex items-center">
            {connected && account && network && (
              <div className="text-white">
                <p>Account: {account}</p>
                <p>Network: {network}</p>
              </div>
            )}
          </div>

          <div className="hidden lg:flex gap-3 items-center">
            <div>
              <button
                className="bg-blue-950 text-white rounded-full hover:bg-blue-500 transition duration-300"
                onClick={handleConnect}
              >
                <w3m-account-button />
              </button>
              {/* Add other buttons as needed */}
            </div>
            <DropdownUser />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
