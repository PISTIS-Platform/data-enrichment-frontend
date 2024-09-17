<template>
  <div class="userInfo dropdown">
    <div @click="toggleDropdown" ref="dropdown" class="user">
      <!-- <div class="userAvatar">
        <span>{{ user.firstName[0] }}</span>
      </div>
      <span class="info">
        <p class="name">{{ user.firstName }} {{ user.lastName }}</p>
        <p v-if="isMobileView" class="email">{{ user.email }}</p>
      </span>
      <svg class="dropdownIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
    <div v-if="open" class="dropdown-content" @clickaway="away">
      <a v-for="(button, index) in filteredButtons.slice(0, -1)" :key="index" :href="button.link">{{
        button.name
      }}</a>
      <button @click="logout" class="btn">
        {{ filteredButtons[filteredButtons.length - 1].name }}
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { clickaway } from 'vue-clickaway'
// import { mapGetters, mapActions } from 'vuex'

const open = ref(false)

const toggleDropdown = () => {
  open.value = !open.value
}

const away = () => {
  open.value = false
}

// const { user } = mapGetters(['user'])
// const { buttons } = mapGetters(['buttons'])

// const filteredButtons = computed(() => {
//   if (user.value.admin) {
//     return buttons.value.filter((button) => button.name !== 'Organization Details')
//   } else {
//     return buttons.value.filter((button) => button.name !== 'Organization Management')
//   }
// })

// const isMobileView = computed(() => {
//   return window.innerWidth < 1280
// })

const logout = () => {
  $store
    .dispatch('logout')
    .then(() => {
      $router.push('/login')
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<style scoped lang="scss">
.userInfo {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.userAvatar {
  display: flex;
  color: #ffffff;
  font-weight: 500;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  background: #64748b;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  float: left;
}

.name,
.email {
  font-size: 16px;
  color: #334155;
  padding: 0px 4px;
  float: left;
  margin: 0;
}

.email {
  color: #94a3b8;
  font-size: 14px;
}

.dropdownIcon {
  height: 1rem;
  width: 1rem;
  padding-top: 13px;
}

.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  min-width: 192px;
}

.dropdown-content {
  margin-top: 10px;
  position: fixed;
  background-color: #f9f9f9;
  max-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 3px 0px;
  a,
  .btn {
    display: block;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    border: none;
    text-align: left;
    background: white;
    text-decoration: none;
    color: black;
  }
}

.btn {
  width: 100%;
}

.dropdown-content :hover,
.btn:hover {
  background: #51bbcbb3;
  color: white;
}

.user {
  display: flex;
  justify-content: end;
  margin-left: 40px;
}

.info {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1280px) {
  .dropdown {
    width: 100%;
    background: #475569;
    padding-top: 0.75rem;
  }

  .user {
    margin: 0.5rem 0.625rem;
    justify-content: start;
  }

  .userAvatar {
    background: #058ea3;
  }

  .name {
    color: var(--white);
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 12px;
    align-items: flex-start;
  }

  .dropdown-content {
    margin-top: 0;
    max-width: 100%;
    background: #475569;
    a,
    .btn {
      background: #475569;
      color: white;
      margin: 0.5rem 0.625rem;
    }

    .btn:hover,
    a:hover {
      background: #058ea3;
    }
  }
}
</style>
