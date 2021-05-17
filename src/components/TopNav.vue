<template>
  <ul class="topnav">
    <li><router-link to="/">推荐歌单</router-link></li>
    <li><router-link to="/hotsong">热歌榜</router-link></li>
    <li><router-link to="/search">搜索</router-link></li>
  </ul>
</template>

<style lang="less" scoped>
.topnav {
  display: flex;
  width: 100%;
  background: white;
  // opacity: .7;
  z-index: 5;
  height: 50px;
  position: fixed;
  align-items: center;
  border-bottom: 1px solid #ddd;
}
li {
  line-height: 40px;
  flex: 1;
  font-size: 15px;
  text-align: center;
}
a {
  display: inline-block;
  text-decoration: none;
  color: #000;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  &.router-link-exact-active {
    color: red;
    border-bottom: 2px solid red;
  }
}
</style>
