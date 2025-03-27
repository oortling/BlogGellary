<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const headerRef = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="['header-container', { 'scrolled': isScrolled }]"
    ref="headerRef"
  >
    <div class="header-content">
      <h1 class="site-title">Kieran's Gallery</h1>
      <nav class="nav-menu">
        <a href="#" class="nav-item">
          <img class="nav-icon" src="/icons/grid.svg">
          <span>GRID</span>
        </a>
        <a href="#" class="nav-item">
          <img class="nav-icon" src="/icons/device.svg">
          <span>DEVICE</span>
        </a>
        <a href="#" class="nav-item">
          <img class="nav-icon" src="/icons/about.svg">
          <span>ABOUT</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* padding: 1rem 0; */
  background: rgba(255, 255, 255, 0.9);
  width: 100%;
}

.scrolled {
  position: fixed;
  top: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 0;
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scrolled .header-content {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.site-title {
  font-family: 'Fjalla One', sans-serif;
  font-size: 2.2rem;
  text-align: center;
  transition: font-size 0.3s ease;
}

.scrolled .site-title {
  font-size: 1.8rem;
}

.nav-menu {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: #666;
}

.nav-icon {
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(3565%) hue-rotate(315deg) brightness(90%) contrast(83%);
  transition: filter 0.2s ease;
}

.nav-item:hover .nav-icon {
  filter: brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(2476%) hue-rotate(86deg) brightness(93%) contrast(86%);
}

@media (min-width: 768px) {
  .header-content {
    padding: 0 3rem;
  }
}
</style>