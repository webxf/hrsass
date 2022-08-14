
//自定义指令的规范写法
export const imgerror = {
    // console.log(binding);
    inserted(ele,{value}){
      if(!ele.src){
        ele.src = value
      }
      ele.onerror = function(){
        ele.src = value
      }
    },
    //指令所绑定的元素更新触发
    update(ele,{value}){
      if(!ele.src){
        ele.src = value
      }
    }
  }