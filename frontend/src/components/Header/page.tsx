"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DropdownUser from "./DropdownUser";
import { useWeb3Modal } from "@web3modal/ethers/react";

interface HeaderProps {
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [connected, setConnected] = useState(false);
  const router = useRouter();
  const { open } = useWeb3Modal();

  useEffect(() => {
    open({ view: "Networks" });
  }, []);

  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    }
  }, [connected]);

  const handleConnect = async () => {
    try {
      await open({ view: "Networks" });
      setConnected(true);
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.setSidebarOpen);
              }}
              className="lg:hidden ml-auto -mr-2 p-1 rounded-sm border border-stroke bg-white shadow-sm"
            >
              <span className="block h-5 w-5 relative">
                <span className="absolute h-0.5 w-full bg-black transform rotate-45 -translate-y-1/2 top-1/2 transition duration-300 ease-in-out"></span>
                <span className="absolute h-0.5 w-full bg-black -rotate-45 transform translate-y-1/2 bottom-1/2 transition duration-300 ease-in-out"></span>
              </span>
            </button>
          </div>

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
                </div>
                <div>
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
              <div>
                <button
                  className="bg-blue-950 text-white rounded-full  hover:bg-blue-500 transition duration-300"
                  onClick={handleConnect}
                >
                  <w3m-button />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
