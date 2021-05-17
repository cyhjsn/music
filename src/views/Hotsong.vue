<template>
  <div class="container_hot">
    <div class="hotsong">
      <div class="top_img">
        <div class="bg_img hot_icon"></div>
        <div class="hot_time">更新日期 : {{ Month }}月{{ Day }}日</div>
      </div>
    </div>
    <Musicitem
      :playerlist="newHotMusicitem"
      v-for="(item, k) in newHotMusicitem"
      :key="item.id"
      :num="k + 1"
      :item="item"
      tag="li"
      to=""
    >
      <div class="li_title">{{ (k + 1) | spg1_length }}</div>
    </Musicitem>
    <Loading v-if="newHotMusicitem <= 0"></Loading>
    <div v-if="more" class="hot_bottom">
      <span @click="full_list" class="hotview">查看完整榜单</span>
    </div>
  </div>
</template>

<script>
import Musicitem from "../components/Musicitem";
import Loading from "../components/Loading";
export default {
  components: {
    Musicitem,
    Loading,
  },
  data() {
    return {
      Month: "",
      Day: "",
      newHotMusicitem: [],
      more: false,
      musicids: [],
      num: 0,
    };
  },
  methods: {
    full_list() {
      this.$http.defaults.baseURL = "http://music.kele8.cn";
      let a = [];
      let str = "";
      this.num++;
      this.$http
        .get("/top/list?idx=1")
        .then((data) => {
          console.log(data);
          a = data.data.playlist.trackIds.slice(
            20 * this.num,
            20 * (this.num + 1)
          );
        })
        .then(() => {
          for (let v of a) {
            str = str + v.id + ",";
          }
          str = str.substring(0, str.length - 1);
        })
        .then(() => {
          let b = [];
          this.$http.get("song/detail?ids=" + str).then((data) => {
            // console.log(data);
            b = data.data.songs.map((dat) => {
              return {
                name: dat.name,
                id: dat.id,
                song: {
                  artists: [
                    {
                      name: dat.al.name,
                    },
                  ],
                  privilege: {
                    maxbr: dat.h.br,
                  },
                },
              };
            });
            this.newHotMusicitem = this.newHotMusicitem.concat(b);
          });
        });
    },
  },
  filters: {
    spg1_length(value) {
      return value.toString().length > 1 ? `${value}` : `0${value}`;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$http.defaults.baseURL = "http://music.kele8.cn";
      let str = "";
      vm.$http
        .get("/top/list?idx=1")
        .then((data) => {
          vm.musicids = data.data.playlist.trackIds.slice(0, 20);
        })
        .then(() => {
          for (let v of vm.musicids) {
            str = str + v.id + ",";
          }
        })
        .then(() => {
          str = str.substring(0, str.length - 1);
          vm.$http.get("song/detail?ids=" + str).then((data) => {
            vm.newHotMusicitem = data.data.songs.map((dat) => {
              return {
                name: dat.name,
                id: dat.id,
                song: {
                  artists: [
                    {
                      name: dat.al.name,
                    },
                  ],
                  privilege: {
                    maxbr: dat.h.br,
                  },
                },
              };
            });
            vm.more = true;
          });
        });
    });
  },
  mounted() {
    let d = new Date();
    this.Month = d.getMonth() + 1;
    this.Day = d.getDate().toString().padStart(2, "0");
  },
};
</script>

<style lang="less" scoped>
.container_hot {
  padding-top: 50px;
  padding-bottom: 30px;
  .hotsong {
    position: relative;
    padding-top: 38.9%;
    overflow: hidden;
    background-image: url("../assets/hot_music_bg_3x.jpg");
    background-size: contain;
    .top_img {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding-left: 20px;
      box-sizing: border-box;
      .hot_icon {
        width: 142px;
        height: 67px;
        background-position: -24px -30px;
      }
      .bg_img {
        background-image: url("../assets/index_icon_2x.png");
        background-size: 166px 97px;
      }
      .hot_time {
        margin-top: 10px;
        color: hsla(0, 0%, 100%, 0.8);
        font-size: 12px;
        transform: scale(0.91);
        transform-origin: left top;
      }
    }
  }
  .hot_bottom {
    height: 55px;
    line-height: 55px;
    text-align: center;
    .hotview {
      display: inline-block;
      color: #999;
      padding-right: 14px;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAyMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEgMWwxMCAxMEwxIDIxIi8+PC9zdmc+)
        100% no-repeat;
      background-size: 7px 12px;
    }
  }
}
</style>