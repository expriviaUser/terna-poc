import myLogo from "./assets/2loghi.svg";
import profile from "./assets/frame-profilo.svg";
import React from "react";
import {NavLink, useLocation} from "react-router-dom";

export function AppLayout (props) {
    const location = useLocation();
    const logged = location.pathname !== '/';
    return <div className="App">
        <header className="App-header">
            <img src={myLogo} alt="Description" width="300" />
            {logged && <nav>
                <ul className="nav">
                    <li className="nav-item"><NavLink className='nav-link' to="/misuratore">Gestione
                        Misuratori</NavLink></li>
                    <li className="nav-item"><NavLink className='nav-link' to="/misurazioni">Validazione misure</NavLink></li>
                    <li className="nav-item"><NavLink className='nav-link' to="/reportistica">Reportistica</NavLink>
                    </li>
                </ul>
            </nav>}
            {logged && <img src={profile} alt="Description" width="300"/>}
        </header>
        {props.children}
    </div>
}