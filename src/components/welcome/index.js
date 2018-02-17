import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

export default class Welcome extends Component {
  static contextTypes = {
    initData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    fetch: PropTypes.func,
  }

  constructor(props, context) {
    super(props);

    this.state = {
      data: context.initData,
    };
  }

  componentDidMount() {
    if (!this.state.data) {
      this.props.fetch().then((res) => {
        this.setState({
          data: res,
        });
      });
    }
  }

  render() {
    const {
      data,
    } = this.state;
    return (
      <div>
        <center>
          <div className={styles.welcome}>Welcome~</div>
          <div>{data}</div>
          <div className={styles.bgImage} />
        </center>
      </div>
    );
  }
}
