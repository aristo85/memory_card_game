import React from "react";
import { Cards } from "../types";
import "../styles/card.scss";
import { useAppDispatch } from "../redux/hooks";
import { flipTheCard } from "../redux/cardSlice";
import FlippedCard from "./FlippedCard";

interface CompProps {
  card: Cards;
  indx: number;
  backFace: boolean;
}

const Card: React.FC<CompProps> = React.memo(
  ({ card, indx, backFace }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
      dispatch(flipTheCard(indx));
    };

    return (
      <div
        className={!backFace ? "card is-flipped" : "card"}
        onClick={handleClick}
      >
        {backFace ? (
          <div className="card-face card-back-face">
            <img
              src={require(`../images/card_back.png`).default}
              alt="card_back"
            />
          </div>
        ) : (
          <FlippedCard card={card} indx={indx} />
        )}
      </div>
    );
  },
  (prev, curr) => prev.backFace === curr.backFace
);

export default Card;
