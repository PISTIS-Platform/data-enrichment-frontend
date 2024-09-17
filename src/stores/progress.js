import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useProgressStore = defineStore('progress', () => {
  const router = useRouter()
  const steps = ref([
    { id: 0, name: 'choose file', active: false, progress: 25 },
    { id: 1, name: 'choose header', active: false, progress: 50 },
    { id: 2, name: 'transform data', active: false, progress: 75 },
    { id: 3, name: 'describe metadata', active: false, progress: 100 }
  ])

  const progress = ref(0)

  const initActiveStep = (payload) => {
    console.log('initing')
    console.log(payload)
    if (payload) {
      steps.value.forEach((e) => {
        if (e.active) e.active = false
      })
      switch (payload) {
        case '/': {
          steps.value[0].active = true
          progress.value = steps.value[0].progress
          break
        }
        case '': {
          steps.value[0].active = true
          progress.value = steps.value[0].progress
          break
        }
        case '/select-header': {
          steps.value[1].active = true
          progress.value = steps.value[1].progress
          break
        }
        case '/convert-data': {
          steps.value[2].active = true
          progress.value = steps.value[2].progress
          break
        }
        case '/describe-metadata': {
          steps.value[3].active = true
          progress.value = steps.value[3].progress
          break
        }
        default: {
          steps.value[0].active = true
          progress.value = steps.value[0].progress
          break
        }
      }
    }
  }
  onMounted(() => {
    let path = router.currentRoute.value.path
    if (path) {
      initActiveStep(path)
    }
  })

  return { steps, progress, initActiveStep }
})
