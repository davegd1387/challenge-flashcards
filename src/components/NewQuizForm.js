import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { selectTopics } from "../features/topics/topicsSlice"
import { newQuizThunk, selectQuizzes } from "../features/quizzes/quizzesSlice"
import { addCard } from "../features/cards/cardsSlice"

import { useSelector, useDispatch } from 'react-redux'
import Error from "./Error";


export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  let { topId } = useParams();
  const [topicId, setTopicId] = useState(topId);
  const [error, setError] = useState('');
  const history = useHistory();
  
  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes);
  const dispatch = useDispatch()
  // let topId = topicId
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    console.log('topicId: ', JSON.stringify(topicId))
    if (topicId.length === 0) {
      if (topId) {
        console.log('topicId.length === 0')
        return;
      // } else {
      //   topId = paramTopId;
      }
    }
   
    
    const cardIds = [];
    // create the new cards here and add each card's id to cardIds
    if (Object.values(quizzes).find((quiz) =>quiz.name === name)){
      setError("Name in Use; Choose Another to Add Quiz");
      return;
    }
    if (cards.length === 0){
      setError("Please add at least ONE card!");
      return;
    }
    let cardValues = []
    
    cards.map(card => {
      
      const cardId =  uuidv4();
      let cardObj = {
        id: cardId, 
        front: card.front, 
        back:  card.back
      };
      
      
      cardIds.push(cardId);
      
      dispatch(addCard(cardObj));
    })
    
    // create the new quiz here
    dispatch(
      newQuizThunk(
        {
          name,
          topicId,
          cardIds,
          id: uuidv4()
        }
      )
    )

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };
  
  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    
      
     if (newCards.find(card => card.front === value))
      {
        setError(`Name '${value}' in use! Rename card.`);
        return;
      }
    const topicOption = '<option value="">Topic</option>'
     
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a New quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          {topId ? "" : <option value="">Topic</option>}
          {topId ? <option key={topId} value={topId}>{topics[topId].name}</option> : 
            
            Object.values(topics).map
             (
              (topic) => 
                ( 
                 <option key={topic.id} value={topic.id}>
                   {topic.name}
                 </option>
                )
            )
              
          }
          
             {/* {Object.values(topics).map((topic) => ( 
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))} */}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button >Add Quiz</button>
         
        </div>
        <Error error={error}/>
      </form>
    </section>
  );
}
