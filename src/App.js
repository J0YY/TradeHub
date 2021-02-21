import "./App.css";
import Nav from "./Header/nav";
import NewsFeed from "./Blog/Newsfeed";
import Stats from "./Portfolio/Stats";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import Learn from "./Learn/Learn";
import Community from "./Blog/Community";
import FlipMove from "react-flip-move";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/learn">
            <Learn />
          </Route>
          <Route path="/share">
            <Community />
          </Route>
          <Route path="/portfolio">
            {!user ? (
              <Login />
            ) : (
                <>
                  <div className="app__header">
                    <Nav />
                  </div>
                  <div className="app__body">
                    <div className="app__container">
                      <h1>{user.displayName}'s Portfolio</h1>
                      <NewsFeed />
                      <Stats />
                    </div>
                  </div>
                </>
              )}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>



        </Switch>
      </Router>

    </div>
  );
}

export default App;
