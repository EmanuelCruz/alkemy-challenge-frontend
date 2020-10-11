import React from "react";
import { Link } from "react-router-dom";

export default function Navigations() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            BalanceApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/operacion">
                  Operaciones
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/listado">
                  Listado
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
