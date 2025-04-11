# 🛠️ Fix-Board — Issue Tracker System

Fix-Board is a issue tracking system built with **Next.js**, **MongoDB**, and **Prisma**. It allows users to view, manage, and track issues effectively. Logged-in users can create, assign, edit, or delete issues, while unauthenticated users can still view issue details.

## ✨ Features

- 📊 Dashboard – Get a quick overview of issue statuses.
- 📋 Issue List Page – View all reported issues.
- 🔍 Issue Details Page – View full details of a selected issue.
- ✏️ Edit, 🗑️ Delete & 👥 Assign – Logged-in users can manage issues directly.
- 👀 Read-Only View – Visitors can still view issue info even if not logged in.

## 🧱 Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [Prisma ORM](https://www.prisma.io/) with **MongoDB**
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [TanStack Table](https://tanstack.com/table) for advanced table handling
- [Axios](https://axios-http.com/) for HTTP requests
- [classnames](https://github.com/JedWatson/classnames) utility
- [React SimpleMDE](https://github.com/RIP21/react-simplemde-editor) for markdown editor
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton) for loading states
- [Zod](https://zod.dev/) for schema validation
- [Recharts](https://recharts.org/en-US/) for charting

## 🚀 Getting Started

Follow these steps to get the project running locally:

1. **Clone** this repository:

   ```bash
   git clone https://github.com/your-username/fix-board.git
   cd fix-board
   ```

2. Setup up **environment variables**:

- Rename `.env.example` to `.env`
- Fill in all required environment variables inside `.env`

3. **Install** dependencies:

   ```bash
   npm install
   ```

4. Generate the **Prisma Client**:

   ```bash
   npx prisma generate
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

6. Visit http://localhost:3000 in your browser to view the app.

## 🔐 Authentication

Fix-Board uses **NextAuth.js** for authentication. You must set up providers (like GitHub, Google, etc.) in your `.env` file for sign-in functionality.

## 📂 Project Structure

```bash
   fix-board/
│
├── app/                             # Main application directory (App Router)
│   ├── api/                         # API route handlers
│   │   ├── issues/                  # API routes for issue operations (GET, POST, PUT, DELETE)
│   │   ├── users/                   # API routes for user operations
│   │   └── auth/                    # NextAuth configuration routes
│   │
│   ├── auth/                        # Authentication logic (authOptions, provider, etc.)
│   │
│   ├── issues/                      # Pages related to issues
│   │   ├── _components/             # Issue-related UI components
│   │   ├── [id]/                    # Dynamic route to view a specific issue
│   │   ├── edit/                    # Edit issue page
│   │   ├── list/                    # List of all issues
│   │   └── new/                     # Create new issue page
│   │
│   └── components/                  # Shared and reusable components
│
├── lib/                             # Utility functions, constants etc.
│
├── prisma/                          # Prisma schema and configuration
│   ├── schema.prisma                # Prisma schema file (MongoDB as provider)
│
├── public/                          # Static assets (images, icons, etc.)
│
├── .env                             # Environment variables file (excluded from version control)
├── .env.example                     # Example of environment variables (used for setup)
├── .eslintrc.js                     # ESLint configuration for code linting
├── .gitignore                       # Specifies intentionally untracked files to ignore
├── next.config.js                   # Next.js configuration file
├── postcss.config.js                # PostCSS config for TailwindCSS processing
├── tailwind.config.js               # TailwindCSS custom configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation

```
