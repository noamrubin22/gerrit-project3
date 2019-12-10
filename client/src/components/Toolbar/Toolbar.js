import React from 'react';
import logo from '../../images/logo.png';
import signet from '../../images/signet.png';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <a href="/" className="toolbar__logo"><img src={logo} alt="lobster"/></a>
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
    </nav>
  </header>
);

export default toolbar;
