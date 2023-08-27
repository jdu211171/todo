import React, { useState } from "react";
import st from "./createTask.module.css";

import './dateinput.css'

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      setTask((prev) => ({ ...prev, days: [...prev.days, id] }));
    } else {
      setTask((prev) => ({
        ...prev,
        days: prev.days.filter((day) => day !== id),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(task);
    // Add task to database or state
  };

  return (
    <div className={st.createTaskBox}>
      <div className={st.taskTitDesc}>
        <div className="task-title">
          <div className="wrapper">
            <svg
              width="25"
              height="25"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "inline;" }}
            >
              <path
                d="M6.5 0.8125C3.35887 0.8125 0.8125 3.35887 0.8125 6.5C0.8125 9.64112 3.35887 12.1875 6.5 12.1875C9.64112 12.1875 12.1875 9.64112 12.1875 6.5C12.1875 3.35887 9.64112 0.8125 6.5 0.8125ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5Z"
                fill="#212121"
              />
            </svg>
            <div className="input-data">
              <input type="text" required autoFocus />
              <div className="underline"></div>
              <label>Enter a task title</label>
            </div>
          </div>
        </div>

        <div className="task-description">
          <div>
            <textarea
              name=""
              id=""
              placeholder="Enter task description"
            ></textarea>
          </div>
        </div>
      </div>

      <div className={st.taskPrCtRep}>
        <div className={st.optionsBox}>
          <label htmlFor="task-priority">Task Priority</label>
          <select className="form-select" id="task-priority">
            <option value="ordinary" selected>
              Ordinary
            </option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
          </select>

          <label htmlFor="task-category">Task Category</label>
          <select className="form-select" id="task-priority">
            <option value="ordinary" selected>
              Fitness
            </option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className={st.optionsBox}>
          <span className="datepicker-toggle">
            <span className="datepicker-toggle-button"></span>
            <input type="date" className="datepicker-input" />
          </span>
          <label htmlFor="task-category">Task Repetition</label>
          <select className="form-select" id="task-priority">
            <option value="ordinary" selected>
              One time only
            </option>
            <option value="important">Daily</option>
            <option value="critical">Weekly</option>
          </select>

          <div
            className="days-of-week"
            style={{ display: "block", flex: "left" }}
          >
            {/* <input type="checkbox" name="" id="monday" /><label htmlFor="monday">Mon</label>
          <input type="checkbox" name="" id="monday" /><label htmlFor="monday">Mon</label>
          <input type="checkbox" name="" id="monday" /><label htmlFor="monday">Mon</label>
          <input type="checkbox" name="" id="monday" /><label htmlFor="monday">Mon</label>
          <input type="checkbox" name="" id="monday" /><label htmlFor="monday">Mon</label>
          <input type="checkbox" name="" id="monday" /><label htmlFor="monday">Mon</label>
          <input type="checkbox" name="" id="monday" /><label htmlFor="monday">Mon</label> */}
          </div>
        </div>
      </div>

      <div
        className={st.taskCreateBtns}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <button
          style={{
            border: "none",
            backgroundColor: "white",
            fontSize: "16px",
            color: "#0D6EFD",
          }}
          type="reset"
        >
          Reset
        </button>
        <button
          style={{
            border: "none",
            backgroundColor: "white",
            fontSize: "16px",
            color: "#DC3545",
          }}
        >
          Delete
        </button>
        <a
          style={{ alignSelf: "flex-end" }}
          href="https://www.google.com"
          className="btnLocal"
        >
          Add Task
        </a>
      </div>
    </div>
  );
};

export default CreateTask;
