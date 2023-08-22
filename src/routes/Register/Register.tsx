import React from 'react';
import './style.css'

// Define an interface for the props of the component
interface RegisterProps {
  // You can add any props you need here
}
function handleSubmit() {

}
// Define a functional component that takes the props as an argument
const Register: React.FC<RegisterProps> = (props) => {
  // You can use any state or effect hooks here
  return (
    // Use JSX syntax to render the HTML elements
    <div className="container">
      <div className="logo"></div>

      <div className="form">
        <span className="title">Create your account</span>
        <span className='entrance-span'>organize your work</span>
        <form action="" method="">
          <label className='entrance-label' htmlFor="fname">first name</label>
          <input className='entrance-input' name="firstname" type="text" placeholder="Write your first name"/>

          <label className='entrance-label' htmlFor="lname">last name</label>
          <input className='entrance-input' name="lastname" type="text" placeholder="Write your last name"/>

          <label className='entrance-label' htmlFor="email">email address</label>
          <input className='entrance-input' name="email" type="mail" placeholder="Enter your email"/>

          <label className='entrance-label' htmlFor="password">password</label>
          <input className='entrance-input' name="password" type="password" placeholder="Create a secure password"/>

          <label className='entrance-label' htmlFor="rpassword">repeat password</label>
          <input className='entrance-input' name="rpassword" type="password" placeholder="Write password one more time"/>

          <button className='entrance-button' type="submit">Create account</button>
        </form>
        <span className='entrance-span' obSubmit={handleSubmit}>Already have an account?<a className='entrance-a' href={`/login`}>Log in</a></span>
      </div>
    </div>
  );
};

// Export the component for use in other files
export default Register;
