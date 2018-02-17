import React from 'react';
import Loading from './components/loading';

class Bundle extends React.Component {
  state = {
    mod: null,
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  async load(props) {
    this.setState({
      mod: null,
    });
    const mod = await props.load();
    this.setState({
      mod: mod.default ? mod.default : mod,
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : this.props.children(null);
  }
}

const Bundled = p =>
  props => (
    <Bundle
      {...p}
    >
      {Comp => (Comp
        ? <Comp fetch={p.fetch} {...props} />
        : <Loading />
      )}
    </Bundle>
  );

export default Bundled;
