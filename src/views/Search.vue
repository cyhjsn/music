<template>
  <div class="container_search">
    <div class="search">
      <form action="">
        <div class="inputcover">
          <i class="m-input u-svg-srch"></i>
          <input
            @input="search_input"
            v-model="val"
            type="text"
            placeholder="搜索歌曲、歌单、歌单"
          />
          <figure class="close">
            <i
              @click="close_col"
              :class="input_length > 0 ? 'u-svg-empty' : ''"
            ></i>
          </figure>
        </div>
      </form>
    </div>
    <!-- 下半部分 -->
    <SearchList
      @toInput="toInput"
      :input_length="input_length"
      :val="val"
    ></SearchList>
  </div>
</template>

<script>
import SearchList from "../components/SearchList";
export default {
  components: {
    SearchList,
  },
  data() {
    return {
      val: "",
      input_length: 0,
    };
  },
  methods: {
    //获取搜索框内容长度
    search_input() {
      this.input_length = this.val.length;
    },
    //清楚搜索框内容
    close_col() {
      this.val = "";
      this.input_length = 0;
    },
    toInput(x, y) {
      this.val = x;
      this.input_length = y;
    },
  },
};
</script>

<style lang="less" scoped>
.container_search {
  padding-top: 50px;
  .search {
    padding: 15px 10px;
    border-bottom: 1px solid #eff0f1;

    .inputcover {
      position: relative;
      width: 100%;
      height: 30px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #ebecec;
      border-radius: 30px;
      .m-input {
        position: absolute;
        left: 0;
        top: 9px;
        margin: 0 8px;
        vertical-align: middle;
      }
      .u-svg-srch {
        width: 13px;
        height: 13px;
        background: url("../assets/upload.svg");
      }
      input {
        width: 100%;
        height: 30px;
        line-height: 18px;
        background: rgba(0, 0, 0, 0);
        font-size: 14px;
        color: #333;
        border: none;
        outline: none;
      }
      ::-webkit-input-placeholder {
        color: #c9ccd3;
        font-size: 16px;
      }
      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        .u-svg-empty {
          display: inline-block;
          width: 14px;
          height: 14px;
          background-image: url("../assets/close.svg");
          background-position: 0 0;
          background-size: contain;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>