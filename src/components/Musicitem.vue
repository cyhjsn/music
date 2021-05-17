<template>
  <div>
    <li class="newMusicList" :key="item.id" @click="playMusic">
      <slot></slot>
      <div class="left">
        <div>{{ item.name }}</div>
        <p>
          <span
            class="sq_icon"
            v-if="item.song.privilege.maxbr > 320000"
          ></span>
          {{ item.song.artists[0].name }}-{{ item.name }}
        </p>
      </div>
      <div class="right">
        <span></span>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  name: "MusicItem",
  props: ["num", "item" , "playerlist"],
  components: {},
  mounted() {
    // console.log(this.arrlist);
    this.$root.playerlistsss = this.playerlist;
    // console.log(this.playerlist);

  },
  methods: {
    playMusic() {
      console.log(111);
      this.$root.playingMusic.musicId = this.item.id;
      console.log(this.item.id);
      // console.log(this.$root.playingMusic.musicId);
      // console.log(this.$root,this.$parent);
    },
  },
};
</script>


<style lang="less" scoped>
.newMusicList {
  width: 100%;
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
  // &.li_title:nth-of-type(1),
  // &:nth-of-type(2),
  // &:nth-of-type(3) {
  //   color: #e53436;
  // }
  .li_title {
    margin-top: 10px;
    padding-right: 10px;
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
      .sq_icon {
        display: inline-block;
        width: 20px;
        height: 15px;
        background-image: url(../assets/index_icon_2x.png);
        background-position: 4px 7px;
        background-size: 166px 97px;
      }
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