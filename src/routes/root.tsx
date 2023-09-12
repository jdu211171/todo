import React from "react";
import "./style.css";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";

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
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrentDate from "../Date";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons/faUserSecret";

// Define the props type for the component
type DashboardSideBarMenuProps = {
  // You can add any props you need here
};

// Create a component that renders the JSX
function DashboardSideBarMenu(props: DashboardSideBarMenuProps) {
  const navigate = useNavigate();
  const CheckUser = () => {
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://" + window.location.hostname + ":3001/api/checkuser",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        // navigate("/login");
      });
  };

  CheckUser();
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
    const sidebar: HTMLElement | null = document.querySelector(".sidebar");
    const screenWidth = window.innerWidth;

    if (sidebar) {
      if (screenWidth <= 600) {
        sidebar.classList.remove("close");
      }
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize();

  const handleLogout = () => {
    // Perform logout actions, e.g., clear authentication token or user data
    // For example, if you're using localStorage for the token:
    localStorage.removeItem("token");

    // Redirect the user to the logout page (assuming "/LogOut" is your logout page)
    window.location.reload();
  };

  function changeOnStatus() {
    const createAccount = (
      <div className="bottom-content">
        <li className="LogStatus">
          <Link to="/login">
            <div  className="icon" />
            <div className="UserData"><FontAwesomeIcon icon={faUserSecret} />ゲスト</div>
          </Link>
        </li>
        <li className="LogStatus">
          <Link to="/login">
          <FontAwesomeIcon icon={faRightToBracket} className="icon" />
            {/* <FontAwesomeIcon icon={faUserPlus}  /> */}
            <span className="text nav-text">ログイン</span>
          </Link>
        </li>
      </div>
    );

    const logOut = (
      <div className="bottom-content">
        <li className="LogStatus">
          <Link to="/login">
            <div  className="icon" />
            <div className="UserData" >Botirov Saydiakhror</div>
          </Link>
        </li>
        <li className="LogStatus">
          <Link to="/" onClick={handleLogout}>
            
            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
            <span className="text nav-text">ログアウト</span>
          </Link>
        </li>
      </div>
    );
    // console.log
    return localStorage.hasOwnProperty("token") ? logOut : createAccount;
  }

  return (
    <main className="whole-page container-fluid">
      <nav className="sidebar noselect someClass">
        <header>
          <div className="image-text">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <div className="text header-text">
              <span className="name noselect">NIKKI</span>
              <span className="profession noselect">いつも時間通り</span>
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
              <span className="profession noselect">いつも時間通り</span>
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
                <Link to={`/`}>
                  <FontAwesomeIcon icon={faList} className="icon" />
                  <span className="text nav-text">すべてのタスク</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/today">
                  <FontAwesomeIcon icon={faCalendarDay} className="icon" />
                  <span className="text nav-text">今日のタスク</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/schedule">
                  <FontAwesomeIcon icon={faCalendarDays} className="icon" />
                  <span className="text nav-text">スケジュール</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="#">
                  <FontAwesomeIcon icon={faRotateRight} className="icon" />
                  <span className="text nav-text">繰り返されるタスク</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/completed">
                  <FontAwesomeIcon icon={faThumbsUp} className="icon" />
                  <span className="text nav-text">完了したタスク</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/uncompleted">
                  <FontAwesomeIcon icon={faBoxOpen} className="icon" />
                  <span className="text nav-text">未完了のタスク</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/categories">
                  <FontAwesomeIcon
                    icon={faFolderPlus}
                    className="icon"
                    id="addCategoryIcon"
                  />
                  <span
                    className="text nav-text"
                    id="addCategoryText"
                  >
                    カテゴリー一覧
                  </span>
                </Link>
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
