import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import ListOfList from "./pages/listOfLists/ListOfList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

function App() {
  const { user, error } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        {!user && <Login />}
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {error && <h1>No admin??</h1>}
        {user && (
          <>
            <div className="App">
              <Topbar />
              <div className="container">
                <Sidebar />

                <Route exact path="/">
                  <Home />
                </Route>

                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>

                <Route path="/movies">
                  <MovieList />
                </Route>
                <Route path="/movie/:movieId">
                  <Movie />
                </Route>
                <Route path="/newMovie">
                  <NewMovie />
                </Route>
                <Route path="/lists">
                  <ListOfList />
                </Route>
                <Route path="/list/:listId">
                  <List />
                </Route>
                <Route path="/newList">
                  <NewList />
                </Route>
              </div>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
