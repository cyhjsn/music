<template>
  <div class="loading">
    <div>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>
<style lang="less" scoped>
.loading {
  height: 20vh;
  align-items: center;
  justify-content: center;
  display: flex;
  div {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    i {
      display: inline-block;
      width: 8px;
      height: 30px;
      background-color: red;
      transform-origin: center bottom;
      animation: loading 1s linear 0s infinite alternate-reverse;
      &:first-of-type {
        animation-delay: -0.2s;
      }
      &:last-of-type {
        animation-delay: -0.6s;
      }
    }
  }
}
@keyframes loading {
  from {
    transform: scaleY(0.2);
  }
  to {
    transform: scaleY(1);
  }
}
</style>