import React, { PropTypes } from 'react'
import { Link } from 'react-router';
class app extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="overf" style={{maxHeight:window.screen.height}}>
        {
          // (() => {
          //   if (typeof(this.props.children.props.route.path)==="undefined") return(
          //     this.props.children && React.cloneElement(this.props.children, {SetThing:this.SetThing.bind(this)})
          //   )
          // })()
          this.props.children
        }
        <div className="tabBar">
          <Link to="thing" activeClassName="active" className="link"><i className="ishop"></i>市集</Link>
          <Link to="find" activeClassName="active" className="link"><i className="iorder"></i>查询</Link>
        </div>
      </div>
    )
  }
}

export default app;
