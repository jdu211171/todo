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
  const priorityClassMap = {
    低い: "low",
    普通: "normal",
    優先: "critical",
  };

  // Add a delay before applying the active class for the animation
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  function CloseDetails(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    event.stopPropagation();
  }

  return (
    <div className={st.taskDetailBack} onClick={onClose}>
      <div
        onClick={(event) => CloseDetails(event)}
        className={`${st.taskDetail} ${isActive ? st.active : st.closed}`}
      >
        <div className={st.closeButton} onClick={onClose}>
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="12" fill="none" stroke="#000000" strokeWidth="2" />
  
                <line x1="9" y1="9" x2="21" y2="21" stroke="#000000" strokeWidth="2" />
                <line x1="9" y1="21" x2="21" y2="9" stroke="#000000" strokeWidth="2" />
            </svg>
        </div>
        <div className={st.title}>{taskdata.TaskName}</div>
        <div className={st.deadline}>
          <span>期限日:</span> {taskdata.Deadline.split(" ")[0]}
        </div>
        <div className={st.category}>
          <span>カテゴリー:</span> {taskdata.CategoryName}
        </div>
        <div className={st.priority}>
          <span>優先度: </span>
          <span className={st[priorityClassMap[taskdata.Priority]]}>
            {taskdata.Priority}
          </span>
          
        </div>
        <div className={st.completed}>
          <span>完了状態:</span> {taskdata.Completed ? "完成" : "未完成"}
        </div>
        <div className={st.completedDate}>
          <span>完了日:</span>{" "}
          {taskdata.CompletedDate === null ? "まだ完成していない" : taskdata.CompletedDate.split("T")[0]}
        </div>

        <fieldset className={st.description}>
          <legend>タスクの詳細</legend>
          <div>
            {taskdata.Description === "" ? (
                <div className={st.noDesc}>
                    詳細なし
                </div>
            ) : taskdata.Description}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default TaskDetail;
