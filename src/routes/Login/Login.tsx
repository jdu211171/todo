import "../Register/style.css";
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
      url: "http://localhost:3001/api/auth",
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
    <div className="entrance-container">
      <div className="logo"></div>

      <div className="form">
        <span className="title">Login to Account</span>
        <span className="entrance-span">organize your work</span>
        <form onSubmit={handleSubmit}>
          <label className="entrance-label" htmlFor="email">
            Email
          </label>
          <input
            className="entrance-input"
            id="email"
            name="email"
            type="text"
            placeholder="Write your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="entrance-label" htmlFor="password">
            password
          </label>
          <input
            className="entrance-input"
            id="password"
            name="password"
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="entrance-button"
            type="submit"
            onSubmit={handleSubmit}
          >
            Log In
          </button>
        </form>
        <span className="entrance-span">
          Don't have an account?
          <a className="entrance-a" href={`/register`}>
            Create one
          </a>
        </span>
      </div>
    </div>
  );
}

export default Login;
