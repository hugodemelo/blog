import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
import NavBar from "./NavBar";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <NavBar />
                <div id="page-body">
                    <Switch>
                        <Route exact path={"/"} component={Home} />
                        <Route exact path={"/about"} component={About} />
                        <Route exact path={"/articles"} component={Articles} />
                        <Route exact path={"/article/:name"} component={Article} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;
