/**
 * 图像处理工具模块
 * 提供基于 Canvas 的高性能客户端压缩与 AVIF 格式转换
 * 不包含任何敏感凭据
 */

/**
 * 将图片文件通过 Canvas 压缩并转换为 AVIF Blob
 * @param {File} file 原图片文件
 * @param {number} maxWidth 最大宽度
 * @param {number} maxHeight 最大高度
 * @param {number} quality 质量 (0-1)
 * @returns {Promise<Blob>}
 */
export async function convertImageToAvif(file, maxWidth = 800, maxHeight = 800, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target.result
    }
    reader.onerror = (err) => reject(new Error('读取图片文件失败: ' + err.message))

    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        } else {
          width = Math.round((width * maxHeight) / height)
          height = maxHeight
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // 优先导出为 image/avif
      canvas.toBlob(
        (blob) => {
          if (blob && blob.type.includes('avif')) {
            resolve(blob)
          } else {
            // 如果浏览器不支持直接导出 avif，回退使用 webp 或原文件 blob
            canvas.toBlob(
              (fallbackBlob) => {
                if (fallbackBlob) {
                  resolve(fallbackBlob)
                } else {
                  resolve(file)
                }
              },
              'image/webp',
              quality
            )
          }
        },
        'image/avif',
        quality
      )
    }

    img.onerror = () => reject(new Error('加载图片失败，请确保文件是有效图像'))
    reader.readAsDataURL(file)
  })
}
