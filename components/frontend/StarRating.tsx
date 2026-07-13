import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 20,
  className = "text-[#F59E0B]",
}: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <div key={i} className="relative" style={{ width: size, height: size }}>
            <FaRegStar className="absolute inset-0" style={{ width: size, height: size }} />
            <div
              className="absolute top-0 left-0 overflow-hidden h-full"
              style={{ width: `${fill * 100}%` }}
            >
              <FaStar style={{ width: size, height: size }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
