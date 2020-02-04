import React, { Component } from 'react';  
import { connect } from 'react-redux';  

export default function (ComposedComponent) {  
  class Authenticate extends Component {
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      if (!this.props.isAUTH) {
        this.props.history.push('/login')
      }
    }

    render() {
      return (
        <div>
          { this.props.isAUTH ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAUTH: state.login.isAUTH
    };
  };

  return connect(mapStateToProps)(Authenticate);
}