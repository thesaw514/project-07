import React, { Component } from 'react';

class MapLoadError extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }

    render() {
      if (this.state.errorInfo) {
        return (
          <div className='alert alert-warning' role='alert'>
            <h1>An Error Has Occurred!</h1>
            <br />
            <h2>{this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}</h2>
          </div>
        );
      }
      return this.props.children;
    }
  }

  export default MapLoadError;
