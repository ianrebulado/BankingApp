import React from 'react';
import logo from '../../../public/mg-light-logo.png'

const SidebarHeader = () => {
    return (
        <div className='sidebar-header'>
            <img src={logo} alt='logo' className='logo' />
        </div>
    );
};

export default SidebarHeader;