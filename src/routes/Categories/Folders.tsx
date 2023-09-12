import React, { useState } from "react";
import st from "./categories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import {
  faThumbtack,
  faEdit,
  faTrash,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import qs from "qs";

const Folder = ({ categories, triggerFetch }: any) => {
  const [editModeFolderId, setEditModeFolderId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleEditClick = (category: any) => {
    // Set the currently edited folder
    setEditModeFolderId(category.CategoryID);
    setNewCategoryName(category.CategoryName);
  };

  const handleSaveClick = (category: any) => {
    console.log(category.CategoryID);
    // console.log(newCategoryName)
    // Make an Axios request to update the category name
    let data = qs.stringify({
      categoryName: newCategoryName,
    });
    const token = localStorage.getItem("token");

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url:
        "http://" +
        window.location.hostname +
        ":3001/api/categories/" +
        category.CategoryID,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        handleCancelClick();
        triggerFetch();
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelClick = () => {
    // Cancel the edit mode
    setEditModeFolderId(null);
  };

  const handleDeleteClick = (category: any) => {
    const token = localStorage.getItem("token");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url:
        "http://" +
        window.location.hostname +
        ":3001/api/categories/" +
        category.CategoryID,
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    Swal.fire({
      title: "本当に削除しますか？",
      text: "フォルダが削除されると、内部のタスクも削除されます。",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            triggerFetch(); // Trigger the fetch function here
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <>
      {categories.map((category: any) => (
        <div className={st.categoryFolders} key={category.CategoryID}>
          <div className={st.buttons}>
            {editModeFolderId === category.CategoryID ? (
              <>
                <div onClick={() => handleSaveClick(category)}>
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className={st.button + " " + st.update}
                  />
                </div>

                <div onClick={handleCancelClick}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={st.button + " " + st.cancel}
                  />
                </div>
              </>
            ) : (
              <>
                <div onClick={() => handleEditClick(category)}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={st.button + " " + st.update}
                  />
                </div>
                <div onClick={() => handleDeleteClick(category)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={st.button + " " + st.delete}
                  />
                </div>
              </>
            )}
          </div>
          <FontAwesomeIcon icon={faThumbtack} className={st.icon} />
          <div className={st.categoryName}>
            {editModeFolderId === category.CategoryID ? (
              <input
                className={st.UpdateCategory}
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                
              />
            ) : (
              category.CategoryName
            )}
          </div>
          <div className={st.categoryCount}>{category.taskCount}</div>
        </div>
      ))}
    </>
  );
};

export default Folder;
