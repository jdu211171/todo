import React, { useEffect, useState } from "react";
import "../general.css";
import Button from "../filters/createButton";
import st from "./categories.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import * as qs from "qs";
import { faClipboard, faThumbtack } from "@fortawesome/free-solid-svg-icons";

async function fetchTaskData() {
  const data = qs.stringify({});
  const token = localStorage.getItem("token");
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3001/upcoming",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log("Error fetching task data:", error);
    throw error;
  }
}

export default function Categories() {
  const [taskdata, setTaskdata] = useState([]);

  useEffect(() => {
    fetchTaskData()
      .then((data) => {
        setTaskdata(data);
      })
      .catch((error) => {
        // Handle error if needed
      });
  }, []);

  return (
    <div className="content">
      <div className="top">
        <h1>All tasks</h1>

        <div className="filters">
          <div className="allbuttons">
            <Button />
          </div>
        </div>
      </div>

      <div className={st.categoryBox}>
        <div className={st.categoryFolders}>
          <FontAwesomeIcon icon={faThumbtack} className={st.icon} />
          <div className={st.categoryName}>All</div>
          <div className={st.categoryCount}>12</div>
        </div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>
        <div className={st.categoryFolders}>1</div>

        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
      </div>
    </div>
  );
}
