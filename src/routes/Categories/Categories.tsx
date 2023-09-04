import React, { useEffect, useState } from "react";
import "../general.css";
import Button from "../filters/createButton";
import st from "./categories.module.css";
import Folder from "./Folders";
import toastr from "toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faThumbtack, faFolder } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import * as qs from "qs";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = qs.stringify({
      categoryName: inputValue,
    });
    const token = localStorage.getItem("token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://" + window.location.hostname + ":3001/api/categories",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setInputValue("");
        triggerFetch();
      })
      .catch((err) => {
        if (err.response) {
          toastr.error("This Category Name exists. Try another name!");
        }
      });
  };

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
      throw error;
    }
  }

  const triggerFetch = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    triggerFetch();
  }, []);

  return (
    <div className="content">
      <div className="top">
        <h1>Categories</h1>
        <div className="filters"></div>
      </div>

      <div className={st.categoryBox}>
        <form onSubmit={handleSubmit}>
          <div className={st.categoryFolders}>
            <FontAwesomeIcon icon={faFolder} className={st.icon} />
            <div className={st.categoryName}>
              <input
                className={st.input}
                type="text"
                placeholder="New Category"
                value={inputValue}
                onChange={handleChange}
              />
            </div>
            <button type="submit"></button>
          </div>
        </form>

        <div className={st.categoryFolders}>
          <FontAwesomeIcon icon={faThumbtack} className={st.icon} />
          <div className={st.categoryName}>All</div>
          <div className={st.categoryCount}>12</div>
        </div>

        <Folder categories={categories} triggerFetch={triggerFetch} />

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
