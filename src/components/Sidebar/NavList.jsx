import React from 'react';
import { NavLink } from 'react-router-dom';

function NavList({items}) {
    return (
        <nav className='nav-list'>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.link} >
                            {item.icon}{item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NavList;