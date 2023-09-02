// import React from 'react';
import "../../general.css";
import st from "./task.module.css";

// import './taskT.module.css';
export default function Tasks({ taskdata }: any) {
  const formatDeadline = (deadline: any) => {
    const date = new Date(deadline);
    const formattedDate = `${date.getFullYear()}:${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}:${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    return formattedDate;
  };

  const TaskItems = taskdata.map((taskdatas: any, index:number) => (
    <div key={index}>
      <span className={st.taskFold + " " + st.critical}>
        {taskdatas.CategoryName}
      </span>
      <div key={taskdatas.TaskID} className={st.task}>
        <div className={st.title}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "inline" }}
          >
            <path
              d="M6.5 0.8125C3.35887 0.8125 0.8125 3.35887 0.8125 6.5C0.8125 9.64112 3.35887 12.1875 6.5 12.1875C9.64112 12.1875 12.1875 9.64112 12.1875 6.5C12.1875 3.35887 9.64112 0.8125 6.5 0.8125ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5Z"
              fill="#212121"
            />
          </svg>
          <div className={st.text}>{taskdatas.TaskName}</div>
        </div>

        <div className={st.right}>
          <div className={st.deadline}>
            {formatDeadline(taskdatas.Deadline)}
          </div>
          <div className={st.buttons}>
            <div>details</div>
            <div>change</div>
            <div>delete</div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <div>{TaskItems}</div>;
}
