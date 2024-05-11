// components/RatingStars.tsx
"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingStarsProps {
  onChange: (rating: number) => void;
  initialRating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  onChange,
  initialRating,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (star: number) => {
    setRating(star);
    onChange(star);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            onClick={() => handleStarClick(starValue)}
            className={
              rating >= starValue ? "text-purple-900" : "text-purple-300"
            }
            size={24}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
