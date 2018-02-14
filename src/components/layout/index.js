import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './style.less';

export default class Layout extends Component {
  static childContextTypes = {
    initData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }

  getChildContext() {
     /* eslint-disable */
    if (typeof window !== 'undefined' && window.__initState__) {
      const initData = window.__initState__;
      delete window.__initState__;
      return { initData };
    } else {
      return { initData: this.props.initData };
    }
  }

  render() {
    return (
      <div>
        <div>
          <span className={styles.wrap}>
            <Link to="/" className={styles.link}>home</Link>
            <Link to="/welcome" className={styles.link}>welcome</Link>
            <Link to="/about" className={styles.link}>about</Link>
          </span>
        </div>
        {this.props.children}
      </div>
    );
  }
}
