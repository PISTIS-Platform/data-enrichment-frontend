<template>
  <layout>
    <div v-if="!loading">
      <FilesTable />
    </div>
    <Loader v-if="loading" />
  </layout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '../components/layout/Layout.vue'
import { useStore } from '../stores/store'
import { useLoadingStore } from '@/stores/loading.js'
import FilesTable from '../components/files/FilesTable.vue'
import Loader from '../components/utils/LoadingSpinner.vue'

const store = useStore()
const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)

onMounted(() => {
  const route = useRoute()
  const { id, type } = route.params

  if (Object.keys(route.params).length !== 0) {
    const file = { uuid: id, type: type }
    store.selectFile({ file })
  }

  store.getFiles()
})
</script>
