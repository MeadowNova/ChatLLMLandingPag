# Vercel CLI commands to set environment variables
# Run these commands to set production environment variables

vercel env add DATABASE_URL production
# Enter: postgres://default:***@***-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require

vercel env add NEXTAUTH_SECRET production
# Enter: ZQNfqNAsxGB/pV4hOlZpAa+arutrHgtSr8iR2OQOU9g=

vercel env add NEXTAUTH_URL production
# Enter: https://your-custom-domain.com

vercel env add NODE_ENV production
# Enter: production

vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
# Enter: G-XXXXXXXXXX

vercel env add NEXT_PUBLIC_FB_PIXEL_ID production
# Enter: 000000000000000
