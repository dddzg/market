import React, { PropTypes } from 'react'
import valid from './valid'
import 'whatwg-fetch'
const Order = React.createClass({
  handleSubmit(event){
    event.preventDefault()
    const id = event.target.elements[0].value
    const tel = event.target.elements[1].value
    const name = event.target.elements[2].value
    var index=valid(id,tel,name);
    if (valid(id,tel,name)!==-1){
      event.target.elements[index].focus();
      switch (index) {
        case 0:alert("姓名有误（╯‵□′）╯︵┴─┴")
        break
        case 1:alert("学号有误╮(╯_╰)╭")
        break
        case 2:alert("电话号码有误( ﾟДﾟ)")
        break
      }
    }
    else{
      alert("订单成功")
    }
  },
  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="学号"/>
        <button type="submit">查询</button>
      </form>
    )
  }
})

export default Order
