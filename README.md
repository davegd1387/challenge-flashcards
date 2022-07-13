# To Run

Run `npm start` in the project root and the app will be available on port 3000.

# State

The app's state is totally normalized, with slices for topics, quizzes, and cards.

# Routes

- `/topics/new` – form to create a new topic
- `/topics` – index of all topics
- `/topics/:topicId` – page for an individual topic
- `/quizzes/new` – form to create a new quiz
- `/quizzes` – index of all quizzes
- `/quizzes/:quizId` – page for an individual quiz
- `/quizzes/new/:topId` – page for new quiz from specific topic.

# To Test

1. Create topics
2. Create quizzes
3. Visit the page for an individual quiz and flip the cards over

# Enhancements
- Added Header component.
- Added Error component.
- Added "New Topic" as header link.
- Made header links conditional on existing topics/quizzes.
- Added checks for duplicate topic and quiz names, cards within a given quiz.
- Require icon to be entered for topic
- Require at least 1 card per quiz.
- Pass topic id as param when clicking on "add quiz" from topic page.

