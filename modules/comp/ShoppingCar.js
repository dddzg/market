import React, { PropTypes } from 'react'
import Item from './Item'
import {Link} from 'react-router'
class ShoppingCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked:false
    }
  }
  Toggle(){
    this.setState({
      clicked:!this.state.clicked
    });
  }
  GetBuyNum(data){
     if (data.length){
       var p=0;
       for (let x in data) ++p;
       return p
     }
     else return 0
  }
  /*      <div onTouchTap={this.Toggle.bind(this)}>{this.GetBuyNum(this.props.BuyThing)}</div>*/
  render () {
    return (
      <div
        onTouchTap={(e)=>{
          if (e.target.className==="bgclicked"){
            this.Toggle(e)
          }
        }}
        className={this.state.clicked?"bgclicked":"bgunclicked"}>
        <div className={this.state.clicked?"clicked":"unclicked"}>
          <img id="car"
            onTouchTap={(e)=>{
              return this.Toggle(e);
            }} src={require("../../img/car.png")} height="58px" width="58px"/>
          {
            this.state.clicked?
              <div>
                <div className="firstline">
                  <div className="del right" onTouchTap={()=>{this.props.DelAll()}}>清空全部</div>
                </div>
                <div className="things">
                  {
                    this.props.Cal()>0?<div>
                        <div className="HH">{
                          this.props.BuyThing.map((temp,index)=>{
                                    let obj=this.props.Thing[index-1];
                                    return <Item key={index}
                                       name={obj.name}
                                       sort={obj.sort}
                                       id={obj.id}
                                       price={obj.price}
                                       max={obj.max}
                                       GetNum={this.props.GetNum}
                                       Inc={this.props.Inc}
                                       Dec={this.props.Dec}
                                       DelOne={this.props.DelOne}
                                      />
                                    })}
                          </div>
                        <div className="allmoy">总价<span className="moy">{this.props.Cal()}元</span></div>
                      </div>
                    :<div className="center allmoy">你的购物车空空如也！</div>
                }
                </div>
                <div className="tabBar2">
                  <Link className="link unact" to="/thing" onClick={this.Toggle.bind(this)}>返回</Link>
                  <Link className={this.props.BuyThing.length>0?"link active":"link unact"} to={this.props.Cal()>0?"/thing/check":"/thing"}
                    onClick={this.Toggle.bind(this)}
                    >确认</Link>
                </div>
              </div>
            :""
          }
        </div>
      </div>
    )
  }
}

export default ShoppingCar;
