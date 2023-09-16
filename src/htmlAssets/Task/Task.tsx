import React, { useState } from "react";
import styles from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";

interface TaskProps {
    taskTitle: string;
    taskCategory: string;
    taskDeadline: string;
    taskPriority: string;
    handleChange: () => void;
    handleDelete: () => void;
    handleDone?: () => void;
}

const Task: React.FC<TaskProps> = (props: TaskProps) => {

    const {
        taskTitle,
        taskCategory,
        taskDeadline,
        taskPriority,
        handleChange,
        handleDelete,
        handleDone,
    } = props;

    // Use a state variable to store the icon state
    const [icon, setIcon] = useState(faCircle);
    const [status, setStatus] = useState(taskPriority);

    // Use another state variable to store the class name of the <p> tag
    const [className, setClassName] = useState(styles.taskTitle);

    // Define a function to toggle the icon state and the class name
    const toggleIcon = () => {
        if (icon === faCircle) {
            setIcon(faCircleCheck);
            // Add the .done class to the class name
            setClassName(styles.taskTitle + " " + styles.done);
            setStatus("Complete");
        } else {
            setIcon(faCircle);
            // Remove the .done class from the class name
            setClassName(styles.taskTitle);
            setStatus(taskPriority);
        }
        // Call the handleDone prop if it is defined
        handleDone && handleDone();
    }

    

    return (
        <ul className={styles.accordion}>
            <li>
                {/* Use a conditional rendering to show the icon based on the state */}
                <FontAwesomeIcon className={styles.icon} icon={icon} style={{ color: "#151515", }} onClick={toggleIcon} />
                <div className={styles.container}>
                    {/* Use the class name in the <p> tag */}
                    <p className={className}>{taskTitle}</p>
                    <input type="checkbox" name="accordion" id="first" />
                    <label style={{}} htmlFor="first">Details</label>
                    <div className={styles.content}>
                        <div className={styles.info}>
                            <p className={styles.span}>Category: {taskCategory}</p>
                            <p className={styles.span}>Deadline: {taskDeadline}</p>
                            <span className={styles.span}>Importance: {status}</span>
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

Task.defaultProps = {
    handleDone: () => {
        console.log("Task is done");
    }
}

export default Task;
