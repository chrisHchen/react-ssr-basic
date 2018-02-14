import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

export default class Home extends Component {
  static contextTypes = {
    initData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }

  constructor(props, context) {
    super(props);

    this.state = {
      data: context.initData,
    };
  }

  render() {
    const {
      data,
    } = this.state;

    return (
      <div className={styles.home}>
        <center>
          <h2 className={styles.title}>Home</h2>
          <div>{data && data.desc}</div>
          <div className={styles.bgImage} />
        </center>
      </div>
    );
  }
}
