import React, { useEffect, useState } from "react";
import all from "./all.module.css";
import "../general.css";

import App from "../../htmlAssets/Select/Select";
import Button from "../filters/createButton";
import Tasks from "./task/task";
import axios from "axios";
import * as qs from "qs";
import CreateTask from "./createTask/CreateTask";
import TaskDetails from "./details/details";
import { faMagnifyingGlass, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function fetchTaskData() {
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://" + window.location.hostname + ":3001/api/tasks/today",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching task data:", error);
    throw error;
  }
}

export default function Todays() {
  const [currentTaskID, setCurrentTaskID] = useState<number | null>(null);
  const [taskdata, setTaskdata] = useState([]);
  const [taskdataDetail, setTaskdataDetail] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const priorityOptions = ["低い", "普通", "優先"];
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    // Your filter criteria state
    selectValue1: "",
    selectValue2: 0,
    inputValue: "",
  });

  const handleResetClick = () => {
    // Reset your filter criteria here
    setFormData({
      selectValue1: "",
      selectValue2: 0,
      inputValue: "",
    });

    updateTaskData()
    // You can also perform any other actions needed for resetting here
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGetButtonClick = () => {
    fetchTaskData().then((data) => {
      const filteredTasks = data.filter((task: any) => {
        console.log(formData);
        console.log(task);
        // Check if selectValue1 matches task's priority (assuming task.priority is the attribute name)
        if (formData.selectValue1 && task.Priority !== formData.selectValue1) {
          return false;
        }
        // Check if selectValue2 matches task's status (assuming task.status is the attribute name)
        if (formData.selectValue2 && task.CategoryID != formData.selectValue2) {
          return false;
        }

        // Check if inputValue matches task's due date (assuming task.dueDate is the attribute name)
        if (
          formData.inputValue &&
          task.Deadline.split("T")[0] !== formData.inputValue
        ) {
          return false;
        }

        // If none of the conditions failed, include the task in the filtered result
        return true;
      });

      // Set the filtered data back to the taskdata state variable
      setTaskdata(filteredTasks);
    });
  };

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openDetail = (TaskID: number) => {
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://" + window.location.hostname + ":3001/api/tasks/" + TaskID,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // Set the fetched data in the taskdataDetail state
        setTaskdataDetail(response.data);

        // Open the detail view
        setIsDetailOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeDetail = (event: any) => {
    setIsDetailOpen(false);
  };

  // Function to update the taskdata state
  const updateTaskData = () => {
    // Fetch the latest data when a new task is created
    fetchTaskData()
      .then((data) => {
        setTaskdata(data);
      })
      .catch((error) => {
        // Handle error if needed
      });
  };

  const setIDNull = () => {
    setCurrentTaskID(null);
  };

  const getUpdateData = (TaskID: number) => {
    console.log("asd: " + currentTaskID);
    setCurrentTaskID(TaskID);
    console.log("UPD: " + currentTaskID);
    return TaskID;
  };

  useEffect(() => {
    fetchTaskData()
      .then((data) => {
        setTaskdata(data);
      })
      .catch((error) => {
        // Handle error if needed
      });
  }, []);

  return (
    <div className="content">
      <div className="top">
        <div className={all.GetButton}>
          <h1>All tasks</h1>
          <div className={all.buttons}>
            <div onClick={handleResetClick}>
              <FontAwesomeIcon icon={faRotate} />
            </div>
            <div onClick={handleGetButtonClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
        </div>

        <div className="filters">
          {/* First Select */}
          <select
            className={all.formSelect}
            name="selectValue1"
            value={formData.selectValue1}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              優先度
            </option>
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Second Select */}
          <select
            className={all.formSelect}
            name="selectValue2"
            value={formData.selectValue2}
            onChange={handleInputChange}
          >
            <option value="0" disabled>
              カテゴリー
            </option>
            {categories.map((category) => (
              <option
                key={category.CategoryID}
                value={category.CategoryID} // Use CategoryID
              >
                {category.CategoryName}
              </option>
            ))}
          </select>

          {/* Input */}
          <input
            type="date"
            className={all.formSelect}
            name="inputValue"
            value={formData.inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="CreateTask">
        {/* Pass the updateTaskData function as a prop to CreateTask */}
        <CreateTask
          updateTaskData={updateTaskData}
          TaskID={currentTaskID}
          TaskIDNull={setIDNull} // Pass currentTaskID
        />
      </div>
      {isDetailOpen && (
        <TaskDetails
          taskdata={taskdataDetail} // Pass the fetched data to TaskDetails
          onClose={closeDetail}
        />
      )}
      {/* <div className="CreateTaskBtn">
        
      </div> */}
      <div className={all.TaskContainer}>
        <Tasks
          taskdata={taskdata}
          updateTaskData={updateTaskData}
          getUpdateData={getUpdateData}
          getDetails={openDetail} // Pass openDetail function to Tasks
        />
      </div>
    </div>
  );
}
