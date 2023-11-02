import React from 'react';
import { Link } from 'react-router-dom';

function NavList({items}) {
    return (
        <nav className='nav-list'>
            <ul>
                {items.map((item, index) => (
                    <li key={index}><Link to={item.link}>{item.icon}{item.label}</Link></li>
                ))}
            </ul>
        </nav>
    );
}

export default NavList;