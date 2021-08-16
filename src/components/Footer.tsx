import React, { useEffect, useState } from "react";
import { restart } from "../redux/cardSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Footer = () => {
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")!)
  );
  const moves = useAppSelector((state) => state.cards.moves);
  const cardsLeft = useAppSelector((state) => state.cards.cardsLeft);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardsLeft === 0) {
      alert(`Вы завершили игру за ${moves} ходов.`);
      if (!bestScore || bestScore > moves) {
        localStorage.setItem("bestScore", `${moves}`);
      }
      dispatch(restart());
    }
  }, [cardsLeft]);

  return (
    <footer>
      <div className="score">
        <div className="moves">
          <span className="bold">ходы: </span> {moves}
        </div>
        {localStorage.getItem("bestScore") && (
          <div className="high-score">
            <span className="bold">рекорд:</span> {bestScore}
          </div>
        )}
      </div>
      <div className="restart">
        <button onClick={() => dispatch(restart())}>Обновить</button>
      </div>
    </footer>
  );
};

export default Footer;
