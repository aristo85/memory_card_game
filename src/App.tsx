import Card from "./components/Card";
import "./styles/App.scss";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { checkPare } from "./redux/cardSlice";
import Footer from "./components/Footer";

function App() {
  const cardList = useAppSelector((state) => state.cards.cardList);
  const flippedCards = useAppSelector((state) => state.cards.flippedCards);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (flippedCards && flippedCards.length === 2) {
      setTimeout(() => {
        dispatch(checkPare());
      }, 300);
    }
  }, [flippedCards]);

  return (
    <div className="App">
      <header>
        <h3>Игра "Память"</h3>
        <div>
          Последовательно выберите две карты с одинаковым содержанием, чтобы они
          исчезли
        </div>
      </header>
      <div className="container">
        {cardList.length > 0 &&
          cardList.map((card, indx) => {
            return card.remooved ? (
              <div key={indx}></div>
            ) : (
              <Card
                card={card}
                key={indx}
                indx={indx}
                backFace={card.backFace}
              />
            );
          })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
