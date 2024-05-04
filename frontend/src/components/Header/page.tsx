"use client";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/ethers/react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { open } = useWeb3Modal();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
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
            {/* Web3Modal Buttons */}
            <div>
              <button
                // className="bg-olive-500 text-white rounded-full px-4 py-2 hover:bg-olive-600 transition duration-300"
                className="bg-blue-950 text-white rounded-full  hover:bg-blue-500 transition duration-300"
                onClick={() => open()}
              >
                <w3m-button />
              </button>
            </div>
            <div>
              <button
                className="bg-blue-950 text-white rounded-full  hover:bg-blue-500 transition duration-300"
                onClick={() => open({ view: "Networks" })}
              >
                <w3m-network-button />
              </button>
            </div>
            {/* Chat Notification Area */}
            {/* <DropdownMessage /> */}
            {/* User Area */}
            <DropdownUser />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
