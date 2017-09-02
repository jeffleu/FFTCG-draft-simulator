import React from 'react';
import { navLinks } from '../../constants';

const Nav = props => {
  const links = navLinks.map((link, index) => {
    return (
      <li key={index}>
        <i className={link.icon} aria-hidden="true"></i>
        <a href={link.url}>{link.name}</a>
      </li>
    );
  });

  return (
    <div id="nav">
      <ul>
        {links}
      </ul>
    </div>
  );
};

export default Nav;
