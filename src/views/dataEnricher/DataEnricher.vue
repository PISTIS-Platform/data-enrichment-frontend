<template>
  <layout>
    <div>
      <div class="table-container">
        <table style="transform: rotateX(180deg)">
          <tr>
            <ColumnItem
              @column-selected="renderColumn"
              v-for="(column, index) in store.selectedFileData.data_model?.columns"
              :key="index"
              :column="column"
              :id="index"
              :bus="bus"
              ref="column"
              @selected="selected = true"
            />
          </tr>
          <tr v-for="(row, index) in store.selectedFileData.data?.rows" :key="index">
            <td v-for="(rowData, index) in row" :key="index">
              {{ rowData }}
            </td>
          </tr>
          <tfoot>
            <tr>
              <td
                v-for="(column, index) in store.selectedFileData.data_model?.columns"
                :key="index + 'f'"
                class="ellipsis-cell"
              >
                ...
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="flex">
      <div>
        <div class="animated-button">
          <span class="mas">Back</span>
          <button @click.prevent="router.push('/select-header')">Back</button>
        </div>
      </div>
      <div>
        <!-- <div class="animated-button">
          <span class="mas">Reset all</span>
          <button @click.prevent="reset" :disabled="!selected">Reset all</button>
        </div> -->
      </div>
      <div>
        <div class="animated-button">
          <span class="mas">Create</span>
          <button @click.prevent="store.saveAsset">Create</button>
        </div>
      </div>
    </div>
  </layout>
</template>

<script setup>
import Layout from '../../components/layout/Layout.vue'
import ColumnItem from './ColumnItem.vue'
// import Loader from '../../components/utils/LoadingSpinner.vue'
// import AnimatedButton from '../../components/utils/AnimatedButton.vue'

import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()
const router = useRouter()
const bus = ref(null)
const selected = ref(false)

const selectedFileData = computed(() => store.selectedFileData)
const loading = computed(() => store.loading)
const status = computed(() => store.status)

// Methods from the store
const resetStatus = (status) => store.resetStatus(status)
const clearFields = () => store.clearFields()
const clearSelectedFile = () => store.clearSelectedFile()

// Component methods
const renderColumn = () => {
  // Vue 3 does not require force update generally
}

const reset = () => {
  // bus.value.$emit('reset')
  selected.value = false
  resetStatus(false)
}

onMounted(() => {
  const route = useRoute()
  const { id, type } = route.params

  if (Object.keys(route.params).length !== 0) {
    const file = { uuid: id, type: type }
    store.selectFile({ file })
  }

  if (!selectedFileData.value.data_model) {
    router.push('/')
  }
})
</script>

<style lang="scss" scoped>
* {
  font-family: 'Montserrat', sans-serif;
}

h1 {
  color: #606060;
  font-size: 32px;
  margin: 0 auto;
  max-width: 800px;
  padding: 50px 0px;
  text-align: center;
}

.container {
  margin: 0 auto;
  max-width: 1600px;
  padding: 0px 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 50px;
}

table {
  border-spacing: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  border: 1px solid black;
  text-align: center;

  th {
    border: 1px solid #bfbfbf;
  }

  td,
  th {
    padding: 15px 15px 15px 15px;
  }

  td {
    border: 0.1px solid #bfbfbf;
  }

  .column-name {
    color: black;
  }
}

.flex {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@mixin button($bcolor, $url, $x1, $y1, $bor, $col) {
  background: $bcolor;
  -webkit-mask: url($url);
  mask: url($url);
  -webkit-mask-size: $x1 $y1;
  mask-size: $x1 $y1;
  border: $bor;
  color: $col;
}

.mas {
  position: absolute;
  color: black;
  text-align: center;
  width: 101%;
  font-weight: 300;
  position: absolute;
  font-size: 11px;
  margin-top: 14px;
  overflow: hidden;
  font-weight: bold;
}

@-webkit-keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }

  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}

@keyframes ani {
  from {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }

  to {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
}

@-webkit-keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }

  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

@keyframes ani2 {
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }

  to {
    -webkit-mask-position: 0 0;
    mask-position: 0 0;
  }
}

.animated-button {
  position: relative;
  width: 100px;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  overflow: hidden;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  border-radius: 8px;
  border: 1px solid rgba(242, 242, 242, 0.8);
  button {
    width: 101%;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;

    @include button(white, '../../assets/images/natureSmaller.png', 7100%, 100%, none, #000);
    cursor: pointer;
    -webkit-animation: ani 0.7s steps(70) forwards;
    animation: ani 0.7s steps(70) forwards;
  }
}

.animated-button button:not([disabled]) {
  webkit-animation: ani2 0.7s steps(70) forwards;
  animation: ani2 0.7s steps(70) forwards;
  background: var(--secondary-color);
  color: white;
}

.animated-button button:disabled {
  -webkit-animation: ani 0.7s steps(70) forwards;
  animation: ani 0.7s steps(70) forwards;
  cursor: not-allowed;
  background: rgba(242, 242, 242, 0.8);
}

.animated-button button:disabled:hover {
  webkit-animation: ani2 0.7s steps(70) forwards;
  animation: ani2 0.7s steps(70) forwards;
}

.animated-button button:not([disabled]):hover {
  -webkit-animation: ani 0.7s steps(70) forwards;
  animation: ani 0.7s steps(70) forwards;
}

.animated-button:hover {
  border: 1px solid var(--secondary-color);
}
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;

  border-top-right-radius: 5px;
  background: white;
  border-top-left-radius: 5px;
  border: 1px solid black;
  border-bottom: 0px;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 6px;
  width: 120px;
  bottom: 100%;
  left: 50%;
  //margin-left: -60px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip:hover {
  background: var(--secondary-color);
}
.tooltip:hover .icon {
  stroke: white;
}
.icon {
  width: 20px;
  height: 20px;
}
.table-container::-webkit-scrollbar {
  height: 10px;
  position: absolute;
  top: -10px;
  z-index: 1;
}
.table-container {
  transform: rotateX(180deg);
  overflow-x: auto !important;
  // overflow: visible !important;
  padding-bottom: 1px;
  position: relative;
}

.table-container::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}
</style>
