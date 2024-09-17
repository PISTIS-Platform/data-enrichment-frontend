<template>
  <tr @click="selectFile">
    <td class="td name">{{ fileNameWithoutExtension }}</td>
    <td class="td type">
      <type :class="file.type">{{ file.type }}</type>
    </td>
    <td class="td edit">
      <button href="#" class="select">Select</button>
    </td>
  </tr>
</template>
<script setup>
import { computed, ref, onMounted, defineProps } from 'vue'
import Type from './FileType.vue'
import { useStore } from '../../stores/store'

const store = useStore()
const props = defineProps({
  file: Object
})

const selectFile = () => {
  // console.log('selecting')
  if (props.file) {
    store.selectFile(props.file)
    // console.log('file:', props.file)
  }
}

const fileNameWithoutExtension = computed(() => {
  if (props.file) {
    return props.file.name.split('.').slice(0, -1).join('.')
  } else {
    return ''
  }
})
onMounted(() => {
  console.log()
})
</script>

<style lang="scss" scoped>
.td {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;
}
.name {
  color: #111827;
}
.type {
  color: #6b7280;
}
.edit {
  position: relative;
  text-align: right;
}
button {
  cursor: pointer;
}
tr {
  border-top: 1px solid #e5e7eb;
}
.select {
  border-radius: 8px;
  border: 1px solid hsla(0, 0%, 95%, 0.8);
  padding: 6px 8px;
  transition: border-radius 1s ease;
}
.select:hover {
  background: var(--secondary-color);
  color: white;
  border-radius: 50%;
}
.file:hover {
  cursor: pointer;
  background: #f9fafb;
}
.file:hover .select {
  background: var(--secondary-color);
  color: white;
}
</style>
