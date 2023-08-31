import React from "react";
import styles from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const Task: React.FC = () => {
    function expandTask(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const target = event.target as HTMLElement;
        const parentDiv = target.closest('.actions') as HTMLElement;

        if (parentDiv) {
            const checkbox = parentDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;

            if (checkbox) {
                if (checkbox.checked) {
                    // checkbox.setAttribute('checked', 'false');
                    checkbox.classList.remove('details')
                } else {
                    // checkbox.setAttribute('checked', 'true');
                }
            }
        }
    }

    return (
        <ul className={styles.accordion}>
            <li>
                <input type="checkbox" name="accordion" id="first" />
                {/* <FontAwesomeIcon icon={faCircle} style={{color: "#151515",}} /> */}
                <label htmlFor="first">Products</label>
                <div className={styles.content}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur 			adipiscing elit. Suspendisse maximus nisl tortor. In vitae sem in orci gravida semper. Aliquam maximus ullamcorper ligula vel vehicula. Nunc tincidunt mattis metus sed fermentum. Pellentesque gravida interdum ligula pulvinar eleifend. Maecenas sit amet turpis metus.
                    </p>
                </div>
            </li>
        </ul>
    );
}

export default Task;
