import React, { useEffect, useState } from "react";
import all from "./all.module.css";
import "../general.css";

import Tasks from "./task/task";
import axios from "axios";
import * as qs from "qs";
import CreateTask from "./createTask/CreateTask";
import TaskDetails from "./details/details";
import Calendar from "./calendar/Calendar";
import {
  faArrowDownWideShort,
  faArrowUpAZ,
  faArrowUpShortWide,
  faMagnifyingGlass,
  faPlus,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let isOpen: boolean;
let isBeingUpdated: boolean;

async function fetchTaskData() {
  const data = qs.stringify({});
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://" + window.location.hostname + ":3001/api/calendar",
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
  const [sortCriteria, setSortCriteria] = useState("TaskName"); // Default sorting criteria
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [taskdataDetail, setTaskdataDetail] = useState([]);
  const [deadlineDates, setDeadlineDates] = useState([]);

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

    updateTaskData();
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
      console.log(data);
      const filteredTasks = data.filter((task: any) => {
        console.log(task.Deadline.split(" ")[0]);
        // Check if selectValue1 matches task's priority (assuming task.priority is the attribute name)
        if (formData.selectValue1 && task.Priority != formData.selectValue1) {
          return false;
        }
        // Check if selectValue2 matches task's status (assuming task.status is the attribute name)
        if (formData.selectValue2 && task.CategoryID != formData.selectValue2) {
          return false;
        }

        // Check if inputValue matches task's due date (assuming task.dueDate is the attribute name)
        if (
          formData.inputValue &&
          task.Deadline.split(" ")[0] != formData.inputValue
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
    setCurrentTaskID(TaskID);
    isBeingUpdated = true;
    if (!isOpen) {
      openElement();
    }
    return TaskID;
  };


  useEffect(() => {
    fetchTaskData()
      .then((data) => {
        setTaskdata(data);
        setDeadlineDates(data.map(item => item.Deadline))
        
      })
      .catch((error) => {
        // Handle error if needed
      });
  }, []);

  function openElement(isCreate: bool) {
    const heightElement = document
      .getElementsByClassName("CreateTask")[0]
      .querySelectorAll("div")[1].clientHeight;
    console.log(heightElement);
    if (isCreate) {
      setCurrentTaskID(null);
    }
    if (document.getElementsByClassName("CreateTask")[0].style.height === "") {
      document.getElementsByClassName("CreateTask")[0].style.height =
        heightElement + 4 + "px";
      setTimeout(() => {
        document.getElementsByClassName("CreateTask")[0].style.height =
          "fit-content";
      }, 400);
      document.getElementsByClassName("CreateTask")[0].style.overflow = "unset";
      isOpen = true;
    }
  }

  function closeElement() {
    const heightElement = document
      .getElementsByClassName("CreateTask")[0]
      .querySelectorAll("div")[1].clientHeight;
    console.log(heightElement);
    if (document.getElementsByClassName("CreateTask")[0].style.height !== "") {
      document.getElementsByClassName("CreateTask")[0].style.height =
        heightElement + 4 + "px";
      setTimeout(() => {
        document.getElementsByClassName("CreateTask")[0].style.height = "";
      }, 1);
      document.getElementsByClassName("CreateTask")[0].style.overflow =
        "hidden";
      isOpen = false;
    }
  }

  const handleSort = (criteria:any) => {
    
    // Toggle sorting order if the same criteria is clicked again
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different criteria is clicked, reset the sorting order
      setSortOrder("asc");
    }
    setSortCriteria(criteria);
    

    // Sort the taskData array based on the selected criteria and order
    const sortedData = [...taskdata].sort((a, b) => {
      if (criteria === "TaskName") {
        // Sort by TaskName
        return a.TaskName.localeCompare(b.TaskName);
      } else if (criteria === "DueDate") {
        console.log("DueDate");

        // Sort by DueDate
        const dateA = new Date(a.Deadline).getTime();
        const dateB = new Date(b.Deadline).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    // Update the state with the sorted array
    setTaskdata(sortedData);
  };

  function getDates(dates:any) {
    fetchTaskData().then((data) => {
      console.log(data);
      const filteredTasks = data.filter(task => {
        const taskDate = new Date(task.Deadline);
        return taskDate >= dates[0] && taskDate <= dates[1];
      });

      // Set the filtered data back to the taskdata state variable
      setTaskdata(filteredTasks);
    });
    console.log(dates)
  }

  

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

      <div onClick={() => openElement(true)} className="float">
        <FontAwesomeIcon icon={faPlus} className="my-float" />
      </div>
      <div className={all.Calendar}>
      <Calendar getDates={getDates} events={deadlineDates} />
      </div>
      

      <div className="CreateTask" id="taskMenu">
        <div onClick={() => closeElement()} className="closeButton">
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="15"
              cy="15"
              r="12"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
            />

            <line
              x1="9"
              y1="9"
              x2="21"
              y2="21"
              stroke="#000000"
              strokeWidth="2"
            />
            <line
              x1="9"
              y1="21"
              x2="21"
              y2="9"
              stroke="#000000"
              strokeWidth="2"
            />
          </svg>
        </div>
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
      <div className={all.TaskContainer}>
        <div className={all.sortBar}>
          <button onClick={() => handleSort("DueDate")}>
            {sortOrder === "asc" && sortCriteria ==="DueDate" ? (
              <FontAwesomeIcon icon={faArrowUpShortWide} />
            ) : (
              <FontAwesomeIcon icon={faArrowDownWideShort} />
            )}
            Due Date
          </button>
        </div>
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
