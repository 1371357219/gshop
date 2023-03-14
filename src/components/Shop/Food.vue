<template>
  <div class="Food_container" v-if="isShow" @click.self="showToggle">
    <div class="content">
      <div class="content_header">
        <img v-lazy="food.image" />
        <span class="desc">{{ food.info }}</span>
        <div class="back" @click="showToggle">
            <span class="iconfont icon-jiantou1"></span>
        </div>
        
      </div>
      <div class="content_content">
        <h2 class="title">{{food.name}}</h2>
        <p class="detail">
          <span>月售{{food.sellCount }}份</span>
          <span>好评率{{food.rating}}</span>
        </p>
        <span class="price">￥{{ food.price }}</span>
        <div class="cartcontrol_wrapper">
            <CartControl :food="food"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartControl from "./CartControl.vue";
export default {
    data() {
        return {
            isShow:false
        }
    },
    props:{
        food:Object
    },
    components:{
        CartControl
    }
    ,
    methods:{
        showToggle(){
            this.isShow=!this.isShow
        }
    }
};
</script>

<style lang="stylus" scoped>
.Food_container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.43);
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    background-color: #fff;

    .content_header {
      position: relative;
      width: 300px;
      height: 300px;

      &>img {
        width: 100%;
        height: 100%;
      }

      .desc {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 10px;
        color: #ddd;
        letter-spacing: 0;
      }

      .back {
        position: absolute;
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
        top: 10px;
      }
    }

    .content_content {
      position: relative;
      padding: 18px;

      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
      }

      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 10px;
        color: #93999f;

        &>span:nth-child(1) {
          margin-right: 14px;
        }
      }

      .price {
        margin-right: 8px;
        font-size: 14px;
        color: #f01414;
      }
      .cartcontrol_wrapper{
        position absolute 
        bottom 10px
        right 20px
      }
    }
  }
}
</style>