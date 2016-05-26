import React, { PropTypes } from 'react'
import Item from './comp/Item'
import ShoppingCar from './comp/ShoppingCar'
import Json from "../things.json"
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CarState: false,
      BuyThing:[],
      loading:true,
      error:null,
      data:Json
    }
  }
  GetNum(index){
    if (typeof(this.state.BuyThing[index])==="undefined") return 0
    else return this.state.BuyThing[index];
  }
  Inc(index){
    let temp=this.state.BuyThing;
    if (typeof(temp[index])==="undefined") temp[index]=1;
    else temp[index]++;
    this.setState({
      BuyThing:temp
    });
  }
  Cal(){
    let temp=this.state.BuyThing
    let moy=0
    for (let x in temp)
      moy+=this.state.data.Thing[x-1].price*temp[x];
    return moy
  }
  DelOne(index){
    let temp=this.state.BuyThing;
    if (typeof(temp[index])==="undefined" || temp[index]==0) return;
    delete temp[index]
    this.setState({
      BuyThing:temp
    });
  }
  DelAll(){
    this.setState({
      BuyThing:[]
    });
  }
  Dec(index){
    let temp=this.state.BuyThing;
    if (typeof(temp[index])==="undefined" || temp[index]==0) return;
    else temp[index]--;
    if (temp[index]==0){
      delete temp[index]
    }
    this.setState({
      BuyThing:temp
    });
  }
  render () {
      // var list
      // ((obj)=>{
      //   for (let temp of obj){
      //     list+=<Item key={temp.id} name={temp.name} url={temp.url} price={temp.price} max={temp.max}/>
      //   }
      // })(this.state.data['Thing'])
      // obj.map((obj)=>{
      //
      // })
      const obj=this.state.data['Thing']
      return <div style={{maxHeight:window.screen.height}}>
        {
          this.props.children?
          (this.props.children.props.route.path==="check"?
          (this.props.children && React.cloneElement(this.props.children, {BuyThing:this.state.BuyThing,Cal:this.Cal.bind(this)})):
          this.props.children)
          :
          <div>
            <img src={require("../img/market.png")} height={document.body.offsetWidth*0.571875} width="100%"></img>
            <div className="main">{
            obj.map((temp,index) =>{
              return <Item
                key={index} {...temp}
                GetNum={this.GetNum.bind(this)}
                Inc={this.Inc.bind(this)}
                Dec={this.Dec.bind(this)}
                />
            })}
            <div className="eee"></div>
            </div>
          </div>
        }
        <ShoppingCar
          BuyThing={this.state.BuyThing}
          GetNum={this.GetNum.bind(this)}
          Inc={this.Inc.bind(this)}
          Dec={this.Dec.bind(this)}
          DelAll={this.DelAll.bind(this)}
          DelOne={this.DelOne.bind(this)}
          Thing={this.state.data['Thing']}
          Cal={this.Cal.bind(this)}
          />
      </div>
    }
}

export default Home;
