<template>
  <div class="mb-0">
    <nav id="piveau-header" class="navbar fixed-top">
      <div class="left-point">
        <slot name="logo">
          <a class="navbar-brand" href="/"
            ><img src="../../assets/img/PISTIS_logo_white.png" height="40"
          /></a>
        </slot>

        <ul
          :class="`${navEnabled ? 'link-container link-container-open' : 'link-container link-container-closed'}`"
        >
          <li class="router-link-active nav-link">Home</li>
          <li class="nav-link">My Data</li>
          <li class="nav-link">My Transactions</li>
          <li class="nav-link">Market Insights</li>
        </ul>

        <!-- <div class="right-point">
              <font-awesome-icon class="bell" :icon="['fas', 'bell']"></font-awesome-icon>
              <span class="sign-out">
                  <font-awesome-icon :icon="['fas', 'fa-bell']" class="user"></font-awesome-icon>
                  <font-awesome-icon :icon="['fas', 'fa-bell']" class="arrow"></font-awesome-icon>
              </span>
          </div> -->
      </div>

      <div
        :class="`${navEnabled ? 'right-point right-point-open' : 'right-point right-point-closed'}`"
      >
        <font-awesome-icon class="bell" :icon="['fas', 'bell']"></font-awesome-icon>
        <span class="sign-out">
          <font-awesome-icon :icon="['fas', 'fa-bell']" class="user"></font-awesome-icon>
          <font-awesome-icon :icon="['fas', 'fa-bell']" class="arrow"></font-awesome-icon>
        </span>
      </div>

      <button @click="toggleNav" class="toggler" type="button">
        <span v-if="navEnabled">&#x2715;</span>
        <span v-else>&#8801;</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const navEnabled = ref(false)

// functions that mutate state and trigger updates
function toggleNav() {
  navEnabled.value = !navEnabled.value
}
</script>

<style lang="scss" scoped>
// @import '../styles/_variables.scss';

.navbar {
  background: #5632d0 !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .toggler {
    color: #fff !important;
    background-color: transparent;
    font-size: 2rem;
    padding: 0;
    margin-right: 1rem;
    border: none;
    position: absolute;
    top: 0.5rem;
    right: 0.8rem;
  }

  .right-point {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    align-items: center;
    font-size: 1.2rem;
    margin-right: 0.2rem;

    &-closed {
      display: none;
    }

    .bell {
      color: #c5c8ff;
      border: 1px solid transparent;
      border-radius: 100%;
      padding: 0.5rem 0.6rem;
      cursor: pointer;
      transition: 0.5s;

      &:hover {
        color: #fff;
        border: 1px solid #fff;
      }
    }

    .sign-out {
      display: flex;
      gap: 1rem;
      align-items: center;
      .user {
        background-color: #c5c8ff;
        padding: 0.6rem 0.7rem;
        cursor: pointer;
        border-radius: 100%;
        color: #71717a;
      }
      .arrow {
        color: #a2a4ff;
        font-size: 0.8rem;
      }
    }
  }

  .left-point {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .link-container {
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
      margin: 0;
      gap: 1rem;

      &-closed {
        display: none;
      }
    }

    // .link-container-closed {

    // }

    // .link-container-open {
    //     display: flex;
    //     padding: .4rem;
    //     flex-direction: column;
    //     margin: 0;
    //     gap: 1rem;
    // }
  }
}

#piveau-header {
  position: relative;
}

.piveau-logo {
  max-height: 55px;
  width: auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

.nav-link {
  color: #fff !important;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0.75rem !important;

  &:hover {
    background-color: #613debbf !important;
    border-radius: 0.375rem;
  }
}

.router-link-active {
  color: #fff !important;
  font-size: 1rem;
  background-color: #462ba8;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem !important;

  &:hover {
    color: rgba(250, 250, 250, 0.9) !important;
  }
}

.sub-nav {
  background-color: transparent !important;
  height: 3rem;
  display: flex;
  align-items: end;
  gap: 2rem;
  list-style-type: none;
  color: #18181b;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-bottom: 0 !important;
  -webkit-box-shadow: 0px 11px 40px -14px #d4d4d8;
  box-shadow: 0px 11px 40px -14px #d4d4d8;
  border-bottom: 0.1px solid #d4d4d8;

  li {
    padding-bottom: 0.8rem;
    border-bottom: 2px solid transparent;
  }

  li:hover {
    border-bottom: 2px solid #613deb;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #613deb;
  }
}

@media screen and (min-width: 667px) {
  .navbar {
    .toggler {
      display: none;
    }

    .left-point {
      flex-direction: row;

      .link-container {
        flex-direction: row;
      }

      .link-container-closed {
        flex-direction: row !important;
        display: flex !important;
      }
    }
  }

  .right-point {
    margin-right: 3rem;
    width: auto !important;
    &-closed {
      display: flex !important;
    }
  }
}
</style>
