import React, { useEffect, useState } from "react";
import all from "./all.module.css";
import "../general.css";

import App from "../../htmlAssets/Select/Select";
import Button from "../filters/createButton";
import Tasks from "./task/task";
import axios from "axios";
import * as qs from "qs";
import CreateTask from "../../htmlAssets/CreateTask/CreateTask";

async function fetchTaskData() {
  const data = qs.stringify({});
  const token = localStorage.getItem('token');
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3001/upcoming",
    headers: {
      Authorization:
        "Bearer " + token,
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
  const [taskdata, setTaskdata] = useState([]);

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
          <App placeholder="Importance: All" />
          <App placeholder="Category: All" />
          <App placeholder="By Date: All" />
          {/* <Test/> */}
          <div className="allbuttons">
            <Button />
          </div>
        </div>
      </div>
      <div className="CreateTask">
        <CreateTask />
      </div>
      <div className={all.TaskContainer}>
        <Tasks taskdata={taskdata} />
      </div>
    </div>
  );
}
