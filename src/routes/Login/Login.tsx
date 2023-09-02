import style from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import * as qs from "qs";

function Login() {
  // Use state hooks to store the user's email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      });
  };

  return (
    <div className={style.container + ' ' + style.container} >

      <div className={style.form}>
        <span className={style.title}>Login to Account</span>
        <span className={style.entranceSpan}>organize your work</span>
        <form onSubmit={handleSubmit}>
          <label className={style.entranceLabel} htmlFor="email">
            Email
          </label>
          <input
            className={style.entranceInput}
            id="email"
            name="email"
            type="text"
            placeholder="Write your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={style.entranceLabel} htmlFor="password">
            password
          </label>
          <input
            className={style.entranceInput}
            id="password"
            name="password"
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={style.entranceButton}
            type="submit"
            onSubmit={handleSubmit}
          >
            Log In
          </button>
        </form>
        <span className={style.entranceSpan}>
          Don't have an account?
          <a className={style.entranceA} href={`/register`}>
            Create one
          </a>
        </span>
      </div>
    </div>
  );
}

export default Login;
