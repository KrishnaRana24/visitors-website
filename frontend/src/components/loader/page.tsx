import React, { ReactNode } from "react";

interface LoaderProps {
  children: ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ children }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent">
        {children}
      </div>{" "}
    </div>
  );
};

export default Loader;
