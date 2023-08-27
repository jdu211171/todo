import React, { useState } from "react";
import st from "./createTask.module.css";
import axios from "axios";
import * as qs from "qs";

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
    priority: "High",
    category: "fitness",
    repetition: "onetime",
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

  const AddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date().toJSON().slice(0, 10);
    console.log(date);
    // Add task to database or state
    let data = qs.stringify({
      taskName: task.title,
      categoryName: task.category,
      description: task.description,
      priority: task.priority,
      deadline: date,
    });
    console.log(data);
    // return 0;
    const token = localStorage.getItem("token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/api/task",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
              <input
                name="title"
                value={task.title}
                onChange={handleInputChange}
                type="text"
                required
                autoFocus
              />
              <div className="underline"></div>
              <label>Enter a task title</label>
            </div>
          </div>
        </div>

        <div className="task-description">
          <div>
            <textarea
              name="description"
              id="description"
              placeholder="Enter task description"
              value={task.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className={st.taskPrCtRep}>
        <div className={st.optionsBox}>
          <label htmlFor="task-priority">Task Priority</label>
          <select
            value={task.priority}
            className="form-select"
            id="task-priority"
            name="priority"
            onChange={handleInputChange}
          >
            <option value="ordinary">High</option>
            <option value="important" selected>
              Medium
            </option>
            <option value="critical">Low</option>
          </select>

          <label htmlFor="task-category">Task Category</label>
          <select
            className="form-select"
            id="task-category"
            name="category"
            value={task.category}
            onChange={handleInputChange}
          >
            <option value="fitness">Fitness</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
          </select>
        </div>
        <div className={st.optionsBox}>
          <label htmlFor="task-category">Task Repetition</label>
          <select
            className="form-select"
            id="task-repetition"
            name="repetition"
            value={task.repetition}
            onChange={handleInputChange}
          >
            <option value="onetime">One time only</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          {/* Other options */}
          {/* ... */}
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
          onClick={AddTask}
          className="btnLocal"
        >
          Add Task
        </a>
      </div>
    </div>
  );
};

export default CreateTask;
