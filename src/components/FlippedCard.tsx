import React, { useEffect } from "react";
import { flipToBackface } from "../redux/cardSlice";
import { useAppDispatch } from "../redux/hooks";
import { Cards } from "../types";

interface CompProps {
  card: Cards;
  indx: number;
}

const FlippedCard: React.FC<CompProps> = ({ card, indx }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (!card.backFace) {
      timer = setTimeout(() => dispatch(flipToBackface(indx)), 5000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  return (
    <div className="card-face card-font-face">
      <img src={card.image} alt={card.name} />
    </div>
  );
};

export default FlippedCard;
