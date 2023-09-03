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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching task data:", error);
    throw error;
  }
}

export default function All() {
  const [currentTaskID, setCurrentTaskID] = useState<number | null>(null);
  const [taskdata, setTaskdata] = useState([]);
  const [taskdataDetail, setTaskdataDetail] = useState([]);

  const [isDetailOpen, setIsDetailOpen] = useState(false);

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

  const closeDetail = (event:any) => {
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
