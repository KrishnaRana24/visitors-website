// pages/welcome.tsx
"use client";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserWelcome = () => {
  //   const router = useRouter();

  // This effect will redirect the user to the home page after 5 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      //   router.push("/");
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up function to clear the timer in case component unmounts
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-8 bg-purple-200 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-4 text-purple-800">
          Welcome to our premises!
        </h1>
        <p className="text-gray-600 text-purple-600">
          You will get notification for meeting very shortly...
        </p>
      </div>
    </div>
  );
};

export default UserWelcome;
