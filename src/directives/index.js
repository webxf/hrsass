
//自定义指令的规范写法
export const imgerror = {
    // console.log(binding);
    inserted:function(ele,{value}){
      ele.onerror = function(){
        ele.src = value
      }
    }
  }