<template>
  <label class="bubble">
    <span class="bubble-circle">
      <slot></slot>
    </span>
  </label>
</template>
<script>
export default {
  name: 'Status-bubble'
}
</script>
<style scoped>
.bubble {
  display: flex;
  position: relative;
  padding: 0.125rem;
  margin-top: 2px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  cursor: pointer;
}
.bubble-circle {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  border-width: 1px;
  border-color: #000000;
}
.inactive .bubble-circle {
  background-color: #f59e0b;
}
.error .bubble-circle {
  background-color: #991b1b;
}
.success .bubble-circle {
  background-color: #10b981;
}
</style>
