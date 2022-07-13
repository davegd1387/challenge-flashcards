import NewTopicForm from "../../components/NewTopicForm";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectQuizzes } from "../quizzes/quizzesSlice"
import { selectTopics } from "../topics/topicsSlice"
import { useSelector } from 'react-redux'




export default function Topic() {
  const topics = useSelector(selectTopics); 
  const quizzes = useSelector(selectQuizzes);
  let { topicId } = useParams();
  const topic = topics[topicId];
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      
      <Link to={ROUTES.newQuizforTopicRoute(topicId)} className="button center">
      {/* <Link to="/quizzes/new" className="button center"> */}
        New Quiz?
      </Link>
    </section>
  );
}
