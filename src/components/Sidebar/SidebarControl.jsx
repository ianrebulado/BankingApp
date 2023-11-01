import React from 'react';
import { Clock } from 'lucide-react';
import { ToggleLeft } from 'lucide-react';
import { ToggleRight } from 'lucide-react';

function SidebarControl() {
    return (
        <div className='sidebar-control'>
            <div className="clock">
                <Clock className='toggle-icon' />
            </div>
            <div className="theme-toggle">
                <ToggleLeft className='toggle-icon' color="#fefefe" />
                <ToggleRight className='toggle-icon' color="#1D1B21" />
            </div>
        </div>
    );
}

export default SidebarControl;