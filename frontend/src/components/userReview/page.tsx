"use client";
import { useState } from "react";
import axios from "axios";
import RatingStars from "../RatingStar/page";
import { useRouter } from "next/navigation";

const UserReview: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/review/addReview",
        {
          name,
          email,
          rating,
          comment,
        }
      );
      console.log("Response:", response.data);
      setName("");
      setEmail("");
      setRating(0);
      setComment("");
      router.push("/exitpage");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-black m-10 flex justify-center items-center flex-col w-600">
      <div className="max-w-md w-full bg-purple-200 p-10 rounded shadow-md">
        <div className="container mx-auto mt-10">
          <h3 className="text-2xl font-bold mb-6 text-center text-purple-950">
            Can you please give your valuable review
          </h3>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-purple-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium  text-purple-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium  text-purple-900"
              >
                Rating
              </label>
              <RatingStars onChange={setRating} initialRating={rating} />
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium  text-purple-900"
              >
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-purple-500"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-purple-800 text-white py-2 px-4 rounded-md ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
