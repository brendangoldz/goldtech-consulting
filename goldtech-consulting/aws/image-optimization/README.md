# Image Optimization Microservice

A serverless, microservice-based image optimization solution using AWS Lambda, S3, and CloudFront.

## Architecture

```
User Request
    ↓
CloudFront CDN
    ↓
Lambda@Edge / API Gateway
    ↓
Lambda Function (Image Optimization)
    ↓
S3 (Original Images + Cache)
```

## Features

- **On-the-fly optimization**: Resize, format conversion, quality adjustment
- **Intelligent caching**: Optimized images cached in S3
- **Format support**: WebP, AVIF, JPEG, PNG
- **Responsive images**: Multiple sizes for different viewports
- **Microservice architecture**: Reusable, independent service

## Setup

### 1. Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js 18+ installed
- Access to create S3 buckets, Lambda functions, and CloudFront distributions

### 2. Configure Environment Variables

```bash
export AWS_REGION=us-east-2
export BUCKET_NAME=goldtech-consulting-images
export FUNCTION_NAME=goldtech-image-optimization
```

### 3. Create S3 Bucket

```bash
cd aws/image-optimization
bash setup.sh
```

This will:
- Create S3 bucket for images
- Configure CORS
- Set up bucket policies
- Enable versioning

### 4. Deploy Lambda Function

```bash
bash deploy-lambda.sh
```

This will:
- Install dependencies
- Create IAM role with necessary permissions
- Deploy Lambda function
- Configure environment variables

### 5. Upload Images

```bash
cd ../..
npm run upload-images
```

### 6. Configure CloudFront

1. Create CloudFront distribution
2. Set origin to your S3 bucket
3. Configure Origin Access Control
4. Set up Lambda@Edge or API Gateway integration (optional)
5. Update cache behaviors

### 7. Set Environment Variable

In your AWS Amplify console or `.env` file:

```bash
REACT_APP_IMAGE_CDN_URL=https://your-cloudfront-domain.cloudfront.net
```

## Usage

### URL Format

```
/{width}x{height}/{quality}/{format}/{image-path}
```

### Examples

- `/800x600/80/webp/projects/screenshot.png` - 800x600 WebP at 80% quality
- `/1200x/90/avif/projects/screenshot.png` - 1200px width, auto height, AVIF
- `/x400/75/jpeg/projects/screenshot.png` - 400px height, auto width, JPEG

### In React Components

```javascript
import { getOptimizedImageUrl } from '../utils/imageUtils';

const imageUrl = getOptimizedImageUrl('/projects/screenshot.png', {
  width: 800,
  height: 600,
  quality: 80,
  format: 'webp'
});
```

Or use the `OptimizedImage` component:

```javascript
import OptimizedImage from '../components/shared/OptimizedImage';

<OptimizedImage
  src="/projects/screenshot.png"
  alt="Screenshot"
  width={800}
  height={600}
  quality={80}
/>
```

## Cost Optimization

- **S3 Storage**: ~$0.023/GB/month
- **Lambda**: First 1M requests free, then $0.20 per 1M requests
- **CloudFront**: ~$0.085/GB for first 10TB
- **Data Transfer**: Free within AWS, minimal for CloudFront

**Estimated monthly cost for 100GB images, 1M requests**: ~$10-15

## Performance Benefits

- **Initial Load**: Reduced from 86MB to ~2-5MB (first page)
- **Format Optimization**: WebP/AVIF reduce file size by 25-50%
- **CDN Caching**: Images served from edge locations globally
- **Lazy Loading**: Images load only when needed
- **Progressive Loading**: Placeholders show immediately

## Monitoring

Monitor via CloudWatch:
- Lambda invocations and errors
- S3 request metrics
- CloudFront cache hit rates
- Image optimization times

## Troubleshooting

### Images not loading
- Check S3 bucket permissions
- Verify CloudFront distribution is active
- Check Lambda function logs in CloudWatch

### Slow optimization
- Increase Lambda memory (default: 1024MB)
- Check if images are being cached properly
- Monitor Lambda cold starts

### High costs
- Review CloudFront cache hit rates
- Optimize cache TTL settings
- Consider pre-generating common sizes

## Maintenance

- **Update Lambda**: Run `deploy-lambda.sh` after code changes
- **Clear Cache**: Delete objects from S3 `optimized/` prefix
- **Monitor Costs**: Set up CloudWatch billing alarms
