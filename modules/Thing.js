import React, { PropTypes } from 'react'

const Thing = React.createClass({
  render () {
    return (
      <div>
        <p>this is {this.props.param.thing}</p>
      </div>
    )
  }
})

export default Thing
