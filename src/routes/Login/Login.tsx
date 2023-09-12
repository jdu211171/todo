import style from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";
import * as qs from "qs";
import { Link } from "react-router-dom";

function Login() {
  // Use state hooks to store the user's email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  // Use navigate hook to navigate to other pages
  const navigate = useNavigate();

  // A function that handles the form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    // Prevent the default browser behavior
    e.preventDefault();

    // Gather data from the input fields
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      console.log(key, value);
      formDataObject[key] = value;
    });

    let data = qs.stringify({
      password: formDataObject["password"],
      email: formDataObject["email"],
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://" + window.location.hostname + ":3001/api/auth",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // You can replace this with your own logic
        const token = response.data.token
        console.log(token);
        // Save the user token and status in localStorage
        localStorage.setItem("user", "true");
        localStorage.setItem("token", token);

        // Navigate to the home page
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "メールアドレスまたはパスワードが無効です。もう一度お試しください。",
          showConfirmButton: false,
          timer: 1000,
        });
        if (error.response && error.response.status === 401) {
          // Display an error message when status is 401 (Unauthorized)
          setErrorMessage("メールアドレスまたはパスワードが無効です。もう一度お試しください。");
        } else {
          // Handle other errors as needed
          setErrorMessage("エラーが発生しました。後でもう一度お試しください。");
        }
      });
  };

  return (
    <div className={style.container + ' ' + style.container} >
      <div className={style.form}>
        <span className={style.title}>ログイン</span>
        <span className={style.entranceSpan}>お客様の仕事を整理します</span>
        
        <form onSubmit={handleSubmit}>
          <label className={style.entranceLabel} htmlFor="email">
            メールアドレス
          </label>
          <input
            className={style.entranceInput}
            id="email"
            name="email"
            type="text"
            placeholder="お客様のメールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={style.entranceLabel} htmlFor="password">
            パスワード
          </label>
          <input
            className={style.entranceInput}
            id="password"
            name="password"
            type="password"
            placeholder="お客様のパスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          
          <button
            className={style.entranceButton}
            type="submit"
            onSubmit={handleSubmit}
          >
            ログイン
          </button>
        </form>

        {errorMessage && (
          <div className={style.error}>{errorMessage}</div>
        )}
        <span className={style.entranceSpan}>
          アカウントをお持ちでないですか？
          <Link className={style.entranceA} to={`/register`}>
            アカウントを作成
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
