import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigations from './components/Navigations';
import CurrentBalance from './components/CurrentBalance';
import BalanceList from './components/BalanceList';
import Listado from './components/Listado'
import CreateOperacion from './components/CreateOperacion'


function App() {
  return (
    <Router>

      <Navigations />
      <Route path="/" component={CurrentBalance} exact />
      <Route path="/" component={BalanceList} exact />

      <Route path="/listado" component={Listado} />
      <Route path="/operacion" component={CreateOperacion} />

    </Router>
  );
}

export default App;
