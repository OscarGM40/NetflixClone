import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../authContext/AuthApiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";

const Login = () => {

  const { dispatch } = useContext(AuthContext);
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    loginCall({email,password},dispatch)
    
  }
  
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            // src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            src="/images/Netflixlogo.png"
            className="logo"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form >
          <h1>Sign In</h1>
          <input
            type="email"
            name={email}
            placeholder="Email or phone number"
            onChange={ (e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name={password}
            onChange={ (e) => setPassword(e.target.value)}
            />
          <button className="loginButton"
          onClick={handleLogin}
          >Sign In</button>
          <span>New to Netflix? 
            <Link to="/register" className="link">
            <b> Sign up now.</b>
            </Link>
          </span>
          <small>
            This page is prtected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
