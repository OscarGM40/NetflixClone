import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { ListProvider } from "./context/listContext/ListContext";
import { MovieProvider } from "./context/movieContext/MovieContext";
import { UserProvider } from "./context/userContext/UserContext";

ReactDOM.render(
  <AuthContextProvider>
    <MovieProvider>
      <ListProvider>
        <UserProvider>
           <App />
        </UserProvider>
      </ListProvider>
    </MovieProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
