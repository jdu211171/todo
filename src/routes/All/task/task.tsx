import React from 'react';
import axios from 'axios';
import '../../general.css';
import st from './task.module.css';

interface Task {
  TaskID: number;
  CategoryName: string;
  TaskName: string;
  Deadline: string;
}

interface TasksProps {
  taskdata: Task[];
  updateTaskData: () => void;
  getUpdateData: (TaskID: number) => void; // Correctly define the type of getUpdateData
}

export default function Tasks({ taskdata, updateTaskData, getUpdateData }: TasksProps): JSX.Element {
  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const formattedDate = `${date.getFullYear()}:${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}:${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const handleDelete = (TaskID: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    console.log(TaskID);

    const token = localStorage.getItem('token');
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://' + window.location.hostname + ':3001/api/tasks/' + TaskID,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        updateTaskData(); // Trigger data update after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(TaskID: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    event.stopPropagation();
    getUpdateData(TaskID)
    console.log(TaskID);
  }  

  const handleDetails = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, TaskID: number): void => {
    event.stopPropagation();
    console.log(TaskID);
  };

  const TaskItems = taskdata.map((taskdatas: Task, index: number) => (
    <div key={index} onClick={(event) => handleDetails(event, taskdatas.TaskID)}>
      <span className={st.taskFold + ' ' + st.critical}>{taskdatas.CategoryName}</span>
      <div key={taskdatas.TaskID} className={st.task}>
        <div className={st.title}>
          <svg
            width='25'
            height='25'
            viewBox='0 0 13 13'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{ display: 'inline' }}
          >
            <path
              d='M6.5 0.8125C3.35887 0.8125 0.8125 3.35887 0.8125 6.5C0.8125 9.64112 3.35887 12.1875 6.5 12.1875C9.64112 12.1875 12.1875 9.64112 12.1875 6.5C12.1875 3.35887 9.64112 0.8125 6.5 0.8125ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5Z'
              fill='#212121'
            />
          </svg>
          <div className={st.text}>{taskdatas.TaskName}</div>
        </div>

        <div className={st.right}>
          <div className={st.deadline}>{formatDeadline(taskdatas.Deadline)}</div>
          <div className={st.buttons}>
            <div className={st.details}>Details</div>
            <div className={st.update} onClick={(event) => handleChange(taskdatas.TaskID, event)}>Update</div>
            <div className={st.delete} onClick={(event) => handleDelete(taskdatas.TaskID, event)}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return <div>{TaskItems}</div>;
}

