import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss'

console.log(styles)

export default class Home extends Component {
    render() {
        return (
          <div>
            <h1 className={styles.h1}>Welcome to React Fiber.</h1>
            <ul>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/random-link'>Not Found</Link>
              </li>
            </ul>
          </div>
        );
    }

}
