<template to="/gedan">
  <div class="container_gedan">
    <div class="top_title">
      <span @click="back" class="return_home">
        <img src="../assets/back.png" />
      </span>
      <p class="top_title_text">歌单广场</p>
    </div>
    <div class="gedan_swiper">
      <!-- <Swiper></Swiper> -->
    </div>
  </div>
</template>

<script>
// import Swiper from "../components/Swiper"
export default {
  components: {
    // Swiper
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.container_gedan {
  width: 100vw;
  height: 10vh;
  background: white;
  position: relative;
  z-index: 10;
  padding-top: 10px;
  .top_title {
    .return_home {
      display: inline-block;
      position: absolute;
      left: 10px;
      width: 30px;
      height: 30px;
      img {
        width: 100%;
      }
    }
    .top_title_text {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
