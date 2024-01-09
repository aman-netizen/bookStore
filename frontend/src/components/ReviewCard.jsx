import React from "react";

// individual review card

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded p-6 m-2 w-4/5 whitespace-pre-line break-words">
      <div className="font-bold text-xl mb-2">{review.username}</div>
      <div className="text-gray-700 text-base whitespace-pre-line">
        {review.review}
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-sm text-gray-600">Rating:</span>
        <span className="ml-2 text-xl font-bold text-yellow-500">
          {review.rating}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
