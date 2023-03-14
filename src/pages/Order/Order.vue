<template>
  <div class="Order">
    <header class="Order_header">
      <span>订单列表</span>
    </header>
    <div class="Order_container">
      <img src="./images/person.png"/>
      <span>登录后查看外卖订单</span>
      <button>立即登录</button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/minxin.styl';

.Order{
  overflow hidden
}
.Order_header {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  height: 40px;
  background-color: $green;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-size: 20px;
  
}
.Order_container{
  position:absolute;
  top:40px;
  bottom:100px;
  left:0;
  right:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &>img{
    display: block;
    width: 100%;
    height: 50%;
  }
  &>span{
    padding: 10px 0;
    font-size: 17px;
    color: #6a6a6a;
  }
  &>button{
    display: inline-block;
    background: #02a774;
    font-size: 14px;
    color: #fff;
    border: 0;
    outline: none;
    border-radius: 5px;
    padding: 10px 20px;
  }
}

</style>