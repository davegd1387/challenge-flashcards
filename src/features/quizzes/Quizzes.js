import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectQuizzes } from "./quizzesSlice"
import { selectTopics } from "../topics/topicsSlice"
import { useSelector } from 'react-redux'

export default function Quizzes() {
  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state
  const topics = useSelector(selectTopics);
  console.log('topics.length: ', topics.length)
  return (
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <Link key={quiz.id} to={ROUTES.quizRoute(quiz.id)}>
            <li className="quiz">{quiz.name}</li>
          </Link>
        ))}
      </ul>
      {/* { topic.quizIds.length === 1 ? " Quiz" : " Quizzes"} */}
      {Object.values(topics).length ? 
      <Link to={ROUTES.newQuizRoute()} className="button" >
        New Quiz?
      </Link> : ""
      }
    </section>
  );
}
