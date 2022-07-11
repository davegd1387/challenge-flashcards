import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
import { addTopic } from "../features/topics/topicsSlice";
import { selectTopics } from "../features/topics/topicsSlice"


export default function NewTopicForm() {
  const topics = useSelector(selectTopics); 
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [dupeTopic, setDupeTopic] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    // dispatch your add topic action here
    if (Object.values(topics).find((topic) => topic.name === name)){
      setDupeTopic(true);
      return;
    }
    setDupeTopic(false)
    dispatch(addTopic({name, id: uuidv4(), icon}))
    history.push(ROUTES.topicsRoute());
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="center">Create a new topic</h1>
        <div className="form-section">
          <input
            id="topic-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Topic Name"
          />
          <select
            onChange={(e) => setIcon(e.currentTarget.value)}
            required
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Choose an icon
            </option>
            {ALL_ICONS.map(({ name, url }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="center">{dupeTopic ? "Name in Use; Choose Another to Add Topic" : "Add Topic"}</button>
      </form>
    </section>
  );
}
