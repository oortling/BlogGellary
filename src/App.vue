<script setup>
import Gallery from './components/Gallery.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <Gallery />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  min-height: 100vh;
}

Header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  transition: background 1s ease;
}

.main-content {
  height: 100vh;
  padding: 2rem;
  padding-top: 160px;
  max-width: 1200px;
  margin: 0 auto;
}

.scrolled Header {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
