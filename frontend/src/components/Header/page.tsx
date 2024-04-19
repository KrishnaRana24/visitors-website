"use client";
import Link from "next/link";
import DropdownMessage from "./DropdownMessage";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/ethers/react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { open } = useWeb3Modal();
  const { setThemeMode } = useWeb3ModalTheme();

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

          <div className="hidden sm:block">
            {/* Search Bar */}
            <form className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none"
              />
              <button className="absolute left-2 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 fill-current text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  />
                </svg>
              </button>
            </form>
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
