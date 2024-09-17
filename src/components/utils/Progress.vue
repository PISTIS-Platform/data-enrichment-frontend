<template>
  <div>
    <h1>{{ name || '' }}</h1>
    <div class="progress">
      <div class="inner">
        <div class="line" :style="{ width: progressStore.progress + '%' }"></div>
      </div>
      <div class="steps">
        <div
          v-for="(step, index) in progressStore.steps"
          :key="index"
          class="step"
          :class="{ active: step.active }"
        >
          <p>{{ step.name }}</p>
          <span v-if="step.active">
            <div class="blobs-container">
              <div class="blob blue"></div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, defineProps } from 'vue'
import { useStore } from '../../stores/store'
import { useProgressStore } from '../../stores/progress'

const store = useStore()
const progressStore = useProgressStore()

const props = defineProps(['name'])

onMounted(() => {
  progressStore.initActiveStep()
})
// import { mapGetters, mapActions } from 'vuex'

// export default {
//     name: 'Progress-bar',
//     props: {
//         name: String,
//     },
//     computed: {
//         ...mapGetters([
//             'steps',
//             'progress'
//         ])
//     },
//     methods: {
//         ...mapActions([
//             'initActiveStep'
//         ]),
//     },
//     mounted() {
//         let path = this.$router.history.current.path;
//         if (path) {
//             this.initActiveStep(path);
//         }
//     }
// }
</script>
<style lang="scss" scoped>
.active {
  font-weight: 600;
}
.progress {
  margin: 0 auto;
  display: block;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(242, 242, 242, 0.8);
  border-radius: 0.1rem;
  .inner {
    background: rgba(242, 242, 242, 0.9);
    overflow: hidden;
    border-radius: 30px;
  }
  .line {
    width: 0%;
    background: var(--primary-color);
    height: 5px;
    border-radius: 9999px;
  }
  .steps {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    .step {
      text-align: center;
      color: #606060;
      display: flex;
      justify-content: center;
      //cursor: pointer;
    }
    :last-child {
      justify-content: right;
    }
    :first-child {
      justify-content: left;
    }
  }
}
h1 {
  color: #606060;
  font-size: 32px;
  margin: 0 auto;
  padding: 30px 0px;
  text-align: center;
}
.step:not(.active) {
  color: #ebebe4 !important;
}
.blob {
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  margin: 10px;
  height: 8px;
  width: 8px;
  transform: scale(1);
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 #51bbcb;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.blob.blue {
  background: #51bbcb;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  animation: pulse-blue 5s infinite;
}
@media screen and (max-width: 1280px) {
  h1 {
    font-size: 25px;
    padding: 15px 0px;
  }
  .step {
    font-size: 14px;
  }
}
</style>
