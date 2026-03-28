# Ultra Marathon Database

The definitive directory of ultra marathon races worldwide. Browse races by distance, location, terrain, and more.

**Website:** [ultramarathondatabase.com](https://ultramarathondatabase.com)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Deployment:** Railway

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sallysteinberg/ultramarathondatabase.git
   cd ultramarathondatabase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   ```

4. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Seed the database (optional):
   ```bash
   npx prisma db seed
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── races/
│   │   ├── [slug]/         # Individual race pages
│   │   ├── state/[state]/  # State listings
│   │   ├── country/[country]/ # Country listings
│   │   ├── distance/[distance]/ # Distance listings
│   │   └── month/[month]/  # Month listings
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── lib/
│   └── db.ts               # Prisma client singleton
└── generated/
    └── prisma/             # Generated Prisma client
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed data
```

## Deployment

The app is configured for Railway deployment. The `Procfile` runs Prisma generate and starts the production server.

```bash
npm run build
npm run start
```

## License

Private — All rights reserved.
