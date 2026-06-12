import sharp from 'sharp';
import {
  QUOTE_UPLOAD_MAX_FILE_BYTES,
  QUOTE_UPLOAD_MAX_IMAGE_DIMENSION,
} from '@/lib/uploads/shared/uploadLimits';

function buildImagePipeline(buffer: Buffer, maxDimension: number, quality: number) {
  return sharp(buffer, {
    limitInputPixels: 40_000_000,
  })
    .rotate()
    .resize({
      width: maxDimension,
      height: maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .flatten({ background: '#ffffff' })
    .jpeg({
      quality,
      mozjpeg: true,
    })
    .toBuffer();
}

export async function processQuoteImage(buffer: Buffer) {
  const primary = await buildImagePipeline(
    buffer,
    QUOTE_UPLOAD_MAX_IMAGE_DIMENSION,
    82,
  );

  if (primary.length <= QUOTE_UPLOAD_MAX_FILE_BYTES) return primary;

  const fallback = await buildImagePipeline(buffer, 2000, 72);
  if (fallback.length <= QUOTE_UPLOAD_MAX_FILE_BYTES) return fallback;

  throw new Error('Cleaned photo remained over the allowed size limit.');
}
