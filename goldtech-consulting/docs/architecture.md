# GoldTech Consulting - Architecture Documentation

## 🏗️ System Overview

GoldTech Consulting operates on a modern, serverless AWS architecture designed for scalability, security, and cost-effectiveness.

### Core Infrastructure Stack
- **Frontend**: React SPA hosted on AWS Amplify
- **Domain**: Route 53 DNS management
- **Backend**: AWS Lambda functions for serverless processing
- **Email**: Amazon SES for transactional emails
- **Monitoring**: CloudWatch for logging and metrics

## 🌐 AWS Architecture

### Frontend (AWS Amplify)
```
┌─────────────────────────────────────────┐
│              Route 53                   │
│         (DNS Management)                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            AWS Amplify                  │
│  • React SPA Hosting                   │
│  • CI/CD Pipeline                      │
│  • SSL/TLS Termination                 │
│  • Global CDN                          │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            CloudFront                   │
│  • Global Content Delivery             │
│  • Caching & Compression               │
│  • DDoS Protection                     │
└─────────────────────────────────────────┘
```

### Backend (Serverless)
```
┌─────────────────────────────────────────┐
│            API Gateway                  │
│  • Request Routing                     │
│  • Authentication                      │
│  • Rate Limiting                       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Lambda Functions             │
│  • ContactForm.mjs (SES Integration)   │
│  • Event Processing                    │
│  • Business Logic                      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Amazon SES                   │
│  • Email Delivery                      │
│  • Bounce/Complaint Handling           │
│  • Reputation Management               │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
goldtech-consulting/
├── .cursorrules                    # Cursor IDE configuration
├── ContactForm.mjs                 # Lambda function (root level)
├── README.md                       # Project overview
└── goldtech-consulting/            # Main application
    ├── public/                     # Static assets
    │   ├── index.html
    │   ├── manifest.json
    │   └── images/
    ├── src/                        # React application
    │   ├── components/             # Feature-based components
    │   │   ├── about/
    │   │   ├── contact/
    │   │   ├── footer/
    │   │   ├── hero/
    │   │   ├── nav/
    │   │   ├── projects/
    │   │   ├── services/
    │   │   └── shared/             # Reusable components
    │   ├── App.js                  # Main application component
    │   ├── index.js                # Application entry point
    │   └── index.css               # Global styles
    ├── docs/                       # Documentation
    ├── package.json                # Dependencies & scripts
    └── tailwind.config.js          # Tailwind configuration
```

## 🔧 AWS Services Configuration

### AWS Amplify
- **Framework**: React
- **Build Settings**: 
  - Build command: `npm run build`
  - Output directory: `build`
  - Base directory: `goldtech-consulting`
- **Environment Variables**:
  - `REACT_APP_API_ENDPOINT`: Lambda function URL
  - `REACT_APP_ENVIRONMENT`: production/staging

### Lambda Functions
- **Runtime**: Node.js 18.x
- **Memory**: 256 MB (adjustable based on usage)
- **Timeout**: 30 seconds
- **Environment Variables**:
  - `AWS_REGION`: us-east-2
  - `SES_FROM_EMAIL`: Verified sender email
  - `SES_TO_EMAIL`: Recipient email

### Amazon SES
- **Region**: us-east-2
- **Verified Domains**: goldtech-consulting.com
- **Configuration Set**: For tracking and analytics
- **Suppression List**: Automatic bounce/complaint handling

### Route 53
- **Hosted Zone**: goldtech-consulting.com
- **A Record**: Points to Amplify distribution
- **CNAME**: www.goldtech-consulting.com
- **SSL Certificate**: AWS Certificate Manager (ACM)

## 🚀 Deployment Pipeline

### Frontend Deployment (Amplify)
1. **Source**: GitHub repository
2. **Trigger**: Push to main branch
3. **Build Process**:
   ```bash
   npm install
   npm run build
   npm run build:tailwind
   ```
