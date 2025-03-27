const fs = require('fs/promises');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '../public/photos');
const OUTPUT_FILE = path.join(__dirname, '../public/photos.json');

const isValidDateDir = (dirName) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dirName);
};

const scanPhotos = async () => {
  try {
    const dateDirs = await fs.readdir(PHOTOS_DIR);
    const result = [];

    for (const dir of dateDirs) {
      if (!isValidDateDir(dir)) continue;

      const dirPath = path.join(PHOTOS_DIR, dir);
      const files = await fs.readdir(dirPath);
      
      const photos = files
        .filter(file => ['.jpg','.jpeg','.png'].includes(path.extname(file).toLowerCase()))
        .map(file => ({
          src: `/photos/${dir}/${file}`,
          alt: file.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')
        }));

      if (photos.length > 0) {
        result.push({
          date: dir,
          photos
        });
      }
    }

    // 按日期倒序排列
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log('照片数据生成成功:', OUTPUT_FILE);

  } catch (error) {
    console.error('扫描照片目录失败:', error);
    process.exit(1);
  }
};

scanPhotos();