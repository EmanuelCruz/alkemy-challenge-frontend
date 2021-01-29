import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navigations from "./components/Navigations";
import CurrentBalance from "./components/CurrentBalance";
import BalanceList from "./components/BalanceList";
import List from "./components/List";
import CreateOperation from "./components/CreateOperation";
import EditOperation from "./components/EditOperation";

function App() {
    return (
        <Router>
            <Navigations />
            <Route exact path="/" component={CurrentBalance} />
            <Route exact path="/" component={BalanceList} />

            <Route path="/list" component={List} />
            <Route exact path="/operations" component={CreateOperation} />
            <Route exact path="/operation/:id" component={EditOperation} />
        </Router>
    );
}

export default App;
