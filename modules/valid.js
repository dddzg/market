export default function valid(id,tel,name){
  var p1=/^201[2345]{1}[0-9]{8}$/
  var p2 = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  var p3=/^[\u4E00-\u9FA5\uF900-\uFA2D]{2,4}$/;
  if (!p3.test(name)){
    return 0
  }
  if (!p1.test(id)){
    return 1
  }
  if (!p2.test(tel)){
    return 2
  }
  return -1
}
