<script setup>
import { ref, onMounted, createApp, h } from 'vue'
import { Fancybox } from "@fancyapps/ui"
import ExifCard from './ExifCard.vue';
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import piexif from 'piexifjs'

const photoGroups = ref([])

// 模拟从API获取照片数据
const fetchPhotos = async () => {
    try {
        const response = await fetch('photos.json')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error('加载照片数据失败:', error)
        return []
    }
}

const loadExifData = (photoPath) => {
    return new Promise((resolve) => {
        fetch(photoPath)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                try {
                    const binaryStr = Array.from(new Uint8Array(buffer))
                        .map(byte => String.fromCharCode(byte))
                        .join('');
                    const exifStr = piexif.load(binaryStr);
                    const exifData = {
                        Make: exifStr['0th'][piexif.ImageIFD.Make],
                        Model: exifStr['0th'][piexif.ImageIFD.Model],
                        FNumber: exifStr['Exif'][piexif.ExifIFD.FNumber],
                        ExposureTime: exifStr['Exif'][piexif.ExifIFD.ExposureTime],
                        ISOSpeedRatings: exifStr['Exif'][piexif.ExifIFD.ISOSpeedRatings],
                        FocalLength: exifStr['Exif'][piexif.ExifIFD.FocalLength],
                        LensModel: exifStr['Exif'][piexif.ExifIFD.LensModel]
                    };
                    resolve(exifData);
                } catch (e) {
                    console.error('Failed to load EXIF data:', e);
                    resolve(null);
                }
            })
            .catch(e => {
                console.error('Failed to fetch image:', e);
                resolve(null);
            });
    })
}

onMounted(async () => {
    const groups = await fetchPhotos()

    // 为每张照片加载EXIF数据
    for (const group of groups) {
        for (const photo of group.photos) {
            try {
                photo.exif = await loadExifData(photo.src)
            } catch (e) {
                console.error('Failed to load EXIF data:', e)
            }
        }
    }

    photoGroups.value = groups

    // 初始化Fancybox
    Fancybox.bind('[data-fancybox]', {
        // Fancybox配置
        Carousel: {
            transition: 'slide',
            infinite: false,
        },
        Images: {
            // content: (_ref, slide) => {
            //     let rez = "<picture>";
            //     rez += `<img src="${slide.src}" alt="" "/>`;
            //     const exifData = photoGroups.value.find(g => g.photos.some(p => p.src === slide.src)).photos.find(p => p.src === slide.src).exif;
            //     const appDiv = document.createElement('div');
            //     const app = createApp({
            //         render: () => h(ExifCard, { exifData })
            //     });
            //     app.mount(appDiv);
            //     rez += appDiv.innerHTML;
            //     rez += "</picture>";
            //     return rez;
            // },
            protected: true,
            zoom: true,
        },
        showClass: 'f-fadeIn',
        contentClick: false,
    })
})
</script>

<template>
    <div class="gallery-container">
        <div v-for="group in photoGroups" :key="group.date" class="photo-group">
            <h2>{{ group.date }}</h2>
            <div class="photo-grid">
                <a v-for="(photo, index) in group.photos" :key="index" :href="photo.src"
                    :data-fancybox="`gallery-${group.date}`" :data-src="photo.src" class="photo-item">
                    <img :src="photo.src" :alt="photo.alt" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gallery-container {
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
}

.photo-group {
    margin-bottom: 40px;
}

.photo-group h2 {
    font-weight: 300;
}

.photo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.photo-item {
    overflow: hidden;
    border-radius: 4px;
}

.photo-item {
    position: relative;
}

.photo-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.exif-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
    font-size: 12px;
    line-height: 1.4;
}

.photo-item:hover img {
    transform: scale(1.05);
}

.image-container {
    position: relative;
    height: 100%;
}
</style>