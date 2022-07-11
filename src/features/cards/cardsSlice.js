import { createSlice } from "@reduxjs/toolkit";

const cardOptions = {
    name: 'cards',
    initialState: {
      cards:{},
    },
    reducers: {
        addCard(state, action) {
          const {id, front, back} = action.payload;
          state.cards[id] = {
            id,
            front,
            back,
          };
        },
    
      },
    
  }
  
  export const cardsSlice = createSlice(cardOptions)
  export const selectCards = state => state.cards.cards;
  export const {addCard} = cardsSlice.actions;
  export default cardsSlice.reducer;