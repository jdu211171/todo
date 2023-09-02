import "./style.css";
import logo from './logo.png'

// Import the font awesome icons
import { faList, faCalendarDay, faRotateRight, faThumbsUp, faBoxOpen, faTrashCan, faRightFromBracket, faMoon, faFolderPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrentDate from "../Date";
import { Outlet } from "react-router-dom";
// import { useEffect } from "react";

// Define the props type for the component
type DashboardSideBarMenuProps = {
    // You can add any props you need here
};

// Create a component that renders the JSX
function DashboardSideBarMenu(props: DashboardSideBarMenuProps) {

    type ClickEvent = React.MouseEvent<HTMLDivElement>;
    function handleClick(event: ClickEvent) {
        event.preventDefault();
        const sidebar: HTMLElement = document.querySelector('.sidebar') as HTMLElement;
        sidebar.classList.toggle('close');
    }

    return (
        <main className="whole-page container-fluid">

            <nav className="sidebar noselect">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={logo} alt="logo" />
                        </span>
                        <div className="text header-text">
                            <span className="name noselect">NIKKI</span>
                            <span className="profession noselect">Always On Time</span>
                        </div>
                    </div>
                    <div className="toggle cursor" onClick={handleClick}>
                        <FontAwesomeIcon icon={faChevronLeft} />

                    </div>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        {/* Uncomment this section if you want to add a search box */}
                        {/*<li className="search-box">
    <FontAwesomeIcon icon={faSearch} className="icon" />
    <input type="search" placeholder="Search..." />
</li>*/}
                        <CurrentDate />
                        <ul className="menu-links">
                            <li className="nav-link">
                                <a href={`/`}>
                                    <FontAwesomeIcon icon={faList} className="icon" />
                                    <span className="text nav-text">All Tasks</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FontAwesomeIcon icon={faCalendarDay} className="icon" />
                                    <span className="text nav-text">Today's Tasks</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FontAwesomeIcon icon={faRotateRight} className="icon" />
                                    <span className="text nav-text">Repeated Tasks</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FontAwesomeIcon icon={faThumbsUp} className="icon" />
                                    <span className="text nav-text">Completed Tasks</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FontAwesomeIcon icon={faBoxOpen} className="icon" />
                                    <span className="text nav-text">Uncompleted Tasks</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="#">
                                    <FontAwesomeIcon icon={faTrashCan} className="icon" />
                                    <span className="text nav-text">Deleted Tasks</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="/categories">
                                    <FontAwesomeIcon icon={faFolderPlus} className="icon" id="addCategoryIcon" />
                                    <span className="text nav-text addCategory" id="addCategoryText">Categories</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-content">
                        <li className="">
                            <a href="#">
                                <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                <span className="text nav-text">Log Out</span>
                            </a>
                        </li>
                        <li className="mode toggle-switch switch cursor">
                            <div className="moon-sun">
                                <FontAwesomeIcon icon={faMoon} className="fa-solid fa-moon icon moon" />
                                {/* <FontAwesomeIcon icon={faSun} className="fa-solid fa-sun icon sun" /> */}
                            </div>
                            <span className="mode-text text">Dark Mode</span>
                        </li>
                    </div>
                </div>
            </nav>
            <Outlet />
        </main>
    );
}


export default DashboardSideBarMenu; // Export the component
