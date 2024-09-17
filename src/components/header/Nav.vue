<template>
  <div class="topnav" :class="{ responsive: open }">
    <img class="logo" src="../../assets/img/logo.svg" alt="Logo" />
    <div :class="{ flex: !open }" class="mobile-menu">
      <NavItemComponent v-for="(navItem, index) in store.nav" :key="index" :navItem="navItem" />
      <User ref="user" />
    </div>
    <button class="icon" :class="{ active: open }" @click="toggleMobileMenu">
      <svg stroke="#94a3b8" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavItemComponent from './NavItem.vue'
import User from './User.vue'
import { useStore } from '../../stores/store'

const store = useStore()

const open = ref(false)

// const navigation = computed(() => store.getters.navigation)

const toggleMobileMenu = () => {
  open.value = !open.value
  if (open.value) {
    setTimeout(() => {
      //userRef.value.$refs.dropdown.click()
    })
  }
}

const userRef = ref(null)

onMounted(() => {
  //   userRef.value = user
})
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
}

.responsive a {
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.active {
  background-color: #04aa6d;
  color: white;
}

.topnav .icon {
  display: none;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.topnav a:hover,
.dropdown:hover .dropbtn {
  background-color: #555;
  color: white;
}

.icon:hover,
.active {
  background: #334155 !important;
  svg {
    stroke: white;
  }
}

.dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}

.dropdown:hover .dropdown-content {
  display: block;
}

@media screen and (max-width: 1280px) {
  .flex {
    display: none;
  }

  img.logo {
    float: none !important;
    padding-left: 1rem;
    padding-bottom: 0.5rem;
  }

  .topnav button.icon {
    float: right;
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    background: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    margin-right: 1rem;
  }
}

@media screen and (max-width: 1280px) {
  .topnav.responsive {
    position: relative;
  }

  .topnav.responsive button.icon {
    position: absolute;
    right: 0;
    top: 0;
  }

  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }

  .topnav.responsive .dropdown {
    float: none;
  }

  .topnav.responsive .dropdown-content {
    position: relative;
  }

  .topnav.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    text-align: left;
  }
}

img.logo {
  width: 140px;
  height: 40px;
  float: left;
}

@media screen and (max-width: 1280px) {
  .mobile-menu {
    background: #64748b;
  }
}
</style>
