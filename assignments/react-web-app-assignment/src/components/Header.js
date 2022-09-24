import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Header() { 
    const location = useLocation()
    
    return (
        <header className="page-header">
            {location.pathname !=="/" && 
                <Link to="/">
                    <button><FontAwesomeIcon icon={faArrowLeft} /></button>
                </Link>
            }
            
            <h1>OgCiSum</h1>
            <p>Create and Share Samples, Listen in Mobile App!</p>
        </header>
    );

}