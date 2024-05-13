"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DropdownUser from "./DropdownUser";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { Web3Provider } from "@ethersproject/providers";

interface HeaderProps {
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const router = useRouter();
  const { open } = useWeb3Modal();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const provider = await open();
        if (provider !== undefined) {
          // Proceed with the logic if the provider is not undefined
          setConnected(true);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };

    checkConnection();
  }, []);

  const connectMetaMask = async () => {
    try {
      const providerInstance: Web3Provider | void = await open();
      if (providerInstance !== undefined) {
        setConnected(true);
        setSignedIn(true);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  const handleSignIn = () => {
    setSignedIn(true);
  };

  const handleConnect = () => {
    if (!signedIn) {
      handleSignIn();
    } else {
      connectMetaMask();
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center"></div>

          <div className="hidden lg:flex gap-3 items-center">
            {connected && (
              <>
                <div>
                  <button
                    className="bg-blue-950 text-white rounded-full  hover:bg-blue-500 transition duration-300"
                    onClick={handleConnect}
                  >
                    <w3m-button />
                  </button>
                  <button
                    className="bg-blue-950 text-white rounded-full  hover:bg-blue-500 transition duration-300"
                    onClick={handleConnect}
                  >
                    <w3m-network-button />
                  </button>
                </div>
                <DropdownUser />
              </>
            )}

            {!connected && (
              <>
                <div>
                  <button
                    className="bg-blue-950 text-white rounded-full  hover:bg-blue-500 transition duration-300"
                    onClick={handleConnect}
                  >
                    <w3m-button />
                  </button>
                  <button
                    className="bg-blue-950 text-white rounded-full  hover:bg-blue-500 transition duration-300"
                    onClick={handleConnect}
                  >
                    <w3m-network-button />
                  </button>
                </div>

                <DropdownUser />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
