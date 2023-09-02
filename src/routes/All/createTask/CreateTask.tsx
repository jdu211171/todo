import React, { useState } from "react";
import styles from "./CreateTask.module.css";
import axios from "axios";
import * as qs from "qs";
import toastr from "toastr";
import "toastr/toastr.scss";

interface Task {
  title: string;
  description: string;
  priority: string;
  category: string;
  repetition: string;
  deadline: string;
}

interface CreateTaskProps {
  updateTaskData: (newTask: Task) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ updateTaskData }) => {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "ordinary",
    category: "Benkyou",
    repetition: "onetime",
    deadline: currentDateString,
  });

  const handleReset = () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    setTask({
      title: "",
      description: "",
      priority: "ordinary",
      category: "Benkyou",
      repetition: "onetime",
      deadline: currentDateString,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = new Date().toJSON().slice(0, 10);

    let data = qs.stringify({
      taskName: task.title,
      categoryName: task.category,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline || date,
    });

    const token = localStorage.getItem("token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://" + window.location.hostname + ":3001/api/task",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        handleReset();
        toastr.success("Task Created Successfully");
        const newTask = response.data;
        updateTaskData(newTask);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.noselect}>
      <form onSubmit={handleSubmit}>
        <div className={styles.createTaskContainer}>
          <div className={styles.taskTitleForm}>
            <div className={styles.taskTitle}>
              <div className={styles.wrapper}>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 0.8125C3.35887 0.8125 0.8125 3.35887 0.8125 6.5C0.8125 9.64112 3.35887 12.1875 6.5 12.1875C9.64112 12.1875 12.1875 9.64112 12.1875 6.5C12.1875 3.35887 9.64112 0.8125 6.5 0.8125ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5Z"
                    fill="#212121"
                  />
                </svg>
                <div className={styles.inputData}>
                  <input
                    className={styles.input}
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                  <div className={styles.underline}></div>
                  <label className={styles.label}>Enter a task title</label>
                </div>
              </div>
            </div>

            <div className={styles.taskDescriptionContainer}>
              <textarea
                className={styles.taskDescription}
                name="description"
                value={task.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
              ></textarea>
            </div>
          </div>

          <div className={styles.taskDetailsForm}>
            <div className={styles.priorityCategoryRepetition}>
              <label className={styles.label} htmlFor="task-priority">
                Task Priority
              </label>
              <select
                className={styles.formSelect}
                id="taskPriority"
                name="priority"
                value={task.priority}
                onChange={handleInputChange}
              >
                <option className={styles.option} value="ordinary">
                  Ordinary
                </option>
                <option className={styles.option} value="important">
                  Important
                </option>
                <option className={styles.option} value="critical">
                  Critical
                </option>
              </select>
              <label className={styles.label} htmlFor="task-category">
                Task Category
              </label>
              <select
                className={styles.formSelect}
                id="taskCategory"
                name="category"
                value={task.category}
                onChange={handleInputChange}
              >
                <option className={styles.option} value="cat1">
                  Benkyou
                </option>
              </select>
            </div>

            <div className={styles.weekdays}>
              <label className={styles.label} htmlFor="task-category">
                Task Repetition
              </label>
              <select
                className={styles.formSelect}
                id="taskRepetition"
                name="repetition"
                value={task.repetition}
                onChange={handleInputChange}
              >
                <option className={styles.option} value="onetime">
                  One time only
                </option>
                <option className={styles.option} value="daily">
                  Daily
                </option>
                <option className={styles.option} value="weekly">
                  Weekly
                </option>
              </select>
              <label className={styles.label} htmlFor="task-category">
                Task Deadline
              </label>
              <input
                type="date"
                id="taskDeadline"
                name="deadline"
                className={styles.formSelect}
                value={task.deadline}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.taskCreateOptions}>
            <button
              className={styles.btn}
              style={{ color: "#0D6EFD" }}
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className={styles.btn} style={{ color: "#DC3545" }}>
              Delete
            </button>
            <button className={styles.btnLocal} type="submit">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
