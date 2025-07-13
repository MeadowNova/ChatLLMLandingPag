# GitHub Secrets Setup Guide

This document explains how to configure the required GitHub secrets for CI/CD deployment.

## Required Secrets

### 1. VERCEL_TOKEN
- **Purpose**: Authenticates with Vercel for deployments
- **How to get**: 
  1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
  2. Create a new token with appropriate scope
  3. Copy the token value

### 2. VERCEL_ORG_ID
- **Purpose**: Identifies your Vercel organization
- **How to get**:
  1. Go to your Vercel project settings
  2. Copy the "Organization ID" from the project settings

### 3. VERCEL_PROJECT_ID
- **Purpose**: Identifies your specific Vercel project
- **How to get**:
  1. Go to your Vercel project settings
  2. Copy the "Project ID" from the project settings

### 4. PRODUCTION_URL
- **Purpose**: Your production domain for health checks
- **Format**: `https://your-domain.com` (no trailing slash)
- **Examples**:
  - `https://chatllm-mastery.vercel.app`
  - `https://your-custom-domain.com`

## How to Set Secrets

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret with the exact name and value

## Verification

After setting up secrets, the CI/CD pipeline will:
- ✅ Deploy to Vercel automatically on push to main
- ✅ Run health checks against your production URL
- ✅ Fail if health checks don't pass

## Troubleshooting

### Health Check Failures
- Ensure PRODUCTION_URL is set correctly (no trailing slash)
- Verify your app has `/api/health` and `/api/health/db` endpoints
- Check Vercel deployment logs for any issues

### Deployment Failures
- Verify VERCEL_TOKEN has correct permissions
- Ensure VERCEL_ORG_ID and VERCEL_PROJECT_ID match your project
- Check that environment variables are set in Vercel Dashboard

## Security Notes

- Never commit secrets to your repository
- Rotate tokens periodically
- Use least-privilege access for tokens
- Monitor secret usage in GitHub Actions logs
