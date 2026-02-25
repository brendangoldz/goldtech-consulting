#!/bin/bash
# AWS Infrastructure Setup Script for Image Optimization
# This script sets up S3, CloudFront, and Lambda for image optimization

set -e

BUCKET_NAME="${BUCKET_NAME:-goldtech-consulting-images}"
REGION="${AWS_REGION:-us-east-2}"
STACK_NAME="goldtech-image-optimization"

# Get script directory for temp files (works cross-platform)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMP_DIR="$SCRIPT_DIR"

# Cleanup function
cleanup() {
  rm -f "$TEMP_DIR/cors.json" "$TEMP_DIR/bucket-policy.json" 2>/dev/null || true
}
trap cleanup EXIT

echo "🚀 Setting up AWS infrastructure for image optimization..."

# Create S3 bucket for images
echo "📦 Creating S3 bucket: $BUCKET_NAME"
aws s3api create-bucket \
  --bucket "$BUCKET_NAME" \
  --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION" 2>/dev/null || echo "Bucket may already exist"

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket "$BUCKET_NAME" \
  --versioning-configuration Status=Enabled

# Configure CORS
CORS_FILE="$TEMP_DIR/cors.json"
cat > "$CORS_FILE" <<EOF
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
EOF

aws s3api put-bucket-cors \
  --bucket "$BUCKET_NAME" \
  --cors-configuration "file://$CORS_FILE"

# Set bucket policy for CloudFront access
POLICY_FILE="$TEMP_DIR/bucket-policy.json"
cat > "$POLICY_FILE" <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket "$BUCKET_NAME" \
  --policy "file://$POLICY_FILE"

echo "✅ S3 bucket configured successfully"
echo ""
echo "📝 Next steps:"
echo "1. Deploy Lambda function: cd aws/image-optimization && ./deploy-lambda.sh"
echo "2. Create CloudFront distribution manually or via CloudFormation"
echo "3. Upload images: npm run upload-images"
echo ""
echo "💡 CloudFront Distribution Settings:"
echo "   - Origin: $BUCKET_NAME.s3.$REGION.amazonaws.com"
echo "   - Origin Access Control: Recommended"
echo "   - Cache Policy: CachingOptimized"
echo "   - Viewer Protocol Policy: Redirect HTTP to HTTPS"
