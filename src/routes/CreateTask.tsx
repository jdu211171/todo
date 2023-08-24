import React, { useState } from "react";
import "./index.css";

// Boxicons CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "@fontawesome/fontawesome-free/css/all.css";


interface Task {
  title: string;
  description: string;
  priority: string;
  category: string;
  repetition: string;
  days: string[];
}

const CreateTask: React.FC = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "ordinary",
    category: "fitness",
    repetition: "weekly",
    days: ["monday"],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      setTask((prev) => ({ ...prev, days: [...prev.days, id] }));
    } else {
      setTask((prev) => ({ ...prev, days: prev.days.filter((day) => day !== id) }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(task);
    // Add task to database or state
  };

  return (
    <div className="create-task-container column">
      <form onSubmit={handleSubmit}>
        <div className="task-title-form">
          <div className="task-title">
            <div className="wrapper">
              <svg
                width="25"
                height="25"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "inline" }}
              >
                <path
                  d="M6.5 0.8125C3.35887 0.8125 0.8125 3.35887 0.8125 6.5C0.8125 9.64112 3.35887 12.1875 6.5 12.1875C9.64112 12.1875 12.1875 9.64112 12.1875 6.5C12.1875 3.35887 9.64112 0.8125 6.5 0.8125ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5Z"
                  fill="#212121"
                />
              </svg>
              <div className="input-data">
                <input type="text" name="title" value={task.title} onChange={handleInputChange} required autoFocus />
                <div className="underline"></div>
                <label>Enter a task title</label>
              </div>
            </div>
          </div>

          <div className="task-description">
            <div>
              <textarea
                name="description"
                value={task.description}
                onChange={handleInputChange}
                cols={30}
                rows={4}
                placeholder="Enter task description"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="task-details-form">
          <div className="priority-category-repetition">
            <label htmlFor="priority">Task Priority</label>
            <select className="form-select" name="priority" id="priority" value={task.priority} onChange={handleInputChange}>
              <option value="ordinary">Ordinary</option>
              <option value="important">Important</option>
              <option value="critical">Critical</option>
            </select>

            <label htmlFor="category">Task Category</label>
            <select className="form-select" name="category" id="category" value={task.category} onChange={handleInputChange}>
              <option value="fitness">Fitness</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>

        <div className="weekdays" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: "10px" }}>
          <label htmlFor="repetition">Task Repetition</label>
          <select className="form-select" name="repetition" id="repetition" value={task.repetition} onChange={handleInputChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <label htmlFor="days">Day for this task to repeat</label>
          <div className="custom-select" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="selected-options">{task.days.join(", ")}</div>
            <div className="options-container">
              <div className="option">
                <input type="checkbox" id="monday" checked={task.days.includes("monday")} onChange={handleCheckboxChange} />
                <label htmlFor="monday">Monday</label>
              </div>
              <div className="option">
                <input type="checkbox" id="tuesday" checked={task.days.includes("tuesday")} onChange={handleCheckboxChange} />
                <label htmlFor="tuesday">Tuesday</label>
              </div>
              <div className="option">
                <input type="checkbox" id="wednesday" checked={task.days.includes("wednesday")} onChange={handleCheckboxChange} />
                <label htmlFor="wednesday">Wednesday</label>
              </div>
              <div className="option">
                <input type="checkbox" id="thursday" checked={task.days.includes("thursday")} onChange={handleCheckboxChange} />
                <label htmlFor="thursday">Thursday</label>
              </div>
              <div className="option">
                <input type="checkbox" id="friday" checked={task.days.includes("friday")} onChange={handleCheckboxChange} />
                <label htmlFor="friday">Friday</label>
              </div>
              <div className="option">
                <input type="checkbox" id="saturday" checked={task.days.includes("saturday")} onChange={handleCheckboxChange} />
                <label htmlFor="saturday">Saturday</label>
              </div>
              <div className="option">
                <input type="checkbox" id="sunday" checked={task.days.includes("sunday")} onChange={handleCheckboxChange} />
                <label htmlFor="sunday">Sunday</label>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height=".7em" viewBox="0 0 512 512">
              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com
License - https://fontawesome.com/license (Commercial License) */}
              <path
                d="
M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3
0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              />
            </svg>
          </div>
        </div>

        <div className="task-create-options" style={{ display: "flex", alignSelf: "flex-end" }}>
          <button type="submit" className="btn">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
