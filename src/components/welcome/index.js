import React, { Component } from 'react';
import styles from './style.less';

export default class Welcome extends Component {

  render() {
    return (
      <div>
        <center>
          <div className={styles.welcome}>Welcome~</div>
          <div className={styles.bgImage} />
        </center>
      </div>
    );
  }
}
