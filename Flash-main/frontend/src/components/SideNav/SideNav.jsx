import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <div class="sidebar">
    <Menu>
      
      <button className="sidebtn">View All Courses</button>

      <a className="menu-item" href="/">
       stuff
      </a>
     
    </Menu>
    </div>
  );
};