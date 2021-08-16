import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cards } from "../data";
import { shufflingCards } from "../functions";
import { Cards } from "../types";

export interface CardState {
  cardList: Cards[];
  flippedCards: [] | number[];
  moves: number;
  cardsLeft: number;
}

const initialState: CardState = {
  cardList: (() => shufflingCards(cards.concat(cards)))(),
  flippedCards: [],
  moves: 0,
  cardsLeft: cards.length,
};

export const cardSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    flipTheCard: (state, action: PayloadAction<number>) => {
      state.cardList = state.cardList.map((card, indx) => {
        if (indx === action.payload) {
          state.flippedCards = [...state.flippedCards, state.cardList[indx].id];
          return {
            ...card,
            backFace: false,
          };
        } else {
          return card;
        }
      });
    },
    flipToBackface: (state, action: PayloadAction<number>) => {
      state.cardList = state.cardList.map((card, indx) => {
        if (indx === action.payload) {
          return { ...card, backFace: true };
        } else {
          return card;
        }
      });
      state.flippedCards = [];
      state.moves += 1;
    },
    checkPare: (state) => {
      let pare = state.flippedCards;
      if (pare[0] === pare[1]) {
        state.cardList = state.cardList.map((card) => {
          if (card.id === pare[0]) {
            return { ...card, remooved: true };
          } else {
            return card;
          }
        });
        state.cardsLeft -= 1;
      } else {
        state.cardList = state.cardList.map((card, indx) => ({
          ...card,
          backFace: true,
        }));
      }
      state.flippedCards = [];
      state.moves += 1;
    },
    restart: (state) => initialState,
  },
});

export const { flipTheCard, flipToBackface, checkPare, restart } =
  cardSlice.actions;

export default cardSlice.reducer;
