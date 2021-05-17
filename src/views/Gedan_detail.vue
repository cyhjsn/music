<template>
  <div class="gedanDetail_contaienr">
    <div class="top_title">
      <span @click="back" class="return_home">
        <img src="../assets/back.png" />
      </span>
      <!-- <p class="top_title_text">歌单</p> -->
      <div
        class="bg_img"
        :style="`backgroundImage:url(${gd_list.coverImgUrl})`"
      ></div>
      <div class="top_middle">
        <div class="top_middle_left">
          <img :src="gd_list.coverImgUrl" />
        </div>
        <div class="top_middle_right">
          <div class="top_middle_right_top">
            <span class="top_middle_right_top_span1">{{ gd_list.name }}</span>
            <div class="top_inside">
              <img :src="gd_list.creator.avatarUrl" />
              <span class="top_middle_right_top_span2">{{
                gd_list.creator.nickname
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Musicitem
      :playerlist="newHotMusicitems"
      v-for="item in newHotMusicitems"
      :key="item.id"
      :item="item"
      tag="li"
      to=""
    ></Musicitem>
  </div>
</template>

<script>
import Musicitem from "../components/Musicitem";
export default {
  components: {
    Musicitem,
  },
  data() {
    return {
      gd_list: {
        name: "",
        creator: {},
      },
      gd_song: [],
      newHotMusicitems: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let id = vm.$route.params.id;
      let str = "";
      vm.$http
        .get("/playlist/detail?id=" + id)
        .then((data) => {
          vm.gd_list = data.data.playlist;
          vm.gd_song = data.data.playlist.trackIds;
          for (let v of vm.gd_song) {
            str += v.id + ",";
          }
          str = str.substring(0, str.length - 1);
        })
        .then(() => {
          vm.$http.defaults.baseURL = "http://music.kele8.cn";
          vm.$http.get("song/detail?ids=" + str).then((data) => {
            vm.newHotMusicitems = data.data.songs.map((dat) => {
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
                    maxbr: dat.l.br,
                  },
                },
              };
            });
            vm.more = true;
          });
        });
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.gedanDetail_contaienr {
  width: 100%;
  background: white;
  position: relative;
  padding-top: 10px;
  padding-bottom: 30px;
  .top_title {
    .return_home {
      display: inline-block;
      position: absolute;
      left: 10px;
      width: 30px;
      height: 30px;
      z-index: 10;
      img {
        width: 100%;
      }
    }
    .top_title_text {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    .bg_img {
      -webkit-filter: blur(15px);
      -moz-filter: blur(15px);
      -o-filter: blur(15px);
      -ms-filter: blur(15px);
      filter: blur(15px);
      height: 200px;
      position: absolute;
      width: 100%;
    }
    .top_middle {
      display: flex;
      padding: 30px 20px;
      position: relative;
      .top_middle_left {
        // flex: 1;
        width: 150px;
        height: 150px;
        img {
          width: 100%;
        }
      }
      .top_middle_right {
        // flex: 2;
        width: 250px;
        height: 150px;
        .top_middle_right_top {
          width: 100%;
          padding: 0 10px;
          .top_middle_right_top_span1 {
            display: inline-block;
            font-size: 17px;
            color: white;
            margin-bottom: 30px;
          }
          .top_inside {
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
            }
            .top_middle_right_top_span2 {
              color: hsla(0, 0%, 100%, 0.7);
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>