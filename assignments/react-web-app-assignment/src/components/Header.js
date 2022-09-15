import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const navLinks = [
        {
            name: "Home",
            url: "/",
        },
    ];

    return (
        <header className="page-header">
            <Link to="/">
                <h1>Music Sharing</h1>
            </Link>
            <nav className="main-menu">
                <ul>
                    {navLinks.map((link) => {
                        <Link key={link.url} to={link.url}>
                            <li>
                                {link.name}
                            </li>
                        </Link>
                    })}
                </ul>
            </nav>
        </header>
    );

}