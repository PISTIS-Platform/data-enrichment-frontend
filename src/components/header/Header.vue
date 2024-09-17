<template>
  <header>
    <div class="header">
      <Nav />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Nav from './Nav.vue'
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 0px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
header {
  max-width: 100%;
  border-bottom: 1px solid #e5e5e5;
}
@media only screen and (max-width: 1280px) {
  .header {
    justify-content: space-between;
    padding-left: 0px;
    padding-right: 0px;
  }
  header {
    border-bottom: none;
  }
}
</style>
