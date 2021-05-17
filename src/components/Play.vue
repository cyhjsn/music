<template>
  <div class="player">
    <audio
      ref="player"
      autoplay
      loop
      @timeupdate="timeupdate"
      :src="`https://music.163.com/song/media/outer/url?id=${playdata}.mp3`"
    />
    <div class="playerBar">
      <i ref="rollImg">
        <img :src="song.al.picUrl" />
      </i>
      <div class="pre_song" @click="go_pre_song">
        <img src="../assets/pre.png" />
      </div>

      <div class="next_song" @click="go_next_song">
        <img src="../assets/next.png" />
      </div>
      <i @click="showFull">
        <span>{{ song.name }}-{{ song.ar[0].name }}</span>
      </i>
      <i @click="toggle_State">
        <div>
          <div v-if="!$root.playingMusic.isPlay" class="imgs3"></div>
          <div v-else class="imgs4"></div>
        </div>
        <canvas ref="canvas" width="40px" height="40px"></canvas>
      </i>
    </div>
    <div v-show="page_state" class="fullpage">
      <!-- 图片 -->
      <div class="fullpage_img">
        <div
          @click="toggle_State"
          v-if="$root.playingMusic.isPlay"
          class="imgs1"
        ></div>
        <div @click="toggle_State" v-else class="imgs2"></div>
        <img :src="song.al.picUrl" />
      </div>
      <!-- 标题 -->
      <div class="fullpage_top">
        <h1>{{ song.name }}-{{ song.ar[0].name }}</h1>
        <span @click="page_state = false">下去</span>
      </div>
      <!-- 歌词 -->
      <div class="ul_before">
        <ul ref="lyrics_ul">
          <li
            v-for="(item, index) in newarr_lyric"
            :key="index"
            :class="{ active: index == currentIndex }"
            @click="jumpIndex(item.time)"
          >
            {{ item.str }}
          </li>
        </ul>
      </div>
      <!-- 评论 -->
      <div class="comment_part">
        <p class="comment_text">精彩评论</p>
        <div class="comment_list">
          <div
            v-for="v in comment_value"
            :key="v.commentId"
            class="comment_item"
          >
            <div class="comment_head">
              <img :src="v.user.avatarUrl" />
            </div>
            <div class="comment_wrap">
              <div class="comment_header">
                <div class="comment_meta">
                  <span>{{ v.user.nickname }}</span>
                  <span class="comment_time">{{ v.time | formatData }}</span>
                </div>
                <div class="comment_like">
                  <i class="comment_likeicn">
                    <img src="../assets/good.png" alt="" />
                  </i>
                </div>
              </div>
              <div class="comment_content">
                <span>{{ v.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["playdata"],
  components: {},
  filters: {
    formatData(val) {
      let date = new Date(val);
      let Str = date.getHours() + ":" + date.getMinutes();
      return Str;
    },
  },
  mounted() {
    this.$refs.rollImg.style.animationPlayState = "paused"; //一开始停止
  },
  data() {
    return {
      song: {
        al: {
          picUrl: "",
        },
        name: "未选取歌曲 ",
        ar: [{ name: " 未选取歌手" }],
      },
      // toggleimg:'../assets/on.png',
      play_state: false, //一开始时候不能点击切换按钮
      newarr_lyric: [],
      onoff_state: true,
      page_state: false, //时候出现播放背景
      currentIndex: 0,
      comment_value: [], //评论信息
      now_playerlist: [],
    };
  },
  watch: {
    playdata(val) {
      (this.now_playerlist = []),
        (this.now_playerlist = this.$root.playerlistsss);
      // console.log(this.now_playerlist);
      //开始状态
      this.play_state = true; //可以点击切换按钮了
      this.$refs.rollImg.style.animationPlayState = "running"; //CD盘转起来
      this.$root.playingMusic.isPlay = true;
      this.page_state = true;

      this.$http("/song/detail?ids=" + val).then((data) => {
        this.song = data.data.songs[0];
      });
      this.$http("/comment/music?id=" + val).then((data) => {
        this.comment_value = data.data.comments;
      });
      this.$http.defaults.baseURL = "http://music.kele8.cn";
      this.$http.get("/lyric?id=" + val).then((lyricdata) => {
        let arr_lyric = lyricdata.data.lrc.lyric.split("\n"); //分割的到数组
        // console.log(arr_lyric);
        let reg = /\[(\d+):(\d+\.\d+)\](.+)/; //正则表达式
        this.newarr_lyric = arr_lyric.map((v) => {
          if (!v) return false; //!!!!!!!!!
          let val = v.match(reg); //进行匹配
          if (!val) return false;
          var t = parseInt(val[1] * 60) + parseInt(val[2]); //得到秒数
          // console.log(t);
          return {
            time: t,
            str: val[3],
          };
        });
      });
      this.$http.defaults.baseURL = "http://musicapi.leanapp.cn/";
      return val;
    },
  },
  methods: {
    //页面切换
    showFull() {
      if (this.play_state === true) {
        this.page_state = true;
      }
    },
    //获取当前播放进度信息
    timeupdate(event) {
      let audio = event.target;
      let currentTime = audio.currentTime; //当前时间
      let durationTime = audio.duration; //总时间

      //标注歌词
      for (let v in this.newarr_lyric) {
        if (v == this.newarr_lyric.length - 2) {
          this.currentIndex = v;
          break;
        }
        let now_playtime = this.newarr_lyric[v].time;
        let next_playtime = this.newarr_lyric[parseInt(v) + 1].time;
        if (now_playtime <= currentTime && currentTime < next_playtime) {
          // console.log(v);
          this.currentIndex = v;
          // console.log(this.newarr_lyric.src);
          if (this.currentIndex >= 2) {
            this.$refs.lyrics_ul.style.marginTop =
              -(this.currentIndex - 2) * 56 + "px";
          }
          break;
        }
      }
      this.initCanvas(currentTime, durationTime);
    },
    initCanvas(x, y) {
      let canvas = this.$refs.canvas;
      let cxt = canvas.getContext("2d");
      cxt.beginPath();
      cxt.strokeStyle = "#494b4b";
      cxt.arc(20, 20, 18, 0, Math.PI * 2);
      cxt.stroke();
      cxt.closePath();
      //进度条
      cxt.beginPath();
      cxt.strokeStyle = "red";
      cxt.arc(20, 20, 18, 0, Math.PI * 2 * (x / y));
      cxt.stroke();
      cxt.closePath();
    },
    //切换状态
    toggle_State() {
      if (this.play_state === true) {
        if (this.$root.playingMusic.isPlay) {
          this.$root.playingMusic.isPlay = false;
          this.onoff_state = false;
          // this.toggleimg = '../assets/off.png';
          this.$refs.player.pause();
          this.$refs.rollImg.style.animationPlayState = "paused";
          // this.$refs.canvas.style.backgroundImage = "url('../assets/singer.jpg')";
        } else {
          this.$refs.player.play();
          this.$root.playingMusic.isPlay = true;
          // this.toggleimg = '../assets/on.png';
          this.onoff_state = true;
          this.$refs.rollImg.style.animationPlayState = "running";
        }
      }
    },
    //点击哪一行跳哪一行
    jumpIndex(val) {
      let col = this.$refs.player;
      col.currentTime = val;
    },

    //上一首
    go_pre_song() {
      let songlist = this.now_playerlist;
      // console.log(this.playdata);
      // console.log(songlist);
      for (let index in songlist) {
        // console.log(songlist[index].id);
        if (songlist[index].id === this.playdata) {
          let x = Number(index) - 1;
          if(x < 0) return false;
          let pre_id = songlist[x].id;
          this.$root.playingMusic.musicId = pre_id;
          return true;
        }
      }
    },
    go_next_song() {
      let songlist = this.now_playerlist;
      // console.log(this.playdata);
      console.log(songlist);
      for (let index in songlist) {
        // console.log(songlist[index].id);
        if (songlist[index].id === this.playdata) {
          console.log(index);
          let x = Number(index) + 1;
          if(x >= songlist.length) return false;
          // console.log(x);
          let next_id = songlist[x].id;
          // console.log(next_id);
          this.$root.playingMusic.musicId = next_id;
          // this.playdata = next_id;

          return true;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.player {
  position: fixed;
  bottom: 0px;
  background-color: #494b4b;
  // opacity: 0.95;
  width: 100%;
  line-height: 56px;
  color: white;
  overflow-y: auto;
  audio {
    height: 20px;
  }
  .playerBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    .pre_song {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 85px;
      top: 9px;
      z-index: 10;
      img {
        width: 100%;
      }
    }
    .next_song {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 65px;
      top: 9px;
      img {
        width: 100%;
      }
    }
    i {
      display: inline-block;
      display: flex;
      &:first-of-type {
        margin-right: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        overflow: hidden;
        animation: rot 5s linear infinite;
      }

      &:nth-of-type(2) {
        text-align: center;
        span {
          white-space: nowrap; /*规定段落中的文本不进行换行*/
          overflow: hidden; /*溢出部分隐藏*/
          text-overflow: ellipsis; /*溢出文字以省略号代替显示*/
          width: 200px;
          font-size: 14px;
        }
      }
      &:last-of-type {
        width: 40px;
        height: 40px;
        position: relative;
        .imgs3 {
          position: absolute;
          top: 5px;
          left: 2px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: url("../assets/on.png");
          // background-color: red;
          background-position: 5px 0px;
          background-size: contain;
        }
        .imgs4 {
          position: absolute;
          top: 5px;
          left: 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: url("../assets/off.png");
          // background-color: red;
          background-position: 2px 2px;
          background-size: 26px;
        }
      }
    }
  }
  .fullpage {
    padding-top: 50px;
    width: 100vw;
    height: 100vh;
    // background-color: rgb(92, 90, 90);
    opacity: 0.9;
    //图片
    .fullpage_img {
      width: 200px;
      height: 200px;
      margin: 20px auto;
      border-radius: 50%;
      overflow: hidden;
      // animation: rot 5s linear infinite;
      .imgs1 {
        position: absolute;
        display: block;
        left: 160px;
        top: 170px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: url("../assets/off.png");
        // background-color: red;
        background-position: 0px 0px;
        background-size: contain;
      }
      .imgs2 {
        position: absolute;
        display: block;
        left: 160px;
        top: 170px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: url("../assets/on.png");
        // background-color: red;
        background-position: 5px 0px;
        background-size: contain;
      }
      img {
        width: 100%;
      }
    }
    //标题
    .fullpage_top {
      position: relative;
      text-align: center;
      h1 {
        width: 200px;
        font-size: 20px;
        font-weight: bold;
        margin: 0 auto;
        white-space: nowrap; /*规定段落中的文本不进行换行*/
        overflow: hidden; /*溢出部分隐藏*/
        text-overflow: ellipsis; /*溢出文字以省略号代替显示*/
      }
      span {
        position: absolute;
        top: 0;
        right: 20px;
      }
    }
  }
  //歌词
  .ul_before {
    // margin-top: 50px;
    // background: burlywood;
    overflow: hidden;
    height: 300px;
    text-align: center;
    ul {
      margin-top: 100px;
      li {
        &.active {
          color: red;
        }
      }
    }
  }
  //评论
  .comment_part {
    .comment_text {
      margin-left: 10px;
      font-size: 16px;
    }
    .comment_list {
      .comment_item {
        padding-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        vertical-align: center;
        margin-bottom: 10px;
        .comment_head {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          overflow: hidden;
          background: blueviolet;
          margin: 0 10px;
          flex: none;
          img {
            width: 100%;
          }
        }
        .comment_wrap {
          padding-right: 10px;
          padding-bottom: 11px;
          padding-left: 10px;
          flex: auto;
          width: 0;
          .comment_header {
            display: flex;
            flex-direction: row;
            .comment_meta {
              flex: auto;
              width: 0;
              font-size: 0;
              margin: 0;
              margin-top: -10px;
              margin-bottom: 10px;
              padding: 0;
              display: flex;
              flex-direction: column;
              span {
                max-width: 100%;
                display: inline-flex;
                align-items: center;
                font-size: 14px;
                color: rgb(136, 127, 127);
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: auto;
                &.comment_time {
                  font-size: 9px;
                  color: rgb(158, 157, 158);
                }
              }
            }
            .comment_like {
              width: 65px;
              height: 22px;
              line-height: 22px;
              font-size: 11px;
              color: #999;
              flex: none;
              text-align: right;
              .comment_likeicn {
                width: 16px;
                height: 16px;
                display: inline-block;
              }
            }
          }
          .comment_content {
            position: relative;
            // color: #333;
            font-size: 15px;
            line-height: 22px;
            margin-top: 5px;
            span {
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
@keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

