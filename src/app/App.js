import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import Header from "../components/Header";
import NewQuizForm from "../components/NewQuizForm";
import NewTopicForm from "../components/NewTopicForm";
import Topics from "../features/topics/Topics";
import Topic from "../features/topics/Topic";
import Quiz from "../features/quizzes/Quiz";
import Quizzes from "../features/quizzes/Quizzes";
import ROUTES from "./routes";
import { selectQuizzes } from "../features/quizzes/quizzesSlice"
import { selectTopics } from "../features/topics/topicsSlice"
import { useSelector } from 'react-redux'

export default function App() {
  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes);
  return (
    <Router>
      <div className="top-div">
        <Header />
        <nav>

          <ul>
          <li>
              <NavLink to={ROUTES.newTopicRoute()} activeClassName="active">
                New Topic
              </NavLink>
          </li>
          {Object.values(topics).length ? 
            <li>
              <NavLink to={ROUTES.topicsRoute()} activeClassName="active">
                Topics
              </NavLink>
            </li> : ""
            }
            {Object.values(quizzes).length ? 
            <li>
              <NavLink to={ROUTES.quizzesRoute()} activeClassName="active">
                Quizzes
              </NavLink>
            </li> : ""
            }
            {Object.values(topics).length ? 
            <li>
              <NavLink to={ROUTES.newQuizRoute()} activeClassName="active">
                New Quiz
              </NavLink>
            </li> : ""
            }
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/topics">
          <TopicsRoutes />
        </Route>
        <Route path="/quizzes">
          <QuizRoutes />
        </Route>
      </Switch>
    </Router>
  );
}
//
function TopicsRoutes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/new`}>
          <NewTopicForm />
        </Route>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={`${match.path}`}>
          <Topics />
        </Route>
      </Switch>
    </>
  );
}

function QuizRoutes() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
       
        <Route path={`${match.path}/new/:topId`}>
          <NewQuizForm />
        </Route>
        <Route path={`${match.path}/new`}>
          <NewQuizForm />
        </Route>
        <Route path={`${match.path}/:quizId`}>
          <Quiz />
        </Route>
        <Route path={`${match.path}`}>
          <Quizzes />
        </Route>
      </Switch>
    </>
  );
}

// const ROUTES = {
//   newQuizRoute: () => "/quizzes/new",
//   newQuizforTopicRoute: (id) => `/quizzes/new/${id}`,//DD added  07/12/22
//   quizRoute: (id) => `/quizzes/${id}`,
//   quizzesRoute: () => "/quizzes",
//   newTopicRoute: () => "/topics/new",
//   topicRoute: (id) => `/topics/${id}`,
//   topicsRoute: () => "/topics",
// };
