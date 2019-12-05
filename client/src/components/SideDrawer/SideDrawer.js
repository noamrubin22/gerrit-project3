import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li className="divider list-element">
          <a href="/">Profile</a>
        </li>
        <li>
          <a href="/">Chat</a>
        </li>
        <li>
          <a href="/">Map</a>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
