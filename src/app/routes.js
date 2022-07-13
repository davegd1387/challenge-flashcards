const ROUTES = {
  newQuizRoute: () => "/quizzes/new",
  newQuizforTopicRoute: (id) => `/quizzes/new/${id}`,//DD added  07/12/22
  quizRoute: (id) => `/quizzes/${id}`,
  quizzesRoute: () => "/quizzes",
  newTopicRoute: () => "/topics/new",
  topicRoute: (id) => `/topics/${id}`,
  topicsRoute: () => "/topics",
};

export default ROUTES;
