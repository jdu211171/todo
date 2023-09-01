// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import st from "./categories.module.css";
// import { faPlus, faFolder } from "@fortawesome/free-solid-svg-icons";
// import React, { useState } from "react"; // Import React and useState hook

// // Define a function that creates a new category with a folder icon
// const newCategoryForm = () => {



//     function handleSubmit(e: any) {
//         e.preventDefault();
//         console.log("new category created");

//     }

//     return (
//         <form method="post">
//             <div className={st.categoryFolders}>
//                 <FontAwesomeIcon icon={faFolder} className={st.icon} />
//                 <div className={st.categoryName}><input type="text" placeholder="Category name" /></div>
//                 <div className={st.categoryCount}>0</div>
//                 <button type="submit" onClick={handleSubmit}></button>
//             </div>
//         </form>
//     )
// }

// export default function CreateCategory() {
//     // Use a state variable to store the visibility of the newCategoryForm
//     const [showNewCategory, setShowNewCategory] = useState(false);

//     // Define a function to toggle the visibility of the newCategoryForm
//     const handleCreateCategory = () => {
//         setShowNewCategory(!showNewCategory);
//     }

//     return (
//         <div className={st.categoryFolders}>
//             {/* Add an onClick handler to the CreateCategory component */}
//             <FontAwesomeIcon icon={faPlus} className={st.icon} onClick={handleCreateCategory} />
//             <div className={st.createCategory}>Add New Category</div>
//             {showNewCategory && newCategoryForm()}
//         </div>
//     )
// }


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import st from "./categories.module.css";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react"; // Import React and useState hook

// Define a function that renders a component based on the user-entered value
const CategoryComponent: React.FC<{ value: string }> = (props) => {
    const { value } = props;

    return (
        <div className={st.categoryFolders}>
            <FontAwesomeIcon icon={faFolder} className={st.icon} />
            <div className={st.categoryName}>
                <input className={st.input} type="text" value={value} readOnly />
            </div>
            <div className={st.categoryCount}>0</div>
        </div>
    );
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={st.categoryFolders}>
                    <FontAwesomeIcon icon={faFolder} className={st.icon} />
                    <div className={st.categoryName}>
                        <input
                            className={st.input}
                            type="text"
                            placeholder="new category"
                            value={inputValue}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit}></button>
                </div>
            </form>
            {/* Map over the values array and render a component for each value */}
            {values.map((value) => (
                <CategoryComponent value={value} />
            ))}
        </div>
    );
};

export default CreateComponent;
