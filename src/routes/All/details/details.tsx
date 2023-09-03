import React, { useState, useEffect } from "react";
import st from "./details.module.css";
import { eventNames } from "process";

interface TaskData {
  TaskName: string;
  Description: string;
  Deadline: string;
  CategoryName: string;
  Priority: string;
  Completed: boolean;
  CompletedDate: string | null;
}

interface TaskDetailProps {
  taskdata: TaskData;
  onClose: () => void; // Function to close the detail view
}

function TaskDetail({ taskdata, onClose }: TaskDetailProps) {
  const [isActive, setIsActive] = useState(false);

  // Add a delay before applying the active class for the animation
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

    function CloseDetails(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.stopPropagation();
    }

  return (
    <div className={st.taskDetailBack} onClick={onClose}>
      <div onClick={(event)=>CloseDetails(event)} className={`${st.taskDetail} ${isActive ? st.active : ""}` }>
        <div className={st.title}>{taskdata.TaskName}</div>
        <div className={st.description}>{taskdata.Description}</div>
        <div className={st.deadline}>Deadline: {taskdata.Deadline}</div>
        <div className={st.category}>Category: {taskdata.CategoryName}</div>
        <div className={st.priority}>Priority: {taskdata.Priority}</div>
        <div className={st.completed}>
          Completed: {taskdata.Completed ? "Yes" : "No"}
        </div>
        <div className={st.completedDate}>
          Completed Date: {taskdata.CompletedDate || "Not completed yet"}
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
