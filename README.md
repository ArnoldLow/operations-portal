# Operations Portal

## Project Setup

This project uses SQLite with Drizzle ORM. Follow these steps to set up your local database:

1. Install dependencies:

```bash
npm install # Install Dependencies
```

2. Set up the database:

```bash
npm run db:generate   # Generate SQL migrations
npm run db:push      # Apply migrations to create database
npm run db:seed      # Add initial seed data
```

3. (Optional) View database:

```bash
npm run db:studio    # Opens Drizzle Studio to view/manage data
```

4. Start Development Server:

```bash
npm run dev    # Starts Next.js development server on http://localhost:3000 by default
```

### All Available Commands

#### Database Commands

- `npm run db:generate` - Generate new migrations when schema changes
- `npm run db:push` - Apply pending migrations to the database
- `npm run db:seed` - Populate database with initial data
- `npm run db:studio` - Open Drizzle Studio UI to view/manage data

#### Application Commands

- `npm run dev` - Start Next.js development server (http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

#### Database Troubleshooting

- `rm -f src/db/sqlite.db` - If the database is not behaving as expected, drop tables try database commands again
