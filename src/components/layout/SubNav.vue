<template>
  <div
    class="py-5 border-t-2 mt-1 border-neutral-200 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
  >
    <div class="hidden sm:ml-6 sm:block">
      <div class="flex space-x-4">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a
          v-for="(item, index) in store.subNav"
          :key="index"
          href="#"
          class="link ml-20 rounded-md px-3 py-2 text-base font-semibold"
          aria-current="page"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from '../../stores/store.js'
const store = useStore()
</script>
<style scoped>
.link {
  color: #613deb;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
}
</style>
