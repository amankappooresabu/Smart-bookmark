# Smart Bookmark Manager

A modern, real-time bookmark management application built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts only
- 📌 **Add Bookmarks** - Save URLs with custom titles
- 🔒 **Private Bookmarks** - Each user's bookmarks are completely private
- ⚡ **Real-time Sync** - Changes appear instantly across all open tabs
- 🗑️ **Delete Bookmarks** - Remove bookmarks you no longer need
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Backend**: Supabase (Authentication, Database, Real-time)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Google Cloud account (for OAuth)

### Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd bookmark-app
```

2. **Install dependencies**
```bash
   npm install
```

3. **Run the development server**
```bash
   npm run dev
```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Authentication
- Users sign in with their Google account
- Supabase handles OAuth flow and session management
- User sessions are stored in secure HTTP-only cookies

### Data Security
- Row Level Security (RLS) policies ensure users can only access their own bookmarks
- All database queries are filtered by `user_id`
- RLS policies are enforced at the database level

### Real-time Updates
- Supabase Realtime listens for database changes
- When a bookmark is added/deleted, all open tabs receive the update
- Changes appear instantly without page refresh

## License

MIT