import { Link } from "react-router-dom";
import "./ErrorPage.css";
import Icon from './assets/undraw_page_not_found_re_e9o6.svg'
import ErrorPagebtn from "./ErrorPagebtn";

type ErrorPageProps = {
    // You can add any props you need here
    // For example, you can pass a message prop to display the error message
    message: string;
};

const ErrorPage = (props: ErrorPageProps) => {
    // Destructure the message prop from the props object
    const { message } = props;

    return (
        <div className="error-page">
            <div className="error-contents">
                <div className="error-image">
                    <img src={Icon} alt="Error" />
                </div>
                <div className="error-content">
                    {/* Use a large font size and a red color for the error code */}
                    {/* <h1 style={{ fontSize: "5rem", color: "red" }}>404</h1> */}
                    {/* Use a smaller font size and a gray color for the error message */}
                    <p>{message}</p>
                    {/* Use a link to redirect the user to the home page or any other page */}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <ErrorPagebtn />
                        {/* <button style={{ padding: "0.5rem 1rem", color: "white", backgroundColor: "blue" }}>
                            Go back to home page
                        </button> */}
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Export the ErrorPage component as a default export
export default ErrorPage;