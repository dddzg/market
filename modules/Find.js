import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import valid from './valid'
import Json from "../things.json"
class Find extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      n:0,
      ids:[],
      nums:[],
      status:0,
      tel:"",
      name:"",
      oid:""
    }
  }
  cal(){
    let ans=0;
    let ids=this.state.ids;
    for(let x in ids){
      ans+=this.state.nums[x]*Json.Thing[ids[x]-1].price;
    }
    return ans;
  }
  submit(event){
    event.preventDefault()
    const id=event.target.elements[0].value
    var p2 = /^\d{5}$/;
    if (p2.test(id)){
      fetch('./thinkphp/index.php/Home/Index/search',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          'id':id,
        })
      })
      .then((response)=>{
        return response.json()
      }).then(text=>{
        if (text.status==1 || text.status==-1 || text.status==0) alert("不存在此订单");
        else if (text.status==2){
          this.setState({
            ids:text.ids,
            nums:text.nums,
            tel:text.tel,
            name:text.name,
            n:text.n,
            status:text.status,
            oid:id
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    }
    else{
      event.target.elements[0].focus();
      alert("订单号不对");
    }
  }
  render () {
    if (this.state.status){
    return <div className="find" style={{maxHeight:window.screen.height}}>
        <div className="top">
          <p className="center big strong">订单号:{this.state.oid}</p>
          <p className="center big all">总价:<span className="pink">{this.cal()}元</span></p>
          <div className="bg">
            <div className="center inff"><i className="peo"></i><p className="big inf">个人信息</p></div>
            <p className="center ltop">姓名：{this.state.name}</p>
            <p className="center no">手机：{this.state.tel}</p>
          </div>
          <div className="bg">
            <div className="center inff"><i className="gif"></i><p className="big inf">包含商品({this.state.n})</p></div>
            <div className="center">{
                this.state.ids.map((temp,index)=>{
                  return <div className="thing" key={index}><span className="title">{Json.Thing[temp-1].name}</span><span className="sort">{Json.Thing[temp-1].sort}</span>
                  <span className="price">{Json.Thing[temp-1].price}元</span><span className="num">×{this.state.nums[index]}</span></div>
                })
            }
            </div>
        </div>
        </div>
      </div>}
    else return <div className="find" style={{maxHeight:window.screen.height}}>
      <img width="129px" height="122px" src={require("../img/check.png")}/>
      <form onSubmit={this.submit.bind(this)}>
        <input type="text" name="name" id="name" placeholder="请输入你的订单号"></input>
        <Link to="thing" activeClassName="active" className="link small">再去逛逛</Link>
        <button type="submit"><i className="ifind"></i>查询</button>
      </form>
    </div>
  }
}

export default Find;
