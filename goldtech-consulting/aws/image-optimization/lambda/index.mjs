/**
 * Image Optimization Lambda Function
 * 
 * Microservice for on-the-fly image optimization
 * Supports: resize, format conversion (WebP/AVIF), quality adjustment
 * 
 * Usage: GET /{width}x{height}/{quality}/{format}/{image-path}
 * Example: /800x600/80/webp/projects/screenshot.png
 */

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3Client = new S3Client({ region: process.env.AWS_REGION || 'us-east-2' });
const BUCKET_NAME = process.env.IMAGE_BUCKET || 'goldtech-consulting-images';
const CACHE_TTL = 31536000; // 1 year

/**
 * Parse optimization parameters from path
 */
function parseOptimizationParams(path) {
  // Pattern: /{width}x{height}/{quality}/{format}/{image-path}
  const parts = path.split('/').filter(Boolean);
  
  if (parts.length < 4) {
    return null;
  }

  const [dimensions, quality, format, ...imagePathParts] = parts;
  const imagePath = imagePathParts.join('/');

  // Parse dimensions (e.g., "800x600" or "800x" or "x600")
  const [width, height] = dimensions.split('x').map(v => v ? parseInt(v, 10) : null);

  // Validate format
  const validFormats = ['webp', 'avif', 'jpeg', 'png', 'jpg'];
  const outputFormat = validFormats.includes(format) ? format : 'webp';

  // Validate quality (1-100)
  const outputQuality = Math.min(100, Math.max(1, parseInt(quality, 10) || 80));

  return {
    imagePath,
    width,
    height,
    quality: outputQuality,
    format: outputFormat,
  };
}

/**
 * Get optimized image from cache or generate new one
 */
async function getOptimizedImage(params) {
  const cacheKey = `optimized/${params.width || 'auto'}x${params.height || 'auto'}/${params.quality}/${params.format}/${params.imagePath}`;

  try {
    // Try to get from cache first
    const cached = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: cacheKey,
      })
    );

    if (cached.Body) {
      const buffer = await streamToBuffer(cached.Body);
      return {
        buffer,
        contentType: getContentType(params.format),
        fromCache: true,
      };
    }
  } catch (error) {
    // Cache miss, continue to generate
    console.log('Cache miss, generating optimized image');
  }

  // Get original image
  const original = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: params.imagePath,
    })
  );

  if (!original.Body) {
    throw new Error('Original image not found');
  }

  const originalBuffer = await streamToBuffer(original.Body);

  // Optimize image
  let sharpInstance = sharp(originalBuffer);

  // Resize if dimensions specified
  if (params.width || params.height) {
    sharpInstance = sharpInstance.resize(params.width, params.height, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Convert format and apply quality
  let optimizedBuffer;
  switch (params.format) {
    case 'webp':
      optimizedBuffer = await sharpInstance.webp({ quality: params.quality }).toBuffer();
      break;
    case 'avif':
      optimizedBuffer = await sharpInstance.avif({ quality: params.quality }).toBuffer();
      break;
    case 'jpeg':
    case 'jpg':
      optimizedBuffer = await sharpInstance.jpeg({ quality: params.quality }).toBuffer();
      break;
    case 'png':
      optimizedBuffer = await sharpInstance.png({ quality: params.quality, compressionLevel: 9 }).toBuffer();
      break;
    default:
      optimizedBuffer = await sharpInstance.webp({ quality: params.quality }).toBuffer();
  }

  // Save to cache
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: cacheKey,
        Body: optimizedBuffer,
        ContentType: getContentType(params.format),
        CacheControl: `public, max-age=${CACHE_TTL}`,
      })
    );
  } catch (error) {
    console.error('Failed to cache optimized image:', error);
  }

  return {
    buffer: optimizedBuffer,
    contentType: getContentType(params.format),
    fromCache: false,
  };
}

/**
 * Stream to buffer helper
 */
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Get content type from format
 */
function getContentType(format) {
  const types = {
    webp: 'image/webp',
    avif: 'image/avif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
  };
  return types[format] || 'image/webp';
}

/**
 * Lambda handler
 */
export const handler = async (event) => {
  try {
    const path = event.path || event.rawPath || '';
    const params = parseOptimizationParams(path);

    if (!params) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Invalid path format. Use: /{width}x{height}/{quality}/{format}/{image-path}',
        example: '/800x600/80/webp/projects/screenshot.png',
        }),
      };
    }

    const optimized = await getOptimizedImage(params);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': optimized.contentType,
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'X-Optimized': optimized.fromCache ? 'cache' : 'generated',
      },
      body: optimized.buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error optimizing image:', error);

    return {
      statusCode: error.statusCode || 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.message || 'Internal server error',
      }),
    };
  }
};
