import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./authContext/AuthContext";

ReactDOM.render(
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>,
  document.getElementById("root")
);
