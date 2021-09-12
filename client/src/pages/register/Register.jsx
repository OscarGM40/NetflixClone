import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import "./register.scss";

const Register = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (event) => {
    event.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);   
    // console.log(email,password,username)
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`,{ email,username, password });
      history.push("/login ")
      
    } catch (error) {
      console.log(error?.response?.data) 
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="/images/Netflixlogo.png"
            className="logo"
            alt=""
          />
          <a className="loginButton" href="/login" >Sign In</a>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="text" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
               Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
