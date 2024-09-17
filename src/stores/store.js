import { ref } from 'vue'
import { defineStore } from 'pinia'
import config from '../../config/config'
import { useLoadingStore } from '../stores/loading'
import axios from 'axios'
import router from '../router'

export const useStore = defineStore('store', () => {
  const loadingStore = useLoadingStore()
  const navigation = ref(config.navigation)
  const subNav = ref(config.subNav)

  const apiUrl = ref(config.api.baseUrl)
  const apiStorageUrl = ref(config.api.baseUrlDataStorage)
  const enrichmentKey = ref(import.meta.env.VITE_ENRICHMENT_API_KEY)
  const dataStorageKey = ref(import.meta.env.VITE_DATA_STORAGE_API_KEY)

  const files = ref([])
  const selectedFileData = ref({})
  const selectedFile = ref({})
  const initialFileData = ref(null)
  const error = ref('')
  const nav = ref(config.navigation)
  const unsupportedDataTypes = ref(config.unsupportedDataTypes)
  const dataTypeTransformCompatibility = ref(config.dataTypeTransformCompatibility)
  const changedUnsupportedDataTypes = ref(new Map())
  const liveSearchResult = ref([])
  const status = ref(false) // are all column choices valid
  const success = ref('')
  const columnsStatus = ref([])
  const headerRowStatus = ref('')

  // GET -> files
  async function getFiles() {
    loadingStore.loadingPending()
    // console.log(dataStorageKey.value)
    await axios
      .get(apiStorageUrl.value + '/api/files/get_all_names', {
        headers: {
          Authorization: '3yF8!oNEzR2/bHDx*WU#F@^pLM9NQ$a6',
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then((response) => {
        files.value = response.data.datasets
      })
      .catch((e) => {
        console.log(e)
        error.value = "Files couldn't be retrieved."
        router.push('/')
      })
    loadingStore.loadingSuccess()
  }

  // GET -> file
  async function selectFile(file) {
    // console.log('selecting file:')
    loadingStore.loadingPending()

    await axios
      .get(apiUrl.value + '/get_asset', {
        params: { uuid: file.uuid, file_type: file.type },
        headers: {
          Authorization: enrichmentKey.value
        }
      })
      .then((response) => {
        initialFileData.value = JSON.parse(JSON.stringify(response.data))
        selectedFileData.value = response.data
        checkUnsupportedDatatypes(response.data.data_model.columns)
        selectedFile.value = file
        router.push('/select-header')
      })
      .catch((e) => {
        console.log(e)
        router.push('/')
        //this.router.push({ name: '/select-header' })
        error.value = 'File couldn’t be selected.'
        loadingStore.loadingError('File couldn’t be selected.')
      })
    loadingStore.loadingSuccess()
  }

  // POST update data-model
  const updateDataModel = async () => {
    loadingStore.loadingPending()
    try {
      await axios.post(`${apiUrl.value}/update_datamodel`, {}, { timeout: 15000 })
      // loading.value = false;
    } catch (e) {
      console.log(e.message)
      error.value = 'The latest datamodel could not be fetched.'
      loadingStore.loadingError('The latest datamodel could not be fetched.')
      // loading.value = false;
    }
    loadingStore.loadingSuccess()
  }

  // POST fetch Live search options
  const fetchOptions = async () => {
    try {
      const response = await axios.post(
        apiUrl.value + '/livesearch_data_model',
        {
          sequence: '' // This is the actual body of the request
        },
        {
          headers: {
            Authorization: enrichmentKey.value
          }
        }
      )
      liveSearchResult.value = response.data.properties
    } catch (e) {
      error.value = 'Live search options could not be fetched.'
      router.push('/')
      console.log(e)
      console.log(e.message)
    }
  }

  // POST Save Asset
  const saveAsset = async () => {
    loadingStore.loadingPending()
    revertUnsupportedDataTypes()
    const data = {
      metadata: {
        id: selectedFile.value.uuid
      },
      data_model: {
        columns: selectedFileData.value.data_model.columns
      }
    }
    try {
      // await axios.post(`${apiUrl.value}/save_asset`, data, {
      //   params: { uuid: selectedFile.value.uuid }
      // })
      await axios.post(apiUrl.value + '/save_asset', data, {
        params: { uuid: selectedFile.value.uuid },
        headers: {
          Authorization: '7KbyV3DZfPQq2rJ8XgtNpWVQp5ZdA9mG'
        }
      })
      loadingStore.loadingSuccess()
      router.push('/')
      success.value = 'Dataset was successfully saved.'
    } catch (e) {
      loadingStore.loadingSuccess()
      router.push('/')
      error.value = "Dataset couldn't be saved."
      console.log(e)
      console.log(e.message)
    }
  }

  const setError = (errorMsg) => {
    error.value = errorMsg
  }

  const checkUnsupportedDatatypes = (payload) => {
    // Check if the array contains unsupported types
    const containsUnsupportedTypes = payload.some((item) =>
      unsupportedDataTypes.value.has(item.dataType)
    )

    if (containsUnsupportedTypes) {
      // Loop through the array and update unsupported types
      payload.forEach((e, index) => {
        if (unsupportedDataTypes.value.has(e.dataType)) {
          const originalType = e.dataType
          const updatedType = unsupportedDataTypes.value.get(e.dataType)
          selectedFileData.value.data_model.columns[index].dataType = updatedType
          changedUnsupportedDataTypes.value.set(index, { originalType, updatedType })
        }
      })
    }
  }

  const revertUnsupportedDataTypes = () => {
    if (changedUnsupportedDataTypes.value.size) {
      for (const [index, change] of changedUnsupportedDataTypes.value.entries()) {
        const { originalType } = change
        unsupportedDataTypes.value.forEach((value, key) => {
          if (
            originalType?.trim().toLowerCase() === key?.trim().toLowerCase() &&
            selectedFileData.value.data_model.columns[index].dataType?.trim().toLowerCase() ===
              value?.trim().toLowerCase()
          ) {
            selectedFileData.value.data_model.columns[index].dataType = originalType
          }
        })
      }
    }
  }

  const selectColumn = ({ id, selectedColumn }) => {
    if (Object.keys(selectedColumn).length !== 0) {
      delete selectedColumn.propertyID
      updateSelectedFileDataModelColumn({
        id,
        selectedColumn
      })
    }
  }

  const updateSelectedFileDataModelColumn = ({ id, selectedColumn }) => {
    selectedFileData.value.data_model.columns[id] = selectedColumn
  }

  const setColumnStatus = (status) => {
    updateColumnStatus(status)
    updateStatus()
  }

  const updateColumnStatus = (payload) => {
    const index = columnsStatus.value.findIndex((status) => status.id === payload.id)
    if (index !== -1) {
      // If the column status object exists, update it
      columnsStatus.value[index] = payload
    } else {
      // Otherwise, add the new column status object to the array
      columnsStatus.value.push(payload)
    }
  }

  const updateStatus = () => {
    if (columnsStatus.value.length === selectedFileData.value.data_model.columns.length) {
      const isEveryObjectValid = columnsStatus.value.every((obj) => {
        // get an array of all keys except 'id' and 'name'
        const keys = Object.keys(obj).filter((key) => key !== 'id' && key !== 'name')
        // check that every property except 'id' is true
        return keys.every((key) => obj[key] === true)
      })
      status.value = isEveryObjectValid
    }
  }

  const resetStatus = (newStatus) => {
    status.value = newStatus
    columnsStatus.value = []
  }

  const updateHeaderRowStatus = (payload) => {
    headerRowStatus.value = payload
    // console.log('payload', payload)
  }

  const pushFirstHeaderRowDown = () => {
    const names = selectedFileData.value.data_model.columns.map((column) => column.name)
    selectedFileData.value.data.rows = [[...names], ...selectedFileData.value.data.rows]
    selectedFileData.value.data_model.columns.forEach((column) => {
      column.name = ''
    })
    updateHeaderRowStatus('down')
  }

  return {
    navigation,
    subNav,
    nav,
    dataTypeTransformCompatibility,
    getFiles,
    files,
    loadingStore,
    selectFile,
    initialFileData,
    updateDataModel,
    fetchOptions,
    liveSearchResult,
    status,
    selectColumn,
    columnsStatus,
    setColumnStatus,
    resetStatus,
    headerRowStatus,
    updateHeaderRowStatus,
    pushFirstHeaderRowDown,
    selectedFileData,
    setError,
    saveAsset
  }
})
