<script setup>
const props = defineProps({
  visible: Boolean
})
</script>

<template>
  <footer 
      v-if="visible"
      class="footer-container"
    >
      <div class="footer-content">
        No more photos to load
      </div>
    </footer>
</template>

<style scoped>
.footer-container {
  position: relative;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  text-align: center;

  z-index: 900;
}

.footer-content {
  color: #666;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}


</style>