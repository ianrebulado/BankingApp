import React from 'react';

function NavList({items}) {
    return (
        <nav className='nav-list'>
            <ul>
                {items.map((item, index) => (
                    <li key={index}><a href=''>{item.icon}{item.label}</a></li>
                ))}
            </ul>
        </nav>
    );
}

export default NavList;