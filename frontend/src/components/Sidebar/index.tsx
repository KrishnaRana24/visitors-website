"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loader from "../loader/page";
import { FiMenu } from "react-icons/fi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(false); // State to manage highlight effect

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = "true"; // Consider changing this to localStorage value

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!trigger.current) return;
      if (trigger.current.contains(target as Node)) {
        // Toggle sidebarOpen state when clicking on the toggle button
        setSidebarOpen(!sidebarOpen);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (sidebarOpen) {
      trigger.current?.setAttribute("aria-expanded", "true");
    } else {
      trigger.current?.setAttribute("aria-expanded", "false");
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const handleClickNextComponent = () => {
    setLoading(true);
    setHighlighted(true);
    setTimeout(() => {
      setLoading(false);
      setHighlighted(false);
    }, 2000);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 h-screen w-72.5 flex flex-col bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo1.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebarOpen state
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="mt-8">
          <div className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                (pathname === "/dashboard" || pathname.includes("dashboard")) &&
                "bg-graydark dark:bg-meta-4"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/tables/tableOne"
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                (pathname === "/tables/tableOne" ||
                  pathname.includes("/tables/tableOne")) &&
                "bg-graydark dark:bg-meta-4"
              }`}
            >
              Visitor Table
            </Link>
            <Link
              href="/tables/tableTwo"
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                (pathname === "/tables/tableTwo" ||
                  pathname.includes("/tables/tableTwo")) &&
                "bg-graydark dark:bg-meta-4"
              }`}
            >
              Reviewer Table
            </Link>
            <Link
              href="/settings"
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                (pathname === "/settings" || pathname.includes("/settings")) &&
                "bg-graydark dark:bg-meta-4"
              }`}
            >
              Setting
            </Link>
          </div>
          {/* Dropdown menu */}
          <div className="relative mt-4">
            <button
              onClick={toggleDropdown}
              className="flex justify-between items-center w-full px-6 py-2 text-white hover:text-white focus:outline-none"
            >
              <span>Charts</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 transition-transform ${
                  dropdownOpen ? "transform rotate-360" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3.879l-7.061 7.06a1 1 0 101.414 1.414L10 6.707l5.657 5.656a1 1 0 001.414-1.414L10 3.88z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 z-10 mt-1 bg-gray-900 text-white rounded-md shadow-lg">
                <Link
                  href="/chart/chartOne"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/chart/chartOne" ||
                      pathname.includes("/chart/chartOne")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  Monthly Chart
                </Link>
                <Link
                  href="/chart/chartTwo"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/chart/chartTwo" ||
                      pathname.includes("/chart/chartTwo")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  Weekly Chart
                </Link>
                <Link
                  href="/chart/chartThree"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/chart/chartThree" ||
                      pathname.includes("/chart/chartThree")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  Visitors Analytics
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      <footer className="flex justify-center py-6 lg:hidden">
        <button
          onClick={handleClickNextComponent}
          className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
            highlighted ? "ring-2 ring-white" : ""
          }`}
        >
          Next Component
        </button>
      </footer>

      {loading && <Loader />}
    </aside>
  );
};

export default Sidebar;
