"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const OTPVerification = ({ email }: { email: string }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Focus on the first input box when component mounts
  }, []);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    try {
      const newOTP = [...otp];

      if (
        e.target.value === "" &&
        e.nativeEvent instanceof KeyboardEvent &&
        e.nativeEvent.key === "Backspace" &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }

      newOTP[index] = e.target.value;
      setOTP(newOTP);

      if (index < otp.length - 1 && e.target.value !== "") {
        inputRefs.current[index + 1]?.focus(); // Focus on the next input box if available
      }

      if (index === otp.length - 1) {
        // All OTP digits entered, trigger verification
        const enteredOTP = newOTP.join("");
        const response = await axios.post("http://localhost:8001/verifyOtp", {
          email: email,
          otp: enteredOTP,
        });
        console.log(response.data);
        // Handle response here, display appropriate messages to the user
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className=" bg-purple-200 p-8 rounded shadow-lg">
        <h2 className="text-black text-lg mb-4">
          Please check your email for otp
        </h2>
        <h1 className="text-black font-semibold mb-4">Enter OTP</h1>
        <div className="flex">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-3xl text-center text-black m-2 border border-purple-300 rounded focus:outline-none focus:border-purple-800"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              ref={(input) => {
                inputRefs.current[index] = input;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
