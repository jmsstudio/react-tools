import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component that intends to intercept clicks that are outside of the child component, allowing the invocation of custom function.
 */
class OutsideClickListener extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this._registerListener();
  }

  componentWillUnmount() {
    this._unregisterListener();
  }

  _registerListener() {
    document.body.addEventListener('click', this.handleClick);
  }

  _unregisterListener() {
    document.body.removeEventListener('click', this.handleClick);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isVisible) {
      this._registerListener();
    } else {
      this._unregisterListener();
    }

    return true;
  }

  handleClick(event) {
    if (this.props.isVisible) {
      const container = this.containerRef.current;

      const { target } = event;

      // if container contains clicked target - click was not outside of it
      if (container && container !== target && !container.contains(target)) {
        const { onClickOutside } = this.props;
        // if there is no proper callback - no point of checking
        if (typeof onClickOutside !== 'function') {
          return;
        }

        onClickOutside(event); // clicked outside - fire callback
      }
    }
  }

  render() {
    return <div ref={this.containerRef}>{this.props.children}</div>;
  }
}

OutsideClickListener.defaultProps = {
  isVisible: true,
};

OutsideClickListener.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
};

export default OutsideClickListener;
