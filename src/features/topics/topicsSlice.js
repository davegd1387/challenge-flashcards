import { createSelector, createSlice } from "@reduxjs/toolkit";


const topicOptions = {
    name: 'topics',
    initialState: {
      topics:{},
    },
    reducers: {
        addTopic(state, action) {
          const {id, name, icon} = action.payload;
          state.topics[id] = {
            id,
            name,
            icon,
            quizIds: [],
          };
        },

        addQuizId(state, action) {
          const {id, topicId} = action.payload;
          
          state.topics[topicId].quizIds.push(id);
        },
      },
    // extraReducers: {}
  }
  
  export const topicsSlice = createSlice(topicOptions)
  export const selectTopics = state => state.topics.topics;
  export const {addTopic, addQuizId} = topicsSlice.actions;
  export default topicsSlice.reducer;
  
  