import React, { useEffect, useState } from "react";
import "../general.css";
import Button from "../filters/createButton";
import st from "./categories.module.css";
import Folder from "./Folders";
import toastr from "toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faThumbtack,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import * as qs from "qs";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Modify your handleSubmit function to use the addCategoryToLocal function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user is a guest (not logged in)
    const isGuest = !localStorage.getItem("token");

    if (isGuest) {
      addCategoryToLocal(inputValue); // Add the new category to localStorage

      // Clear the input field and trigger a fetch if needed
      setInputValue("");
      triggerFetch();
    } else {
      // User is logged in, make the API request as before
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
    }
  };

  // Function to fetch categories either from API or localStorage
  async function fetchCategories() {
    const token = localStorage.getItem("token");
    const isGuest = !token; // Check if the user is a guest (no token)

    if (isGuest) {
      // If the user is a guest, get categories from localStorage
      const categoriesFromLocal = getCategoriesFromLocalWithTaskCount();
      return categoriesFromLocal;
    } else {
      // If the user is authenticated, fetch categories from the API
      const config = {
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
  }

  const triggerFetch = async () => {
    try {
      const data = await fetchCategories();
      ;
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
        <h1>カテゴリー</h1>
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
                placeholder="新規カテゴリー"
                value={inputValue}
                onChange={handleChange}
              />
            </div>
            <button type="submit"></button>
          </div>
        </form>

        <Folder categories={categories} triggerFetch={triggerFetch} />

        <div className={st.categoryFoldersBlank}></div>
        <div className={st.categoryFoldersBlank}></div>
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

// Function to add a new category to localStorage
function addCategoryToLocal(categoryName) {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  // Check if the category already exists
  const categoryExists = categories.some(
    (category) => category.CategoryName === categoryName
  );

  if (categoryExists) {
    toastr.error("This Category Name exists. Try another name!");
  } else {
    // Add the new category to the categories array
    const newCategory = {
      CategoryID: categories.length + 1, // Generate a unique ID
      CategoryName: categoryName,
    };
    categories.push(newCategory);

    // Save the updated categories array back to localStorage
    localStorage.setItem("categories", JSON.stringify(categories));
  }
}

// Function to get categories from localStorage with task counts
function getCategoriesFromLocalWithTaskCount() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Create an object to store category IDs and their corresponding task counts
  const categoryTaskCounts = {};

  // Count tasks for each category
  tasks.forEach((task) => {
    const categoryId = task.CategoryID;
    if (categoryId) {
      categoryTaskCounts[categoryId] =
        (categoryTaskCounts[categoryId] || 0) + 1;
    }
  });

  // Add task counts to each category
  categories.forEach((category) => {
    const categoryId = category.CategoryID;
    category.taskCount = categoryTaskCounts[categoryId] || 0;
  });

  return categories;
}
