# ChatLLM Landing Page

A modern Next.js landing page for ChatLLM Master Training Course by Abacus.AI.

🚀 **Production Ready** - Deployed with Vercel Postgres integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Development Setup

1. **Clone and install dependencies:**
```bash
cd app
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your database credentials
```

3. **Start with Docker (Recommended):**
```bash
# From project root
docker-compose up -d
```

4. **Or run locally:**
```bash
# Start PostgreSQL locally first, then:
cd app
npx prisma migrate dev
npx prisma generate
npm run dev
```

### Database Setup

The application uses PostgreSQL with Prisma ORM. Database migrations are automatically applied in Docker setup.

For local development:
```bash
npx prisma migrate dev
npx prisma generate
```

## 🏗️ Architecture

- **Frontend:** Next.js 14 with App Router
- **Styling:** Tailwind CSS + Radix UI
- **Database:** PostgreSQL + Prisma ORM
- **Deployment:** Docker containerized

## 📁 Project Structure

```
app/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
├── lib/               # Utility functions
├── prisma/            # Database schema & migrations
└── public/            # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Docker Production
```bash
docker-compose up -d
```

### Manual Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Run database migrations: `npx prisma migrate deploy`
4. Start the server: `npm start`

## 🔒 Security Features

- Rate limiting on API endpoints
- Security headers configured
- Input validation with Zod
- SQL injection protection via Prisma

## 📊 API Endpoints

- `POST /api/subscribe` - Email subscription
- `GET /api/subscribe` - Subscription stats
- `GET /api/health` - Health check

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is proprietary to Abacus.AI.
