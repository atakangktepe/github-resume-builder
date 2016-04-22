import React, { Component, PropTypes } from 'react';
import 'styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Github Resume Builder!</h1>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.object.isRequired
};
