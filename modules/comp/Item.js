import React, { PropTypes } from 'react'
import Lightbox from 'react-image-lightbox';
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }
  openLightbox() {
      this.setState({ isOpen: true });
  }
  closeLightbox() {
      this.setState({ isOpen: false });
  }
  render () {
    const {id} =this.props
    return (
      <div className={this.props.url?"item":"itemclicked"}>
        {this.props.url?
        <div>
          <img
            src={this.props.url}
            height="124px" width="138px"
            style={{display:"block"}}
            onClick={this.openLightbox.bind(this)}
          />
          {this.state.isOpen?<Lightbox
          mainSrc={this.props.url}
          onCloseRequest={
            this.closeLightbox.bind(this)
          }
          imageTitle={this.props.sort+'-'+this.props.name}
          />:null}
        </div>
        :null}
        <div className="detail">
          <div className="word">
            <div className="wordbox">
              <div className="name">
                {this.props.name}
              </div>
              <div className="sort">
                {this.props.sort}
              </div>
            </div>
            <div className="price">
              {this.props.price}元
            </div>
          </div>
          {this.props.url?"":<div
            className="del"
            onTouchTap={()=>this.props.DelOne(id)}
            >删除</div>}
          <div className="BtnBox">
            <img src={require("../../img/minus.png")} height="20px" width="20px" style={{display:this.props.GetNum(id)<=0?'none':'inline-block'}} onTouchTap={()=>{this.props.Dec(id)}} />
            <div className="num" style={{display:this.props.GetNum(id)<=0?'none':'inline-block'}}>{this.props.GetNum(id)}</div>
            <img src={this.props.GetNum(id)<this.props.max?require("../../img/plus.png"):require("../../img/plus-grey.png")} height="20px" width="20px"
              onTouchTap={()=>{
                if (this.props.GetNum(id)<this.props.max)
                return this.props.Inc(id)
              }}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default Item;
