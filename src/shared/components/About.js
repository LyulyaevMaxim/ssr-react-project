import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./index2.scss";

export default class About extends Component {
    render() {
        return (
          <div>
            <h1>About React Fiber.</h1>
            <ul className={styles.list}>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/random-link'>Not Found</NavLink>
              </li>
            </ul>
          </div>
        );
    }

}
