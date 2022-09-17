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
            <h1>OgCiSum</h1>
            <p>Create and Share Samples, Listen in Mobile App!</p>
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