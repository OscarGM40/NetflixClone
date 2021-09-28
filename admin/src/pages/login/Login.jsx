import { useContext, useState } from "react";
import { loginCall } from "../../context/authContext/AuthApiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import styled from "styled-components";
import { mediumScreens, mobilelandscape, mobileportrait, tablet } from "../../helpers/mediaQueries";


const Container = styled.div`
  width:100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255,0.5),
    rgba(255, 255, 255,0.3)
  ),url("https://images.pexels.com/photos/4157187/pexels-photo-4157187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width:40%;
  padding: 20px;
  background-color:  #ffffff22;
  border-radius: 15px;
  ${ mediumScreens( { width:"50%"} ) };
  ${ tablet( { width:"65%"} ) };
  ${ mobilelandscape( { width:"75%"} ) };
  ${ mobileportrait( { width:"80%"} ) };
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
`;

const Input = styled.input`
  flex:1;
  min-width:40%;
  margin: 20px 0px;
  padding:15px;
  font-size: 16px;
  border-radius: 15px;
  outline:none;
`

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
  font-size: 14px;
  font-weight: 300;
  border-radius: 5px;
  transition: all 0.4s linear;

  &:hover {
    background-color: #014747;
  }
`;

const Link = styled.a`
  margin: 5px 0px;  
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

/* Begin of the component */
const Login = () => {

  const { isFetching, dispatch } = useContext(AuthContext);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  };

  return (
    <>
      <Container>
        <Wrapper>
            <Form>
              <Title>LOGIN AS ADMIN</Title>
                <Input
                  placeholder="enter email"
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  />
                <Input
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              <Button  
                onClick={handleLogin}
                disabled={isFetching}
                >
              ACCESS (Only Admins)
              </Button>
              <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
              <Link target="_blank" href={`${process.env.REACT_APP_CLIENT_URL}/register`}>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
