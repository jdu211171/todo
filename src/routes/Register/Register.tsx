import React from 'react';
import './style.css'
import { useNavigate } from "react-router-dom";

import axios from "axios";
import * as qs from "qs";
import { stringify } from 'querystring';

// Define an interface for the props of the component
interface RegisterProps {
  
  // You can add any props you need here
}
// Define a functional component that takes the props as an argument


// Define a functional component that takes the props as an argument
const Register: React.FC<RegisterProps> = (props) => {
const navigate = useNavigate();

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Your form submission logic goes here

     // Gather data from the input fields
     const formData = new FormData(event.target);
     const formDataObject: { [key: string]: any } = {};
     formData.forEach((value, key) => {
       formDataObject[key]  = value;
     });
    

    let data = qs.stringify({
      'password': formDataObject['password'],
      'email': formDataObject['email'],
      'username': formDataObject['firstname'] + ' ' + formDataObject['lastname'] 
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/users',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      // just created new user
      // need to post auth data

      //to automatically login after registering
                                   config = {
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


    })
    .catch((error) => {
      console.log(error);
    });
    
  };


  // You can use any state or effect hooks here
  return (
    // Use JSX syntax to render the HTML elements
    <div className="container">
      <div className="logo"></div>

      <div className="form">
        <span className="title">アカウントを作成</span>
        <span className='entrance-span'>お客様の仕事を整理します</span>
        <form onSubmit={handleSubmit} action="" method="">
          <label className='entrance-label' htmlFor="fname">名</label>
          <input className='entrance-input' name="firstname" type="text" placeholder="名を入力してください"/>

          <label className='entrance-label' htmlFor="lname">姓</label>
          <input className='entrance-input' name="lastname" type="text" placeholder="姓を入力してください"/>

          <label className='entrance-label' htmlFor="email">メールアドレス</label>
          <input className='entrance-input' name="email" type="mail" placeholder="お客様のメールアドレス"/>

          <label className='entrance-label' htmlFor="password">パスワード</label>
          <input className='entrance-input' name="password" type="password" placeholder="安全なパスワードを作成してくだいさい"/>

          <label className='entrance-label' htmlFor="rpassword">パスワード再入力</label>
          <input className='entrance-input' name="rpassword" type="password" placeholder="パスワードを繰り返してください"/>

          <button className='entrance-button' type="submit">アカウントを作成</button>
        </form>
        <span className='entrance-span' >現在ログインしていますか？<a className='entrance-a' href={`/login`}>ログイン</a></span>
      </div>
    </div>
  );
};

// Export the component for use in other files
export default Register;
