import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navigations from "./components/Navigations";
import CurrentBalance from "./components/CurrentBalance";
import BalanceList from "./components/BalanceList";
import Listado from "./components/Listado";
import CreateOperacion from "./components/CreateOperacion";
import EditarOperacion from "./components/EditarOperacion";

function App() {
    return (
        <Router>
            <Navigations />
            <Route exact path="/" component={CurrentBalance} />
            <Route exact path="/" component={BalanceList} />

            <Route path="/listado" component={Listado} />
            <Route exact path="/operacion" component={CreateOperacion} />
            <Route
                exact
                path="/:tipoOperacion/:id"
                component={EditarOperacion}
            />
        </Router>
    );
}

export default App;
