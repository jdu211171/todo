import React, { useContext, useEffect, useState } from "react";
import "../general.css";
import Button from "../filters/createButton";
import st from "./categories.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import * as qs from "qs";
import CreateCategory, { CategoryComponent } from "./CreateCategory";

async function fetchCategories() {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://" + window.location.hostname + ":3001/api/categories",
    headers: {
      Authorization: "Bearer " + token,
    },
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



  const [categories, setCategories] = useState([]);
  console.log(categories)
  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        // Handle error if needed
      });
  }, []);

  const CategoryComponents = categories.map((category) => (
    <div className={st.categoryFolders} key={category.CategoryID}>
      <FontAwesomeIcon icon={faThumbtack} className={st.icon} />
      <div className={st.categoryName}>{category.CategoryName}</div>
      <div className={st.categoryCount}>12</div>
    </div>
  ));

  function handleValueUpdate(newInputValue: string, index: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="content">
      <div className="top">
        <h1>Categories</h1>
        <div className="filters">
          <div className="allbuttons">
            {/* this is just for design */}
            <div className={st.categoryFolders}>
              <FontAwesomeIcon icon={faThumbtack} className={st.icon} />
              <div className={st.categoryName}>All</div>
              <div className={st.categoryCount}>12</div>
            </div>
            {/* this is just for design */}

          </div>
        </div>
      </div>

      <CreateCategory />
      {/* <div className={st.categoryBox}>


        {CategoryComponents}
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
      </div> */}
    </div>
  );
}
