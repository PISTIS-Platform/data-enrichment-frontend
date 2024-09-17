<template>
  <th class="table-header">
    <div style="font-weight: 400">
      <div class="select">
        <div v-show="!selected">
          <status-bubble class="inactive">
            <img src="../../assets/img/exclamation-triangle-icon.svg" class="icon" />
            <!-- <span class="tooltiptext"
              >Please select one of the suggested properties belonging to the PISTIS Data
              Model.</span -->
            <!-- > -->
          </status-bubble>
        </div>
        <div v-show="!trasformable">
          <status-bubble class="error">
            <img src="../../assets/img/exclamation-triangle-icon.svg" class="icon" />
            <!-- <span class="tooltiptext"
              >The data type of the chosen property and the data type of the data itself do not
              match/are not convertible. Please choose a fitting property.</span
            > -->
          </status-bubble>
        </div>
        <div v-show="transformed">
          <status-bubble class="success">
            <img src="../../assets/img/small-check-mark-icon.svg" class="icon success-icon" />
          </status-bubble>
        </div>
        <v-select
          :ref="'select' + id"
          v-model="search"
          label="name"
          :options="liveSearchResult"
          :filter="customSearch"
          @update:modelValue="selectedOption"
          :clearable="false"
        >
          <template #selected-option="">
            <div class="select-field">
              <span :class="{ darken: !selected }">
                <strong>{{ truncate(selectedColumn.name, 9, '...') }}</strong>
                <strong class="select-field-datatype">
                  {{ truncate(selectedColumn.dataType, 9, '...') }}
                </strong>
              </span>
            </div>
          </template>
          <template v-slot:option="option">
            <div class="option">
              <span class="option-name">{{ option.name }}</span>
              <span class="option-dataType">{{ option.dataType }}</span>
            </div>
          </template>
          <template v-slot:no-options>
            <span> No matching properties found </span>
          </template>
        </v-select>
      </div>
    </div>
  </th>
</template>

<script setup>
import { ref, toRefs, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'

import StatusBubble from './StatusBubble.vue'
// import { useBus } from '@/composables/bus'

const props = defineProps({
  column: Object,
  id: Number,
  bus: Object
})

const { column, id, bus, columsSelected } = props

const search = ref({})
const selected = ref(columsSelected)
const dataType = ref(column.dataType || '')
const trasformable = ref(true)
const transformed = ref(false)
const initialValue = ref(column)
const selectedColumn = ref(column)

const store = useStore()
const { dataTypeTransformCompatibility, selectedFileData, columnsStatus, liveSearchResult } =
  storeToRefs(store)
const { selectColumn, setColumnStatus, setError } = store

// Custom search function
const customSearch = (option, searchText) => {
  // Guard clause to ensure option is defined
  if (!option[0] || !option[0].name || !option[0].dataType) return false

  if (!searchText) return true // Show all options if no search text

  const query = searchText.toLowerCase()
  const result = option.filter(
    (option) =>
      option.name.toLowerCase().includes(query) || option.dataType.toLowerCase().includes(query)
  )
  return result
  // return option.name.toLowerCase().includes(query) || option.dataType.toLowerCase().includes(query)
}

const selectedOption = (value) => {
  if (isUnique(value.name)) {
    selected.value = true
    emit('selected')
    const columnId = id
    const name = value.name
    selectedColumn.value = value

    if (isTransformable(dataType?.value, selectedColumn.value.dataType)) {
      transformed.value = true
      trasformable.value = true
    } else {
      transformed.value = false
      trasformable.value = false
    }

    setColumnStatus({
      id: columnId,
      selected: selected.value,
      trasformable: trasformable.value,
      transformed: transformed.value,
      name: name
    })
    selectColumn({
      id: columnId,
      selectedColumn
    })
    emit('column-selected')
  } else {
    setError('The value of each column property must be unique.')
  }
}

const isTransformable = (initialType, dataType) => {
  const initial = initialType.trim()
  const transformsTo = dataType.trim()
  const compatibility = dataTypeTransformCompatibility.value

  if (initial in compatibility) {
    return compatibility[initial].has(transformsTo) ? true : false
  }
}

const reset = () => {
  const selectedColumn = initialValue.value
  const columnId = id
  selected.value = transformed.value = false
  trasformable.value = true
  liveSearchResult.value = {}
  selectColumn({
    selectedColumn,
    id: columnId
  })
  emit('column-selected')
}

const isUnique = (name) => {
  let unique = true
  columnsStatus.value.forEach((column) => {
    if (column.name.trim().toLowerCase() === name.trim().toLowerCase()) {
      unique = false
    }
  })
  return unique
}

const truncate = (text, length, suffix) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix
  } else {
    return text
  }
}

onMounted(() => {
  if (bus) {
    bus.$on('reset', reset)
  }
  const matchingObject = columnsStatus.value.find((obj) => obj.id === id)

  if (matchingObject) {
    selected.value = matchingObject.selected
    transformed.value = matchingObject.transformed
    trasformable.value = matchingObject.trasformable
  }
})

onUnmounted(() => {
  if (bus) {
    bus.$off('reset', reset)
  }
})

const emit = defineEmits(['selected', 'column-selected'])
</script>

<style lang="scss" scoped>
.select-field {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.v-select {
  width: max-content !important;
  &.vs--open {
    width: 200px !important;
  }
}
.column-dataType {
  cursor: pointer;
  color: #51bbcb;
  font-size: 22px;
}
.option {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
}
.option-dataType {
  font-weight: 700;
}
.table-header {
  min-width: 300px;
  max-height: 100px;
}
.icon {
  margin: 2px auto;
  display: block;
  width: 15px;
  height: 15px;
}
.select-field-datatype {
  margin-left: 0.5rem;
  color: var(--secondary-color);
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 140%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
.darken {
  opacity: 0.5;
}
.select {
  display: grid;
  grid-template-columns: 40px auto;
}

.success-icon {
  width: 12px;
  height: 12px;
  margin: 5px auto;
}
</style>
