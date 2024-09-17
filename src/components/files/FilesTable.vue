<template>
  <div class="wrap">
    <div>
      <h2>Files</h2>
      <p class="">A list of all the files in your account including their name and type.</p>
    </div>
    <Loader v-if="loading" />
    <div v-else class="container">
      <div class="container-inner">
        <div class="table-wrap">
          <div class="table">
            <table>
              <thead class="table-head">
                <tr>
                  <th scope="col" class="table-th">Name</th>
                  <th scope="col" class="table-th">Type</th>
                  <th scope="col" class="table-th">
                    <input class="search" type="text" v-model="search" placeholder="Search..." />
                  </th>
                </tr>
              </thead>
              <tbody class="table-body">
                <SingleFile
                  v-for="(file, index) in paginatedFiles"
                  :key="index"
                  :file="file"
                  class="file"
                />
              </tbody>
            </table>
            <div class="pagination" v-if="!search">
              <button class="pagination-button" :disabled="currentPage === 0" @click="prevPage">
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="34px"
                  height="34px"
                  viewBox="0 0 122.883 122.882"
                  fill="#606060"
                  enable-background="new 0 0 122.883 122.882"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      d="M61.441,0L61.441,0l0.001,0.018c16.974,0,32.335,6.872,43.443,17.98s17.98,26.467,17.98,43.441h0.018v0.002l0,0h-0.018 c0,16.976-6.873,32.335-17.98,43.443c-11.109,11.107-26.467,17.979-43.442,17.979v0.018h-0.002l0,0v-0.018 c-16.975,0-32.335-6.872-43.443-17.98C6.89,93.775,0.018,78.417,0.018,61.442H0v-0.001V61.44h0.018 c0-16.975,6.872-32.334,17.98-43.443C29.106,6.89,44.465,0.018,61.44,0.018L61.441,0L61.441,0L61.441,0z M71.701,42.48 c1.908-1.962,1.863-5.101-0.098-7.009c-1.963-1.909-5.102-1.865-7.01,0.097L42.755,58.088l3.553,3.456l-3.568-3.46 c-1.911,1.971-1.863,5.118,0.108,7.029c0.058,0.056,0.116,0.109,0.175,0.162l21.571,22.057c1.908,1.962,5.047,2.006,7.01,0.097 c1.961-1.908,2.006-5.047,0.098-7.01L53.227,61.529L71.701,42.48L71.701,42.48z"
                    />
                  </g>
                </svg>
              </button>
              <p>Page {{ currentPage + 1 }} of {{ pageCount }}</p>
              <button
                class="pagination-button"
                :disabled="currentPage >= pageCount - 1"
                @click="nextPage"
              >
                <svg
                  style="transform: rotate(180deg)"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="34px"
                  height="34px"
                  viewBox="0 0 122.883 122.882"
                  enable-background="new 0 0 122.883 122.882"
                  fill="#606060"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      d="M61.441,0L61.441,0l0.001,0.018c16.974,0,32.335,6.872,43.443,17.98s17.98,26.467,17.98,43.441h0.018v0.002l0,0h-0.018 c0,16.976-6.873,32.335-17.98,43.443c-11.109,11.107-26.467,17.979-43.442,17.979v0.018h-0.002l0,0v-0.018 c-16.975,0-32.335-6.872-43.443-17.98C6.89,93.775,0.018,78.417,0.018,61.442H0v-0.001V61.44h0.018 c0-16.975,6.872-32.334,17.98-43.443C29.106,6.89,44.465,0.018,61.44,0.018L61.441,0L61.441,0L61.441,0z M71.701,42.48 c1.908-1.962,1.863-5.101-0.098-7.009c-1.963-1.909-5.102-1.865-7.01,0.097L42.755,58.088l3.553,3.456l-3.568-3.46 c-1.911,1.971-1.863,5.118,0.108,7.029c0.058,0.056,0.116,0.109,0.175,0.162l21.571,22.057c1.908,1.962,5.047,2.006,7.01,0.097 c1.961-1.908,2.006-5.047,0.098-7.01L53.227,61.529L71.701,42.48L71.701,42.48z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import Loader from '../utils/LoadingSpinner.vue'
import SingleFile from './File.vue'

import { useStore } from '../../stores/store'
import { useLoadingStore } from '@/stores/loading.js'

const store = useStore()
const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)

const search = ref('')
const perPage = ref(10)
const currentPage = ref(0)

const filteredFiles = computed(() => {
  const searchRegex = new RegExp(search.value, 'i')
  return store.files.filter((file) => {
    return searchRegex.test(file.name || searchRegex.test(file.type))
  })
})

const pageCount = computed(() => {
  return Math.ceil(filteredFiles.value.length / perPage.value)
})

const paginatedFiles = computed(() => {
  if (search.value) {
    return filteredFiles.value
  } else {
    const start = currentPage.value * perPage.value
    const end = start + perPage.value

    return filteredFiles.value.slice(start, end)
  }
})

// isn't being fired
// const renderFile = (file) => {
//   store.selectFile({ file })
// }

const nextPage = () => {
  currentPage.value++
}

const prevPage = () => {
  currentPage.value--
}

// const goToPage = (page) => {
//   currentPage.value = page
// }
</script>
<style lang="scss" scoped>
.wrap {
  padding-left: 2rem;
  padding-right: 2rem;
}
.table-head {
  background: rgba(242, 242, 242, 0.8);
}
.container {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
}
.container-inner {
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
  margin-left: -2rem;
  margin-right: -2rem;
  overflow-x: auto;
}
.table-wrap {
  display: inline-block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  vertical-align: middle;
  margin: 0 auto;
  min-width: 100%;
}
.table {
  overflow: hidden;
  border-radius: 0.5rem;
}
table {
  min-width: 100%;
  border: 1px solid rgba(242, 242, 242, 0.8);
  border-collapse: collapse;
}
.table-th {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  text-align: left;
}
.table-body {
  background-color: var(--white);
}
.search {
  float: right;
  border-radius: 5px;
  padding: 4px;
  border-color: transparent;
}
.pagination {
  display: flex;
  justify-content: center;
  padding: 30px 0px;
  p {
    padding: 0px 15px 5px 15px;
    font-size: 14px;
  }
}
.pagination-button {
  border: none;
  background: transparent;
  cursor: pointer;
  :hover path {
    fill: var(--primary-color);
  }
}
</style>
