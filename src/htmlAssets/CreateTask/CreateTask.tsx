import styles from "./CreateTask.module.css";

interface Task {
  title: string;
  description: string;
  priority: string;
  category: string;
  repetition: string;
  days: string[];
}

const CreateTask: React.FC = () => {

  return (
    <div className={styles.noselect}>

      <div className={styles.createTaskContainer}>
        <div className={styles.taskTitleForm}>


          <div className={styles.taskTitle}>
            <div className={styles.wrapper}>
              <svg width="25" height="25" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.5 0.8125C3.35887 0.8125 0.8125 3.35887 0.8125 6.5C0.8125 9.64112 3.35887 12.1875 6.5 12.1875C9.64112 12.1875 12.1875 9.64112 12.1875 6.5C12.1875 3.35887 9.64112 0.8125 6.5 0.8125ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5Z"
                  fill="#212121" />
              </svg>
              <div className={styles.inputData}>
                <input className={styles.input} type="text" required autoFocus />
                <div className={styles.underline}></div>
                <label className={styles.label}>Enter a task title</label>
              </div>
            </div>
          </div>

          {/* <div className={styles.taskDescription}> */}
            <div>
              <textarea className={styles.taskDescription} name="" id="" placeholder="Enter task description"></textarea>
            </div>
          {/* </div> */}
        </div>



        <div className={styles.taskDetailsForm}>
          <div className={styles.priorityCategoryRepetition}>

            <label className={styles.label} htmlFor="task-priority">Task Priority</label>
            <select className={styles.formSelect} id={styles.taskPriority}>
              <option className={styles.option} value="ordinary" selected>Ordinary</option>
              <option className={styles.option} value="important">Important</option>
              <option className={styles.option} value="critical">Critical</option>
            </select>

            <label className={styles.label} htmlFor="task-category">Task Category</label>
            <select className={styles.formSelect} id={styles.taskPriority}>
              <option className={styles.option} value="ordinary" selected>Fitness</option>
              <option className={styles.option} value="important">Important</option>
              <option className={styles.option} value="critical">Critical</option>
            </select>


          </div>
          <div className={styles.weekdays}>
            <label className={styles.label} htmlFor="task-category">Task Repetition</label>
            <select className={styles.formSelect} id={styles.taskPriority}>
              <option className={styles.option} value="ordinary" selected>One time only</option>
              <option className={styles.option} value="important">Daily</option>
              <option className={styles.option} value="critical">Weekly</option>
            </select>

            <label className={styles.label} htmlFor="task-category">Task Deadline</label>
            <input type="date" name="deadline" id="" className={styles.formSelect} />

            {/* <div className={styles.daysOfWeek} style={{ display: "block", flex: "left" }}>
          </div> */}


          </div>
            <div className={styles.taskCreateOptions} >
              <button className={ styles.btn } style={{ color: "#0D6EFD" }} type="reset">Reset</button>
              <button className={ styles.btn } style={{  color: "#DC3545" }}>Delete</button>
              <a href="#" className={styles.btnLocal}>Add Task</a>
            </div>
        </div>


      </div >
    </div>
  );
};

export default CreateTask;