4. **Deployment**: Automatic to CloudFront distribution

### Lambda Deployment
1. **Local Development**:
   ```bash
   # Test locally
   node ContactForm.mjs
   ```
2. **Deployment**:
   ```bash
   # Package and deploy
   zip ContactForm.zip ContactForm.mjs
   aws lambda update-function-code --function-name ContactForm --zip-file fileb://ContactForm.zip
   ```

## 🔒 Security Architecture

### Network Security
- **HTTPS**: Enforced across all endpoints
- **CORS**: Configured for specific origins
- **WAF**: Web Application Firewall (optional)
- **VPC**: Lambda functions in private subnets (if needed)

### Access Control
- **IAM Roles**: Least privilege principle
- **API Keys**: Rotated regularly
- **Environment Variables**: Encrypted at rest
- **Secrets Manager**: For sensitive configuration

### Data Protection
- **Encryption**: In transit (TLS 1.2+) and at rest
- **Input Validation**: Client and server-side
- **Rate Limiting**: API Gateway throttling
- **Logging**: CloudTrail for audit trails

## 📊 Monitoring & Observability

### CloudWatch Metrics
- **Amplify**: Build success/failure rates
- **Lambda**: Invocations, errors, duration
- **SES**: Bounce rates, delivery rates
- **Route 53**: DNS query metrics

### Logging Strategy
- **Application Logs**: CloudWatch Logs
- **Error Tracking**: CloudWatch Alarms
- **Performance**: X-Ray tracing (optional)
- **Uptime**: Route 53 health checks

### Alerting
- **Lambda Errors**: > 5% error rate
- **SES Bounces**: > 2% bounce rate
- **Amplify Builds**: Build failures
- **DNS Issues**: Resolution failures

## 🔄 CI/CD Pipeline

### Amplify Build Pipeline
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
        - npm run build:tailwind
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
```

### Quality Gates
1. **Code Quality**: ESLint, Prettier
2. **Testing**: Jest, React Testing Library
3. **Security**: npm audit, dependency scanning
4. **Performance**: Bundle size analysis
5. **Accessibility**: axe-core testing

## 🛠️ Development Workflow

### Local Development
```bash
# Frontend development
cd goldtech-consulting
npm install
npm start

# Lambda development
node ContactForm.mjs
```

### Testing Strategy
- **Unit Tests**: Jest for components and utilities
- **Integration Tests**: API Gateway + Lambda
- **E2E Tests**: Cypress for critical user flows
- **Load Tests**: Artillery for performance validation

### Environment Management
- **Development**: Local development with mock services
- **Staging**: Amplify preview branches
- **Production**: Main branch auto-deployment

## 📈 Scalability Considerations

### Frontend Scaling
- **CDN**: CloudFront global distribution
- **Caching**: Static assets cached at edge
- **Code Splitting**: Lazy loading for performance
- **Bundle Optimization**: Tree shaking, minification

### Backend Scaling
- **Lambda**: Auto-scaling based on demand
- **SES**: High-volume email delivery
- **API Gateway**: Request throttling and caching
- **Database**: RDS for future data needs

## 🔧 Maintenance & Operations

### Regular Tasks
- **Security Updates**: Monthly dependency updates
- **Performance Monitoring**: Weekly metrics review
- **Cost Optimization**: Monthly AWS cost analysis
- **Backup Strategy**: Infrastructure as Code (CDK)

### Disaster Recovery
- **Multi-Region**: Cross-region replication
- **Backup**: Automated snapshots
- **Recovery Time**: < 4 hours RTO
- **Recovery Point**: < 1 hour RPO

## 📚 Additional Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Amazon SES Developer Guide](https://docs.aws.amazon.com/ses/)
- [Route 53 Developer Guide](https://docs.aws.amazon.com/route53/)

---

*Last Updated: December 2024*
*Version: 1.0*
