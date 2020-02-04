import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class PrivateRoute extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAUTH: false,
      isLOADING: false,
      isERROR: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {isAUTH, isLOADING, isERROR} = this.props

    if (isAUTH !== prevProps.isAUTH || isLOADING !== prevProps.isLOADING || isERROR !== prevProps.isERROR) {
      this.setState({isAUTH, isLOADING, isERROR})
    }
  }

  renderRouteWithLayout = (matchProps) => {
    const { layout: Layout, component: Component } = this.props
    return (
      <Layout>
        <Component {...matchProps} />
      </Layout>
    )
  }

  render() {
    const { layout: Layout, component: Component, isLOADING, isAUTH, location, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={matchProps => (
          isAUTH ? this.renderRouteWithLayout(matchProps)
          : this.state.isAUTH ? this.renderRouteWithLayout(matchProps) :
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )}
      />
    )
  }
};

const mapStateToProps = state => ({
  isAUTH: state.login.isAUTH,
  isLOADING: state.login.isLOADING,
  isERROR: state.login.isERROR,
})

export default connect(mapStateToProps)(PrivateRoute);