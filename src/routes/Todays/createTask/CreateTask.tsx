import React, { useCallback, useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import styles from "./CreateTask.module.css";
import axios from "axios";
import * as qs from "qs";
import toastr from "toastr";
import "toastr/toastr.scss";

interface Task {
  title: string;
  description: string;
  priority: string;
  category: number; // Change category to use number (ID)
  repetition: string;
  deadline: string;
  TaskID: any;
}

interface Category {
  CategoryID: number;
  CategoryName: string;
}

interface CreateTaskProps {
  updateTaskData: (newTask: Task) => void;
  TaskID: any;
  TaskIDNull: () => void;
}


const CreateTask: React.FC<CreateTaskProps> = ({ updateTaskData, TaskID, TaskIDNull }) => {
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const [categories, setCategories] = useState<Category[]>([]);
    
  // Move this part inside the useEffect
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "普通",
    category: 0, // Use defaultCategory (ID)
    repetition: "onetime",
    deadline: currentDateString,
    TaskID: TaskID,
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://" + window.location.hostname + ":3001/api/categories",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  
    axios
      .request(config)
      .then((response) => {
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);
        // const defaultCategory = fetchedCategories.length > 0 ? fetchedCategories[0].CategoryID : 0; // Use CategoryID
        setTask((prevTask) => ({ ...prevTask, category: fetchedCategories.length > 0 ? fetchedCategories[0].CategoryID : 0 }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  


  const handleReset = () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    setTask({
      title: "",
      description: "",
      priority: "普通",
      category: task.category, // Use defaultCategory (ID)
      repetition: "onetime",
      deadline: currentDateString,
      TaskID: undefined, // Reset TaskID to undefined
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newValue = name === "category" ? parseInt(value, 10) : value; // Convert to a number if the input is category
    setTask((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(task);
    const date = new Date().toJSON().slice(0, 10);
    let data = qs.stringify({
      taskName: task.title,
      categoryID: task.category,
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
        const newTask = response.data as Task;
        updateTaskData(newTask);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (taskID: any) => {
    let data = qs.stringify({
      taskName: task.title,
      categoryName: task.category,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
    });
    console.log("updating..", task);
    const token = localStorage.getItem("token");
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://" + window.location.hostname + ":3001/api/tasks/" + TaskID,
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
        toastr.success("Task Updated Successfully");
        const newTask = response.data as Task;
        updateTaskData(newTask);
        TaskIDNull();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setUpdateData = useCallback(
    (taskID: any) => {
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().split("T")[0];
      const token = localStorage.getItem("token");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://" + window.location.hostname + ":3001/api/tasks/" + taskID,
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      axios
        .request(config)
        .then((response) => {
          const formattedDate = format(
            new Date(response.data.Deadline),
            "yyyy-MM-dd"
          );
          setTask({
            title: response.data.TaskName,
            description: response.data.Description,
            priority: response.data.Priority,
            category: response.data.CategoryID, // Use CategoryID
            repetition: "onetime",
            deadline: formattedDate,
            TaskID: taskID,
          });

          formRef.current?.querySelector("#inputTitle")?.focus();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [setTask, formRef]
  );

  useEffect(() => {
    if (TaskID !== null) {
      setUpdateData(TaskID);
    }
  }, [TaskID, setUpdateData]);

  return (
    <div className={styles.noselect}>
      <form ref={formRef} onSubmit={handleSubmit}>
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
                    id="inputTitle"
                    className={styles.input}
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleInputChange}
                    required
                    
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
                <option className={styles.option} value="低い">
                  低い
                </option>
                <option className={styles.option} value="普通">
                  普通
                </option>
                <option className={styles.option} value="優先">
                  優先
                </option>
              </select>
              <label className={styles.label} htmlFor="task-category">
                Task Category
              </label>
              {categories.length > 0 && (
                <select
                  className={styles.formSelect}
                  id="taskCategory"
                  name="category"
                  value={task.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <option
                      key={category.CategoryID}
                      className={styles.option}
                      value={category.CategoryID} // Use CategoryID
                    >
                      {category.CategoryName}
                    </option>
                  ))}
                </select>
              )}
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
              className={styles.btn + " " + styles.reset}
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className={styles.btn + " " + styles.delete}>Delete</button>
            {TaskID ? (
              <button
                type="button"
                className={styles.btnLocal}
                onClick={() => handleUpdate(TaskID)}
              >
                Update
              </button>
            ) : (
              <button className={styles.btnLocal} type="submit">
                Add Task
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
