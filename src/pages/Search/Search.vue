<template>
  <div class="Search clearfix">
    <header class="search_header">
      <span>搜索</span>
    </header>
    <form class="search_form" @submit.prevent="search">
      <input
        @input="search_focus"
        @focus="search_focus"
        @blur="search_focus"
        ref="search_input"
        type="text"
        v-model="search_text"
        class="search_text"
        placeholder="请输入商家名称"
      />
      <div class="delect" @click="del_tex" v-show="del_show">X</div>
      <input type="submit" class="search_submit" />
      
    </form>
    <section class="list" v-if="searchShops.length">
      <ul class="list_container">
        <router-link
          :to="{ path: '/shop', query: { id: item.id } }"
          tag="li"
          v-for="item in searchShops"
          :key="item.id"
          class="list_li"
        >
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售 {{ item.month_sales || item.recent_order_num }} 单</p>
              <p>
                {{ item.delivery_fee || item.float_minimum_order_amount }}
                元起送 / 距离{{ item.distance }}
              </p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      search_text: "",
      imgBaseUrl: "http://cangdu.org:8001/img/",
      emptyResult: false,
      del_show:false
    };
  },
  computed: {
    ...mapState(["searchShops"]),
  },
  methods: {
    search() {
      const keyword = this.search_text.trim();
      if (keyword) {
        this.emptyResult = false;
        this.$store.dispatch("searchShop", keyword);
      }
    },
    search_focus(){
       
      if(this.search_text){
        this.del_show=true
      }else{
        this.del_show=false
      }
    },
    del_tex(){
      this.$nextTick(()=>{
        this.search_text=''
        this.$refs.search_input.focus()
        
      })
      
    }
  },
  watch: {
    searchShops(val) {
      if (!val.length) {
        this.emptyResult = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/minxin.styl';

.Search {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.search_header {
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

.search_form {
  position relative
  background-color: #fff;
  margin-top: 40px;
  padding: 12px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .delect{
    display: block
    position absolute
    right 25%
    top 50%
    transform translateY(-50%)
    color: blue

  }
  input {
    height: 35px;
    padding: 0 4px;
    border-radius: 2px;
    font-weight: bold;
    outline: none;
    box-sizing: border-box;

    &.search_text {
      
      width: 78%;
      border: 4px solid #f2f2f2;
      font-size: 14px;
      color: #333;
      background-color: #f2f2f2;
     
      
    }

    &.search_submit {
      width: 18%;
      border: 4px solid #02a774;
      font-size: 16px;
      color: #fff;
      background-color: #02a774;
    }
  }
}

.list {
  .list_container {
    background-color: #fff;

    .list_li {
      display: flex;
      justify-content: center;
      padding: 10px;
      border-bottom: 1px solid $bc;

      .item_left {
        margin-right: 10px;

        .restaurant_img {
          width: 50px;
          height: 50px;
          display: block;
        }
      }

      .item_right {
        font-size: 12px;
        flex: 1;

        .item_right_text {
          p {
            line-height: 12px;
            margin-bottom: 6px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}

.search_none {
  margin: 0 auto;
  color: #333;
  background-color: #fff;
  text-align: center;
  margin-top: 0.125rem;
}
</style>