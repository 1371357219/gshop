<template>
  <div class="stars star-24" :class="`star-${size}`">
    <span
      class="star-item"
      :class="rating >= 1 ? 'on' : rating >= 0.5 ? 'half' : 'off'"
    ></span>
    <span
      class="star-item"
      :class="rating >= 2 ? 'on' : rating >= 1.5 ? 'half' : 'off'"
    ></span>
    <span
      class="star-item"
      :class="rating >= 3 ? 'on' : rating >= 2.5 ? 'half' : 'off'"
    ></span>
    <span
      class="star-item"
      :class="rating >= 4 ? 'on' : rating >= 3.5 ? 'half' : 'off'"
    ></span>
    <span
      class="star-item"
      :class="rating >= 5 ? 'on' : rating >= 4.5 ? 'half' : 'off'"
    ></span>
  </div>
</template>

<script>
export default {
  name: "Star",
  props: {
    rating: Number,
    size:Number
  },
};
</script>

<style lang="stylus" scoped>

@import '../../common/stylus/minxin.styl';
.stars {
  display: inline-block;
 
  &.star-24 {
    .star-item {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &.on {
        bg-image('../../components/Star/imgs/stars/star24_on');
      }

      &.half {
        bg-image('../../components/Star/imgs/stars/star24_half');
      }

      &.off {
        bg-image('../../components/Star/imgs/stars/star24_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &.on {
        bg-image('../../components/Star/imgs/stars/star36_on');
      }

      &.half {
        bg-image('../../components/Star/imgs/stars/star36_half');
      }

      &.off {
        bg-image('../../components/Star/imgs/stars/star36_off');
      }
    }
  }
  &.star-48 {
    .star-item {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &.on {
        bg-image('../../components/Star/imgs/stars/star48_on');
      }

      &.half {
        bg-image('../../components/Star/imgs/stars/star48_half');
      }

      &.off {
        bg-image('../../components/Star/imgs/stars/star48_off');
      }
    }
  }
}
</style>