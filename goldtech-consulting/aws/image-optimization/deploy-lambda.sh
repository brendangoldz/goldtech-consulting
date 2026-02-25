#!/bin/bash
# Deploy Image Optimization Lambda Function

set -e

FUNCTION_NAME="${FUNCTION_NAME:-goldtech-image-optimization}"
REGION="${AWS_REGION:-us-east-2}"
BUCKET_NAME="${BUCKET_NAME:-goldtech-consulting-images}"
ROLE_NAME="${ROLE_NAME:-goldtech-image-optimization-role}"

# Get script directory for temp files (works cross-platform)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMP_DIR="$SCRIPT_DIR"

# Function to convert Git Bash path to Windows path for AWS CLI
convert_path_for_aws() {
  local path="$1"
  # If path starts with /c/, /d/, etc., convert to Windows format with forward slashes
  # AWS CLI on Windows accepts file:// URLs with forward slashes
  if [[ "$path" =~ ^/([a-zA-Z])/ ]]; then
    local drive="${BASH_REMATCH[1],,}"  # Convert to lowercase
    path="${drive}:${path#/[a-zA-Z]}"
  fi
  echo "$path"
}

# Cleanup function
cleanup() {
  cd "$SCRIPT_DIR" 2>/dev/null || true
  rm -f trust-policy.json s3-policy.json 2>/dev/null || true
}
trap cleanup EXIT

echo "📦 Building Lambda package..."

cd lambda
npm install --production

# Create deployment package
zip -r ../function.zip . -x "*.git*" "*.md" "node_modules/.cache/*"

cd ..

echo "🔐 Setting up IAM role..."

# Ensure we're in the script directory
cd "$SCRIPT_DIR"

# Create IAM role if it doesn't exist

ROLE_ARN=$(aws iam get-role --role-name "$ROLE_NAME" --query 'Role.Arn' --output text 2>/dev/null || echo "")

if [ -z "$ROLE_ARN" ]; then
  echo "Creating IAM role..."
  
  # Create trust policy (use relative path since we're in script directory)
  TRUST_POLICY_FILE="trust-policy.json"
  cat > "$TRUST_POLICY_FILE" <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

  # Get absolute path and convert for AWS CLI (Windows compatibility)
  TRUST_POLICY_ABS=$(cd "$(dirname "$TRUST_POLICY_FILE")" && pwd)/$(basename "$TRUST_POLICY_FILE")
  TRUST_POLICY_FILE_AWS=$(convert_path_for_aws "$TRUST_POLICY_ABS")

  # Create role
  aws iam create-role \
    --role-name "$ROLE_NAME" \
    --assume-role-policy-document "file://$TRUST_POLICY_FILE_AWS"

  # Attach basic execution policy
  aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

  # Create and attach S3 access policy
  S3_POLICY_FILE="s3-policy.json"
  cat > "$S3_POLICY_FILE" <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

  # Get absolute path and convert for AWS CLI (Windows compatibility)
  S3_POLICY_ABS=$(cd "$(dirname "$S3_POLICY_FILE")" && pwd)/$(basename "$S3_POLICY_FILE")
  S3_POLICY_FILE_AWS=$(convert_path_for_aws "$S3_POLICY_ABS")

  POLICY_ARN=$(aws iam create-policy \
    --policy-name "${ROLE_NAME}-s3-policy" \
    --policy-document "file://$S3_POLICY_FILE_AWS" \
    --query 'Policy.Arn' --output text)

  aws iam attach-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-arn "$POLICY_ARN"

  ROLE_ARN=$(aws iam get-role --role-name "$ROLE_NAME" --query 'Role.Arn' --output text)
  
  echo "Waiting for role to be ready..."
  sleep 10
fi

echo "🚀 Deploying Lambda function..."

# Check if function exists
FUNCTION_EXISTS=$(aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" 2>/dev/null || echo "")

if [ -z "$FUNCTION_EXISTS" ]; then
  echo "Creating new Lambda function..."
  aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime nodejs18.x \
    --role "$ROLE_ARN" \
    --handler index.handler \
    --zip-file fileb://function.zip \
    --timeout 30 \
    --memory-size 1024 \
    --region "$REGION" \
    --environment "Variables={IMAGE_BUCKET=$BUCKET_NAME}"
else
  echo "Updating existing Lambda function..."
  aws lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file fileb://function.zip \
    --region "$REGION"
fi

# Update environment variables (AWS_REGION is automatically provided by Lambda)
aws lambda update-function-configuration \
  --function-name "$FUNCTION_NAME" \
  --environment "Variables={IMAGE_BUCKET=$BUCKET_NAME}" \
  --region "$REGION"

echo "✅ Lambda function deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Create API Gateway or Function URL for the Lambda"
echo "2. Update CloudFront to use Lambda@Edge or API Gateway"
echo "3. Set IMAGE_CDN_URL environment variable in your app"

# Cleanup
rm -f function.zip
