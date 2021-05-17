<template>
  <div class="title">
    <slot></slot>
    <router-link to="/gedan" tag="span">
      <slot class="slotA" name="slotA"></slot>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.title {
  border-left: 3px solid red;
  padding-left: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  slot {
    display: block;
    .slotA {
      margin-right: 10px;
      color: blue;
    }
  }
}
</style>