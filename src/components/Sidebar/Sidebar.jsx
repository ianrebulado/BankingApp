import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarControl from './SidebarControl';
import NavList from './NavList';

function Sidebar({navItems}) {
    return (
        <>
            <div className="sidebar">
                <SidebarHeader />
                <NavList items={navItems} />
                <SidebarControl />
            </div>
        </>
    );
}

export default Sidebar;