<template>
  <div class="wrap">
    <button
      v-on="navItem.items.length !== 0 ? { click: clickHandler } : {}"
      :class="{ button: true, active: open.value }"
    >
      <div class="nav-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          width="24px"
          height="24px"
          class="icon service-icon"
        >
          <!-- <path v-html="navItem.iconPath"></path> -->
        </svg>
        <p v-show="navItem.items.length !== 0" class="title">{{ navItem.title }}</p>
        <p v-show="navItem.items.length === 0">
          <a :href="navItem.url" class="title">{{ navItem.title }}</a>
        </p>
        <svg
          :class="{ rotate: open }"
          v-if="navItem.items.length !== 0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24px"
          height="24px"
          class="icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </button>
    <div class="dropdownMenu" v-if="open" v-click-away="onClickAway">
      <component
        :is="dropdownItem.url.startsWith('/') ? 'router-link' : ''"
        v-for="dropdownItem in navItem.items"
        :key="dropdownItem.id"
        :to="dropdownItem.url"
        :class="{ disable: dropdownItem.disable }"
        :style="{
          'pointer-events': dropdownItem.disable ? 'not-allowed' : 'auto',
          color: dropdownItem.disable ? 'gray' : 'inherit'
        }"
        class="dropdownMenu-text"
        v-text="dropdownItem.title"
      ></component>
      <component
        :is="dropdownItem.url.startsWith('http') ? 'a' : ''"
        v-for="dropdownItem in navItem.items"
        :key="'a' + dropdownItem.id"
        :href="dropdownItem.url"
        class="dropdownMenu-text"
        v-text="dropdownItem.title"
      ></component>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['navItem'])

const open = ref(false)

const clickHandler = () => {
  open.value = !open.value
}

const onClickAway = () => {
  open.value = false
}
</script>

<style scoped lang="scss">
.wrap {
  position: relative;
}

.button {
  padding: 0;
  border: none;
  background: none;
  :hover .title {
    color: white;
    transition: 0.5s;
    transition-delay: 0.1s;
  }
  :hover .service-icon {
    stroke: white;
  }
  :hover {
    background: #51bbcbb3;
    transition: 0.5s;
    transition-timing-function: ease;
    border-radius: 0.375rem;
  }
  cursor: pointer;
}

.nav-item {
  display: flex;
  align-items: center;
  max-height: 36px;
  padding: 0px 5px;
  margin: 0px 10px;

  a,
  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #334155;
    padding: 0px 2px;
    text-decoration: none;
    display: block;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #94a3b8;
    transition: transform 0.3s ease-in;
  }
}

.dropdownMenu {
  z-index: 999;
  width: 240px;
  margin: 0.125rem 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  transform-origin: top right;
  position: absolute;
  right: -35px;

  .dropdownMenu-text {
    margin: 0;
    padding: 20px 20px;
    cursor: pointer;
    transition: 1s;
    transition-timing-function: ease;
    display: block;
    text-decoration: none;
    color: black;
  }

  .dropdownMenu-text:not(.disable):hover {
    background: #51bbcbb3;
    color: white !important;
  }
}

.rotate {
  transform: rotate(180deg);
  stroke: white;
  background: #51bbcbb3;
  border-radius: 50px;
}

.active .nav-item {
  font-weight: 500;
  background: #51bbcbb3;
  border-radius: 0.375rem;
}

.active .title {
  color: white;
}

.disable {
  cursor: not-allowed !important;
}

.dropdownMenu-text.disable:hover {
  background-color: transparent;
}

@media screen and (max-width: 1280px) {
  .router-link-active::after {
    margin: 0;
  }
  .wrap .button {
    width: 100%;
  }
  .nav-item {
    color: white;
    margin: 0.5rem 0.625rem;
    .title {
      color: var(--white);
    }
  }
  .dropdownMenu {
    position: relative;
    width: 100%;
    border: none;
    background: #64748b;
    right: 0;
  }
  .dropdownMenu .dropdownMenu-text {
    padding: 10px 10px;
    color: white !important;
    margin-left: 25px;
    border-radius: 5px;
    font-size: 14px;
  }
  .active .nav-item {
    background: var(--primary-color);
  }
}
</style>
