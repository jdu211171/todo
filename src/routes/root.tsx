import "./style.css";
import logo from "./logo.png";

// Import the font awesome icons
import {
  faList,
  faCalendarDay,
  faUserPlus,
  faRotateRight,
  faThumbsUp,
  faBoxOpen,
  faTrashCan,
  faCircleChevronRight,
  faRightFromBracket,
  faMoon,
  faSun,
  faFolderPlus,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrentDate from "../Date";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Define the props type for the component
type DashboardSideBarMenuProps = {
  // You can add any props you need here
};

// Create a component that renders the JSX
function DashboardSideBarMenu(props: DashboardSideBarMenuProps) {
  type ClickEvent = React.MouseEvent<HTMLDivElement>;
  function handleClick(event: ClickEvent) {
    event.preventDefault();
    const sidebar: HTMLElement = document.querySelector(
      ".sidebar"
    ) as HTMLElement;
    sidebar.classList.toggle("close");
  }

  // Function to handle screen resize
  function handleResize() {
    const sidebar: HTMLElement = document.querySelector(
      ".sidebar"
    ) as HTMLElement;
    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
      // If the screen width is smaller or equal to 600px, remove the "close" class
      sidebar.classList.remove("close");
    }
  }

  // Attach an event listener to the window's resize event
  window.addEventListener("resize", handleResize);

  // Call handleResize initially to ensure correct behavior on page load
  handleResize();

  function changeOnStatus() {
    const createAccount = (
      <div className="bottom-content">
        <li className="LogStatus">
          <a href="/login">
            <FontAwesomeIcon icon={faUserPlus} className="icon" />
            <span className="text nav-text">Login</span>
          </a>
        </li>
      </div>
    );

    const logOut = (
      <div className="bottom-content">
        <li className="LogStatus">
          <a href="#">
            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
            <span className="text nav-text">Log Out</span>
          </a>
        </li>
      </div>
    );
    return localStorage.hasOwnProperty("token") ? logOut : createAccount;
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
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <CurrentDate />
        </header>

        <div className="header2">
          <div className="image-text">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <div className="text header-text">
              <span className="name noselect">NIKKI</span>
              <span className="profession noselect">Always On Time</span>
            </div>
          </div>
          <CurrentDate />
        </div>

        <div className="menu-bar">
          <div className="menu">
            {/* Uncomment this section if you want to add a search box */}
            {/*<li className="search-box">
<FontAwesomeIcon icon={faSearch} className="icon" />
<input type="search" placeholder="Search..." />
</li>*/}
            {/* <CurrentDate /> */}
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
                  <FontAwesomeIcon
                    icon={faFolderPlus}
                    className="icon"
                    id="addCategoryIcon"
                  />
                  <span
                    className="text nav-text addCategory"
                    id="addCategoryText"
                  >
                    Categories
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {changeOnStatus()}
        </div>
      </nav>
      <Outlet />
    </main>
  );
}

export default DashboardSideBarMenu; // Export the component
