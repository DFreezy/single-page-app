import React from 'react';
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <nav role="navigation" aria-label="Main Navigation">
            <ul className='navbar'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
}
