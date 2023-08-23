import "../Register/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // Use state hooks to store the user's email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  // Use navigate hook to navigate to other pages
  const navigate = useNavigate();

  // A function that handles the form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    // Prevent the default browser behavior
    e.preventDefault();

    // Simulate an API call that returns a user token
    // You can replace this with your own logic
    const token = "some-random-token";

    // Save the user token and status in localStorage
    localStorage.setItem("user", "true");
    localStorage.setItem("token", token);

    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="entrance-container">
      <div className="logo"></div>

      <div className="form">
        <span className="title">Login to Account</span>
        <span className="entrance-span">organize your work</span>
        <form onSubmit={handleSubmit} >
          <label className="entrance-label" htmlFor="email">Email</label>
          <input className="entrance-input"
            id="email"
            name="email"
            type="text"
            placeholder="Write your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="entrance-label" htmlFor="password">password</label>
          <input className="entrance-input"
            id="password"
            name="password"
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="entrance-button" type="submit" onSubmit={handleSubmit}>Log In</button>
        </form>
        <span className="entrance-span">
          Don't have an account?<a className="entrance-a" href={`/register`}>Create one</a>
        </span>
      </div>
    </div>
  );
}

export default Login;
