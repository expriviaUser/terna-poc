import myLogo from "./assets/2loghi.svg";
import profile from "./assets/frame-profilo.svg";
import React from "react";
import { Link } from "react-router-dom";

export function AppLayout (props) {
    return <div className="App">
        <header className="App-header">
            <img src={myLogo} alt="Description" width="300" />
            {/* <Router>
      <nav>
        <ul>
          <li><Link to="/misuratori">Gestione Misuratori</Link></li>
          <li><Link to="/">Validazione misure</Link></li>
          <li><Link to="/reportistica">Reportistica</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/misuratori" element={<Misuratori />} />
        <Route path="/" element={<App />} />
        <Route path="/reportistica" element={<Reportistica />} />
      </Routes>
    </Router> */}
            <nav>
                <ul>
                    <li><Link to="/misuratori">Gestione Misuratori</Link></li>
                    <li><Link to="/">Validazione misure</Link></li>
                    <li><Link to="/reportistica">Reportistica</Link></li>
                </ul>
            </nav>
            <img src={profile} alt="Description" width="300" />
        </header>
        {props.children}
    </div>
}