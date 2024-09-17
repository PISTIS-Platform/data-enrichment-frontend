<template>
  <span class="file-type">
    <slot></slot>
  </span>
</template>
<script setup></script>

<style lang="scss" scoped>
.file-type {
  display: inline-flex;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background-color: #2b2b2b;
  color: white;
  font-size: 14px;
  line-height: 1.25rem;
  font-weight: 500;
  align-items: center;
  border-radius: 9999px;
}
.csv {
  background: #5a5c5d;
}
.txt {
  background: #486856;
}
</style>
