"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ExitPage: React.FC = () => {
  const router = useRouter();

  //   Redirect to home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("http://localhost:3000/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-purple-400 to-blue-500">
      <div className="text-8xl mb-4 text-white">&#128522;</div>
      {/* Smiley emoji */}
      {/* <div className="text-3xl mb-4 text-white">&#128077;</div>
      Thumb emoji */}
      <p className="mt-4 text-lg text-white text-center">
        Thank you for visiting! Come back soon.
      </p>
    </div>
  );
};

export default ExitPage;
