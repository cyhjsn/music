<template>
  <div>
    <div class="s-default">
      <section v-if="input_length === 0" class="s-hotlist">
        <h3 class="title">热门搜索</h3>
        <ul class="s-list1">
          <router-link
            to=""
            tag="li"
            class="s-item"
            v-for="(item, index) in hList"
            :key="index"
            @click.native="toInput"
          >
            <a class="link" href="javascript:void(0);">{{ item.first }}</a>
          </router-link>
        </ul>
      </section>
      <section v-else class="s-recom">
        <div v-show="searching3">
          <Loading v-show="searching" />
          <ul v-show="!searching" class="s-list2">
            <h3 class="s-text">搜索"{{ val }}"</h3>
            <router-link
              to=""
              tag="li"
              v-for="(item, index) in suggests"
              :key="index"
              class="s-recomitem"
              @click.native="search_li_click(item.name)"
            >
              <i></i>
              <span>{{ item | filtType }}{{ item.name }}</span>
            </router-link>
          </ul>
        </div>
      </section>
    </div>
    <!-- <Loading v-show="searching" />-->
    <ul>
      <div v-if="searching4">
        <Loading v-show="searching2" />
        <div v-if="!searching2">
          <Musicitem
            :playerlist="keyname"
            v-for="item in keyname"
            :key="item.id"
            :item="item"
            tag="li"
            to=""
          ></Musicitem>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
import Musicitem from "../components/Musicitem";
import Loading from "../components/Loading";
export default {
  props: ["input_length", "val"],
  components: {
    Musicitem,
    Loading,
  },
  data() {
    return {
      hList: [],
      suggests: [],
      keyname: [],
      searching: false, //模糊搜索Loading
      searching2: false, //详细信息Loading
      searching3: true, //模糊搜索和详细信息切换
      searching4: false, //input值变化，详细信息消失
    };
  },
  methods: {
    toInput(e) {
      let x = e.target.innerText;
      let i_length = x.length;
      this.$emit("toInput", x, i_length);
    },
    search_li_click(x) {
      this.searching2 = true;
      this.searching3 = false;
      this.searching4 = true;
      // console.log(this.searching3);
      this.$http.get("/search?keywords=" + x).then((data) => {
        this.keyname = data.data.result.songs.map((dat) => {
          return {
            name: dat.name,
            id: dat.id,
            song: {
              artists: dat.artists,
              privilege: {
                maxbr: 1,
              },
            },
          };
        });
        this.searching2 = false;
      });
    },
  },
  mounted() {
    this.$http.get("/search/hot?limit=10").then((data) => {
      this.hList = data.data.result.hots;
    });
  },
  watch: {
    val(v) {
      this.searching = true;
      this.searching4 = false;
      // this.searching2 = false;
      this.searching3 = true;
      if (v != "") {
        this.$http.get("/search/suggest?keywords=" + v).then((data) => {
          // if (data.data.code === 200 && data.data.result.order) {
          let result = data.data.result;
          let re = result.order.reduce((prev, v) => {
            let rev = result[v];
            return prev.concat(rev);
          }, []);
          this.suggests = re;
          this.searching = false;
          // }
        });
      }
    },
  },
  filters: {
    filtType(v) {
      if (typeof v.artists != "undefined") {
        return "歌曲:";
      } else if (typeof v.artist != "undefined") {
        return "专辑:";
      } else {
        return "歌手:";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.s-default {
  .s-hotlist {
    padding: 15px 10px 0;
    .title {
      font-size: 12px;
      line-height: 12px;
      color: #666;
    }
    .s-list1 {
      margin: 10px 0 7px;
      .s-item {
        display: inline-block;
        height: 32px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 14px;
        font-size: 14px;
        line-height: 32px;
        color: #333;
        border: 1px solid #eeeff2;
        border-radius: 16px;
      }
      a {
        text-decoration: none;
        color: black;
        // -webkit-tap-highlight-color: transparent;
      }
    }
  }
  .s-recom {
    .s-text {
      position: relative;
      height: 50px;
      margin-left: 10px;
      padding-right: 10px;
      font-size: 15px;
      line-height: 50px;
      color: #507daf;
      //溢出
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
    }
    .s-list2 {
      .s-recomitem {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 45px;
        padding-left: 10px;
        i {
          width: 15px;
          height: 15px;
          background-image: url("../assets/upload.svg");
          display: inline-block;
          vertical-align: middle;
          background-position: 0 0;
          background-size: contain;
          background-repeat: no-repeat;
        }
        span {
          display: inline-block;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          width: 1%;
          padding-right: 10px;
          font-size: 15px;
          line-height: 45px;
          color: #333;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>