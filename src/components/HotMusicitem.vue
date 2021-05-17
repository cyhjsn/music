<template>
  <ul class="hotnewMusicList">
    <router-link
      v-for="(item, k) in newHotMusicitem"
      :key="item.id"
      tag="li"
      to=""
    >
      <!-- {{ item.name }}--{{ item.ar[0].name }}--{{ item.al.name }} -->
      <p class="sgf1">{{ (k + 1) | spg1_length }}</p>
      <div class="left">
        <div>{{ item.name }}</div>
        <p>
          <span v-if="item.h.br > 320000"></span>{{ item.ar[0].name }}-{{
            item.al.name
          }}
        </p>
      </div>
      <div class="right">
        <span></span>
      </div>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: "HotMusicItem",
  props: ["newHotMusicitem"],
  data() {
    return {
      num: 0,
    };
  },
  filters: {
    spg1_length(value) {
      return value.toString().length > 1 ? `${value}` : `0${value}`;
    },
  },
};
</script>
<style lang="less" scoped>
.hotnewMusicList {
  // flex-wrap: row;
  li {
    width: 100%;
    display: flex;
    margin-top: 10px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    &:nth-of-type(1), &:nth-of-type(2),&:nth-of-type(3) {
      color: #e53436;
    }
    .sgf1 {
      margin-right: 10px;
      // &:nth-of-type(2) {
      //   color: black;
      // }
    }
    div.left {
      flex: 1;
      text-align: left;
      border-bottom: 1px solid #ddd;
      div {
        font-size: 17px;
        color: black;
      }
      p {
        font-size: 12px;
        color: #888;
      }
      // span{
      //   width: 30px;;
      //   height: 10px;
      //   background-color: green;
      // }
    }
  }
  div.right {
    border-bottom: 1px solid #ddd;
    padding: 0px 5px;
    padding-right: 8px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 22px;
      height: 22px;
      background-image: url(../assets/index_icon_2x.png);
      background-position: -24px 0px;
      background-size: 166px 97px;
    }
  }
}
</style>