import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import st from "./categories.module.css";
import { faFolder, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react"; // Import React and useState hook

// Define a function that renders a component based on the user-entered value
interface Props {
    value: string;
    onUpdate: (newInputValue: string, index: number) => void; // Add a prop for the update function
    index: number; // Add a prop for the index of the component
}

export const CategoryComponent: React.FC<Props> = (props) => {
    const { value, onUpdate, index } = props; // Destructure the props
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [visible, setVisible] = useState(true);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setInputValue(e.target.value);
    }

    function handleCategoryChange(event: React.MouseEvent): void {
        event.preventDefault();
        setEditMode(true);
        inputRef.current?.focus(); // Focus on the input element here
    }

    function handleCategorySave(event: React.MouseEvent): void {
        event.preventDefault();
        setEditMode(false);
        onUpdate(inputValue, index); // Call the function from the parent component here
    }


    function handleCategoryDelete(event: React.MouseEvent): void {
        event.preventDefault();
        setVisible(false);
    }

    const inputRef = React.useRef<HTMLInputElement>(null); // Create a ref here

    return visible ? (
        <div className={st.categoryFolders}>
            <FontAwesomeIcon icon={faFolder} className={st.icon} />
            <div className={st.categoryName}>
                {editMode ? (
                    <input
                        className={st.input}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        autoFocus
                        ref={inputRef} // Assign the ref here
                    />
                ) : (
                    <input className={st.input} type="text" value={value} readOnly />
                )}
            </div>
            <div className={st.categoryCount}>0</div>

            {editMode ? (
                <button onClick={handleCategorySave}>Save</button>
            ) : (
                <>
                    <button onClick={handleCategoryChange}>Change</button>
                    <button onClick={handleCategoryDelete}>Delete</button>
                </>
            )}
        </div>
    ) : null;
};


// Define a function that takes input from the user and creates a new component
const CreateComponent: React.FC = () => {
    // Use a state variable to store the input value from the user
    const [inputValue, setInputValue] = useState("");

    // Use another state variable to store an array of user-entered values
    const [values, setValues] = useState<string[]>([]);

    // Define a function to handle the change of the input value
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Define a function to handle the submission of the input value
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Push the input value to the array state variable
        setValues([...values, inputValue]);
        // Clear the input value
        setInputValue("");
    };

    // Define a function to update the values array
    function handleValueUpdate(newInputValue: any, index: number) {
        // Do something to update the values array here, such as using map or splice
        setValues(values.map((value, i) => i === index ? newInputValue : value));
    }

    return (
        <div className={st.categoryBox}>
            <form onSubmit={handleSubmit}>
                <div className={st.categoryFolders}>
                    <FontAwesomeIcon icon={faPlus} className={st.icon} />
                    <div className={st.categoryName}>
                        <input
                            className={st.input}
                            type="text"
                            placeholder="new category"
                            value={inputValue}
                            onChange={handleChange}
                            autoFocus
                        />
                        <button type="submit" onClick={handleSubmit}></button>
                    </div>
                </div>
            </form>
                {/* Map over the values array and render a component for each value */}
            {/* <div className={st.categoryBox}> */}
                {values.map((value, index) => (
                    <CategoryComponent value={value} onUpdate={handleValueUpdate} index={index} /> // Pass the update function and the index as props here
                ))}


                {/* {CategoryComponents} */}
                <div className={st.categoryFoldersBlank}></div>
                <div className={st.categoryFoldersBlank}></div>
                <div className={st.categoryFoldersBlank}></div>
                <div className={st.categoryFoldersBlank}></div>
                <div className={st.categoryFoldersBlank}></div>
                <div className={st.categoryFoldersBlank}></div>
                <div className={st.categoryFoldersBlank}></div>
                <div className={st.categoryFoldersBlank}></div>
            </div>
        // </div>
    );
};

export default CreateComponent;
export const ValuesContext = React.createContext<string[]>([]);
export const SetValuesContext = React.createContext<React.Dispatch<React.SetStateAction<string[]>> | undefined>(undefined);