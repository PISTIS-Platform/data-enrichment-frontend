<template>
  <div>
    <navigation-component />
    <!-- <SubNav /> -->
    <main class="container">
      <slot></slot>
    </main>
  </div>
</template>
<script>
import Nav from './Nav.vue'
// import SubNav from './SubNav.vue'

export default {
  name: 'Layout',
  setup() {},
  components: {
    'navigation-component': Nav
    // SubNav
  }
}
</script>

<style>
.container {
  /* background-color: #f8f9fa; */
  margin-top: 50px;
}
</style>
