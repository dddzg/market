import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-image-lightbox';
import { render } from 'react-dom';
class NoMatch extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
		};
  }
  render () {
    var x=0;
    return (
      <div>
        <p>404</p>
      </div>
    )
  }
}

export default NoMatch
