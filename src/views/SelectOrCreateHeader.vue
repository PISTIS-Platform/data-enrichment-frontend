<template>
  <layout>
    <div style="padding: 25px 0px; display: flex">
      <Loader v-if="loading" />
      <div class="table-container" style="overflow-x: auto; position: relative; max-width: 50%">
        <table style="transform: rotateX(180deg)">
          <tr class="table-head">
            <th
              v-for="(column, index) in store.initialFileData?.data_model.columns"
              :key="index"
              class="table-header"
            >
              {{ column.name }}
            </th>
          </tr>
          <tr v-for="(row, index) in store.initialFileData?.data.rows" :key="index">
            <td v-for="(rowData, index) in row" :key="index">
              {{ rowData }}
            </td>
          </tr>
          <tfoot>
            <tr>
              <td
                v-for="(column, index) in store.initialFileData?.data_model.columns"
                :key="index + 'f'"
                class="ellipsis-cell"
              >
                ...
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div style="padding-left: 15px">
        <div style="display: flex">
          <svg
            style="transform: rotate(180deg); height: 60px; width: 60px"
            xmlns="http://www.w3.org/2000/svg"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            image-rendering="optimizeQuality"
            fill-rule="evenodd"
            clip-rule="evenodd"
            viewBox="0 0 512 243.58"
          >
            <path
              fill-rule="nonzero"
              d="M373.57 0 512 120.75 371.53 243.58l-20.92-23.91 94.93-83L0 137.09v-31.75l445.55-.41-92.89-81.02z"
            />
          </svg>
          <h2 style="padding-left: 15px">Is this the table head?</h2>
        </div>
        <div class="choice">
          <label class="radio-button">
            <input @click="selectHeader($event)" name="radio" type="radio" value="up" />
            <span class="checkmark"></span>
            Yes
          </label>
          <label class="radio-button">
            <input @click="selectHeader($event)" name="radio" type="radio" value="down" />
            <span class="checkmark"></span>
            No
          </label>
        </div>
      </div>
    </div>
    <div class="animated-button">
      <span class="mas">Back</span>
      <button @click.prevent="router.push('/')">Back</button>
    </div>
    <!-- <div class="animated-button"> -->
    <!-- <span class="mas">Reset all</span> -->
    <!-- <button @click.prevent="store.updateDataModel">Update Datamodel</button>
    </div> -->
  </layout>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '../components/layout/Layout.vue'
import Loader from '../components/utils/LoadingSpinner.vue'

import { useStore } from '../stores/store.js'
import { useLoadingStore } from '@/stores/loading.js'
import router from '../router'

const store = useStore()
const selectedFileData = computed(() => store.selectedFileData)

const loadingStore = useLoadingStore()
const loading = computed(() => loadingStore.loading)

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
  // const myData = store.files
  // store.getFiles()
})

const selectHeader = (e) => {
  store.fetchOptions()
  store.resetStatus(false)
  store.updateHeaderRowStatus(e.target.value)
  // store.resetFileData();

  if (store.headerRowStatus === 'down') {
    store.pushFirstHeaderRowDown()
  }
  router.push('/convert-data')
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Montserrat', sans-serif;
}

table {
  border-spacing: 0;
  border-radius: 3px;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  background: var(--white);
  text-align: center;

  th {
    border: 1px solid var(--tableGrey);
  }

  td,
  th {
    padding: 15px 15px 15px 15px;
  }

  td {
    border: 0.1px solid var(--tableGrey);
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

.button:hover {
  background: var(--secondary-color);
  color: white;
}

.icon {
  width: 10px;
  height: 10px;
}

/* Show the tooltip text when you mouse over the tooltip container */

.table-header {
  animation: highlight-header-row 1s ease-in-out forwards;
  animation-iteration-count: 1;
  border-style: dotted;
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

// @-webkit-keyframes ani {
//   from {
//     -webkit-mask-position: 0 0;
//     mask-position: 0 0;
//   }

//   to {
//     -webkit-mask-position: 100% 0;
//     mask-position: 100% 0;
//   }
// }

// @keyframes ani {
//   from {
//     -webkit-mask-position: 0 0;
//     mask-position: 0 0;
//   }

//   to {
//     -webkit-mask-position: 100% 0;
//     mask-position: 100% 0;
//   }
// }

// @-webkit-keyframes ani2 {
//   from {
//     -webkit-mask-position: 100% 0;
//     mask-position: 100% 0;
//   }

//   to {
//     -webkit-mask-position: 0 0;
//     mask-position: 0 0;
//   }
// }

// @keyframes ani2 {
//   from {
//     -webkit-mask-position: 100% 0;
//     mask-position: 100% 0;
//   }

//   to {
//     -webkit-mask-position: 0 0;
//     mask-position: 0 0;
//   }
// }

.animated-button {
  position: relative;
  width: 100px;
  height: 40px;
  // margin-left: auto;
  // margin-right: auto;
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

    @include button(white, '../../assets/img/natureSmaller.png', 7100%, 100%, none, #000);
    cursor: pointer;
    -webkit-animation: ani 0.7s steps(70) forwards;
    animation: ani 0.7s steps(70) forwards;
  }
}

// .animated-button button:not([disabled]) {
//   webkit-animation: ani2 0.7s steps(70) forwards;
//   animation: ani2 0.7s steps(70) forwards;
//   // background: var(--secondary-color);
//   color: white;
// }

// .animated-button button:disabled {
//   -webkit-animation: ani 0.7s steps(70) forwards;
//   animation: ani 0.7s steps(70) forwards;
//   cursor: not-allowed;
//   background: rgba(242, 242, 242, 0.8);
// }

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

@keyframes highlight-header-row {
  0% {
    border-top-color: var(--tableGrey);
    border-bottom-color: var(--tableGrey);
  }

  50% {
    border-top-color: #cccc;
    border-bottom-color: #cccc;
  }

  100% {
    border-color: black;
    border-width: 2px;
  }
}

.table-head > *:not(:first-child) {
  border-left: transparent;
}

.table-header:first-child {
  border-left-color: black !important;
}

.table-header:last-child {
  border-right-color: black !important;
}

.select {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  cursor: pointer;
  height: 40px;
  font-weight: 300;
  letter-spacing: 1px;
  border-radius: 8px;
  border: 1px solid rgba(242, 242, 242, 0.8);
}

.select {
  background: var(--secondary-color);
  color: white;
}

.choice {
  margin: 0 auto;
  display: block;
  max-width: 200px;
  margin-left: 70px;
}

h2 {
  text-align: center;
}

.radio-button {
  display: inline-block;
  position: relative;
  padding-left: 25px;
  margin-right: 15px;
  font-size: 16px;
  cursor: pointer;
}

.radio-button input[type='radio'] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: #fff;
  border: 2px solid #aaa;
  border-radius: 50%;
}

.radio-button:hover .checkmark {
  background-color: var(--secondary-color);
}

.radio-button input[type='radio']:checked + .checkmark:after {
  content: '';
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
}

.table-container::-webkit-scrollbar {
  height: 10px;
  position: absolute;
  top: -10px;
  z-index: 1;
}

.table-container {
  transform: rotateX(180deg);
  overflow-x: auto;
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
.container {
  margin: 0 auto;
  max-width: 1600px;
  padding: 0px 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 50px;
}
</style>
