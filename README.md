# Cybersecurity Portfolio

A professional, terminal-themed portfolio designed for a Cybersecurity Student and Aspiring SOC Analyst. Built with a modern React tech stack to ensure high performance, security, and a beautiful developer experience.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI (shadcn/ui inspired)
- **Forms API**: Web3Forms

## Project Structure

This project follows modern React architectural patterns for modularity and scalability:
- `/src/pages` - Standalone page layouts (e.g., Resume)
- `/src/components/sections` - Heavy, page-level UI sections
- `/src/components/shared` - Reusable cross-section components
- `/src/components/ui` - Shadcn-style generic UI elements (Buttons, Cards)
- `/src/api` - External service logic (e.g., Web3Forms integration)
- `/src/hooks` - Custom React hooks
- `/src/types` - Global TypeScript interfaces
- `/src/constants` - Static data (portfolio content, configuration)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   - Copy `.env.example` to `.env`
   - Fill in your actual Web3Forms Access Key and social usernames:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the local development server (defaults to port 5173).
- `npm run build`: Compiles the application into static files in the `/dist` directory.
- `npm run typecheck`: Runs the TypeScript compiler to ensure there are no typing errors without emitting files.
- `npm run preview`: Serves the production build locally for verification.

## Deployment

This static single-page application can be deployed to any static host (Vercel, Netlify, GitHub Pages) simply by pointing the build output to the `/dist` folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
