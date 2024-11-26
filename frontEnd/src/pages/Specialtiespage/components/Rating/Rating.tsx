import { useState } from "react";
import styles from "./Rating.module.css";
const { inputStyle,parentRating } = styles;
export default function Rating() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const totalStars = 5;

  return (
    <div className={parentRating}>
      <div>
        {[...Array(totalStars)].map((star, index) => {
          const currentRating: number = index + 1;
          return (
            <span
            key={index} 
              className={`bi bi-star-fill  ${inputStyle}`}
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
            />
          );
        })}
      </div>
    </div>
  );
}


