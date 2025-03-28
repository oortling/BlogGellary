<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  exifData: {
    type: Object,
    default: () => ({})
  }
})

const cameraIcon = computed(() => {
  if (!props.exifData.Make) return null
  if (props.exifData.Make.toLowerCase() === 'iPhone') {
    return '/icons/apple.svg'
  }
  return '/icons/apple.svg'
})
</script>

<template>
  <div class="exif-card">
    <div class="exif-info-left">
      <span v-if="exifData.FocalLength">{{ exifData.FocalLength }}mm</span>
      <span v-if="exifData.FNumber">ƒ/{{ exifData.FNumber }}</span>
      <span v-if="exifData.ExposureTime">{{ exifData.ExposureTime }}s</span>
    </div>
    <div class="exif-info-right">
      <img v-if="cameraIcon" :src="cameraIcon" :alt="exifData.Make" class="camera-icon" />
    </div>
  </div>
</template>

<style scoped>
.exif-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.9em;
  line-height: 1.4;
}

.exif-info-left {
  display: flex;
  gap: 8px;
}

.camera-icon {
  height: 20px;
  width: auto;
}
</style>