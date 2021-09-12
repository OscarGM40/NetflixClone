import { useContext, useState } from "react";
import { loginCall } from "../../context/authContext/AuthApiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

const Login = () => {
  const { isFetching, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    //recuerda que el usó apiCalls
    loginCall({ email, password }, dispatch);
  };

  return (
    // TODO puedo usar mdb-login,sea lo que sea cambialo
    <>
      <div className="container vh-100">
        <div className="row w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="col-6">
            <form className="w-100">
              <div className="form-outline border rounded-3 mb-4">
                <input
                  type="email"
                  id="form1Example1"
                  className="form-control"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  />
                <label className="form-label" htmlFor="form1Example1">
                  Email address
                </label>
              </div>

              <div className="form-outline border rounded-3 mb-4">
                <input
                  type="password"
                  id="form1Example2"
                  className="form-control"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
                <label className="form-label" htmlFor="form1Example2">
                  Password
                </label>
              </div>

              <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="col">
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              <button type="submit" 
                className="btn btn-primary btn-block"
                onClick={handleLogin}
                disabled={isFetching}
                >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
