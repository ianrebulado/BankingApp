import React from 'react';
import logo from '../../../public/assets/mg-light-logo.png'

const SidebarHeader = () => {
    return (
        <div className='sidebar-header'>
            <img src={logo} alt='logo' className='logo' />
        </div>
    );
};

export default SidebarHeader;