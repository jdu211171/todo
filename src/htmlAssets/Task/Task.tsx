import React from "react";
import styles from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

interface TaskProps {
    taskTitle: string;
    taskCategory: string;
    taskDeadline: string;
    taskPriority: string;
    handleChange: () => void;
    handleDelete: () => void;
}

const Task: React.FC<TaskProps> = (props: TaskProps) => {

    const {
        taskTitle,
        taskCategory,
        taskDeadline,
        taskPriority,
        handleChange,
        handleDelete
    } = props;

    return (
        <ul className={styles.accordion}>
            <li>
                <FontAwesomeIcon className={styles.icon} icon={faCircle} style={{ color: "#151515", }} />
                <div className={styles.container}>
                    <p className={styles.taskTitle}>{taskTitle}</p>
                    <input type="checkbox" name="accordion" id="first" />
                    <label style={{}} htmlFor="first">Details</label>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <p className={styles.span}>Category: {taskCategory}</p>
                            <p className={styles.span}>Deadline: {taskDeadline}</p>
                            <span className={styles.span}>Importance: {taskPriority}</span>
                        </div>
                        <div className={styles.info1}>
                        </div>
                        <div className={styles.option}>
                            <button className={styles.button} style={{ color: "blue" }} onClick={handleChange}>Change</button>
                            <button className={styles.button} style={{ color: "red" }} onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Task;
