import React, { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarControl from './SidebarControl';
import NavList from './NavList';


function Sidebar({isOpen, navItems}) {
   
    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <SidebarHeader />
                <NavList items={navItems} />
                <SidebarControl />
            </div>
        </>
    );
}

export default Sidebar;