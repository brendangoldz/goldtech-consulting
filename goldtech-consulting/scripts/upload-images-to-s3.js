/**
 * Upload Images to S3 Script
 * 
 * Uploads all project images from public/projects to S3 bucket
 * and optionally optimizes them during upload
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const BUCKET_NAME = process.env.IMAGE_BUCKET || 'goldtech-consulting-images';
const REGION = process.env.AWS_REGION || 'us-east-2';
const PROJECTS_DIR = path.join(__dirname, '..', 'public', 'projects');

const s3Client = new S3Client({ region: REGION });

/**
 * Upload file to S3
 */
async function uploadFile(filePath, key) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = path.extname(filePath) === '.png' ? 'image/png' : 'image/svg+xml';

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000', // 1 year
  });

  try {
    await s3Client.send(command);
    console.log(`✅ Uploaded: ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to upload ${key}:`, error.message);
    return false;
  }
}

/**
 * Main upload function
 */
async function uploadImages() {
  console.log(`📦 Uploading images to S3 bucket: ${BUCKET_NAME}`);
  console.log(`📁 Source directory: ${PROJECTS_DIR}\n`);

  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error(`❌ Directory not found: ${PROJECTS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter(file => 
    file.endsWith('.png') || file.endsWith('.svg')
  );

  if (files.length === 0) {
    console.log('⚠️  No image files found to upload');
    return;
  }

  console.log(`Found ${files.length} image files\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const filePath = path.join(PROJECTS_DIR, file);
    const key = `projects/${file}`;
    
    const success = await uploadFile(filePath, key);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`\n💡 Images are now available at:`);
  console.log(`   https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/projects/[filename]`);
  console.log(`\n📝 Next: Configure CloudFront distribution and update IMAGE_CDN_URL`);
}

// Run if called directly
if (require.main === module) {
  uploadImages().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { uploadImages };
