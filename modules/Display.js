import React, { PropTypes } from 'react'
import valid from './valid'
class Display extends React.Component {
  submit(event){
    event.preventDefault()
    const id=event.target.elements[0].value
    var p2 = /^\d{5}$/;
    if (p2.test(id)){
      fetch('./thinkphp/index.php/Home/Index/isreceive',{
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
          alert(id+"号订单提交成功！");
          event.target.elements[0].focus();
          event.target.elements[0].value="";
        }else if (text.status==3){
          alert("此订单已被领取")
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
    return <div className="find" style={{maxHeight:window.screen.height}}>
      <img width="129px" height="122px" src={require("../img/check.png")}/>
      <form onSubmit={this.submit.bind(this)}>
        <h2 style={{color: "#f8bbd0"}}>订单确认领取页面</h2>
        <input type="text" name="name" id="name" placeholder="订单号"></input>
        <button type="submit">确认领取</button>
      </form>
    </div>
  }
}

export default Display;
