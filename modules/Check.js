import React, { PropTypes } from 'react'
import valid from './valid'
import {Link} from 'react-router'
import 'whatwg-fetch'
class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      status:0,
      oid:0
    }
  }
  submit(event){
    event.preventDefault()
    const name=event.target.elements[0].value
    const id=event.target.elements[1].value;
    const tel=event.target.elements[2].value;
    // if (pass(name,id,tel)){
    var index=valid(id,tel,name);
    if (index!==-1){
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
    else if (this.props.Cal()===0) alert("订单为空");
    else{
      fetch('./thinkphp/index.php/Home/Index/insert',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          'name':name,
          'id':id,
          'tel':tel,
          'things':this.props.BuyThing
        })
      })
      .then((response)=>{
        return response.json()
      }).then(text=>{
        if (text.status==0 || text.status==-1) alert("订单失败")
        else if(this.state ==1) alert("订单不能为空")
        else{
          this.setState({
            status:1,
            oid:text.id
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    }
    // }
  }
  render () {
    if (this.state.status!=0)
    return <div className="check2" style={{maxHeight:window.screen.height}}>
      <img width="129px" height="122px" src={require("../img/check.png")}/>
      <div className="center">
        <p className="strong">预定成功！</p>
        <p className="green strong3">订单号:{this.state.oid}</p>
        <p className="strong2">总价:{this.props.Cal()}元</p>
        <p>请<strong className="green">截屏</strong>保存订单号</p>
        <p>于<strong>5.31</strong>至<strong>6.2</strong></p>
        <p>在一饭百步梯摊位<strong>在线预定窗口</strong></p>
        <p>凭<strong>订单号</strong>和<strong>一卡通</strong>领取</p>
        <Link to="thing" activeClassName="active" className="link"><i className="ishop"></i>再去逛逛</Link>
      </div>
    </div>
    else
    return <div className="check" style={{maxHeight:window.screen.height}}>
      <img width="129px" height="122px" src={require("../img/check.png")}/>
      <form id="check" onSubmit={this.submit.bind(this)}>
        <input type="text" name="name" id="name" placeholder="请输入姓名"></input>
        <input type="text" name="id" id="id" placeholder="请输入学号"></input>
        <input type="text" name="phone" id="phone" placeholder="请输入手机"></input>
        <Link to="thing" activeClassName="active" className="link small">继续购买</Link>
        <button type="submit">提交订单</button>
    </form>
    </div>
  }
}

export default Check;
