import React, { useEffect, useState } from "react";
import all from "./all.module.css";
import "../general.css";

import App from "../../htmlAssets/Select/Select";
import Button from "../filters/createButton";
import Tasks from "./task/task";
import axios from "axios";
import * as qs from "qs";
import CreateTask from "./createTask/CreateTask";

async function fetchTaskData() {
  const data = qs.stringify({});
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://" + window.location.hostname + ":3001/api/all",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log("Error fetching task data:", error);
    throw error;
  }
}

export default function All() {
  const [currentTaskID, setCurrentTaskID] = useState<number | null>(null);
  const [taskdata, setTaskdata] = useState([]);
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

  const setUpdateData = () => {
    console.log("triggered");
    return;
  };

  const getUpdateData = (TaskID: number) => {
    console.log("asd: " + currentTaskID)
    setCurrentTaskID(TaskID); 
    console.log("UPD: " +currentTaskID)
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
        <h1>All tasks</h1>

        <div className="filters">
          {/* <div>Importance</div> */}
          <App />
          <App />
          <App />
          {/* <Test/> */}
          <div className="CreateButton">
            <Button />
          </div>
        </div>
      </div>
      <div className="CreateTask">
        {/* Pass the updateTaskData function as a prop to CreateTask */}
        <CreateTask
          updateTaskData={updateTaskData}
          TaskID={currentTaskID} // Pass currentTaskID
        />
      </div>
      {/* <div className="CreateTaskBtn">
        
      </div> */}
      <div className={all.TaskContainer}>
        <Tasks
          taskdata={taskdata}
          updateTaskData={updateTaskData}
          getUpdateData={getUpdateData}
        />
      </div>
    </div>
  );
}
