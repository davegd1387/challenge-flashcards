import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addQuizId } from "../topics/topicsSlice"
// import { useDispatch } from 'react-redux'

export const newQuizThunk =  (quiz) => {
  return (dispatch) => {
      dispatch(addQuiz(quiz))
      dispatch(addQuizId(quiz))
  }
}

const quizOptions = {
    name: 'quizzes',
    initialState: {
      quizzes:{},
    },
    reducers: {
        addQuiz(state, action) {
          const {id, name, topicId, cardIds} = action.payload;
          state.quizzes[id] = {
            id,
            name,
            topicId,
            cardIds,
          };
        },
      },
    // extraReducers: {}
  }
  
  export const quizzesSlice = createSlice(quizOptions)
  export const selectQuizzes = state => state.quizzes.quizzes;
  export const {addQuiz} = quizzesSlice.actions;
  export default quizzesSlice.reducer;
  
  