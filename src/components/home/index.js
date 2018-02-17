import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

export default class Home extends Component {
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
