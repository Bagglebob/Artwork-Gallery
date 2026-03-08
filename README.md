# Next.js Artwork Gallery

This project is a Next.js-based web application focused on showcasing artwork, with features like user authentication, favorites, history, and detailed artwork views.

## Getting Started

To run the development server locally, follow these steps:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## Project Structure Overview

- **`pages/`**: Contains the main pages of the app, such as:
  - `index.js` for the homepage
  - `login.js` and `register.js` for authentication
  - `artwork/` directory with `[objectID].js` for individual artwork details and `index.js` for artwork search/list
  - `favourites.js` and `history.js` for user-specific data
- **`components/`**: Reusable React components like:
  - `ArtworkCard.js` and `ArtworkCardDetail.js` for displaying artwork summaries and details
  - `Layout.js` for page layout
  - `MainNav.js` for navigation
  - `RouteGuard.js` for protected routes
- **`lib/`**: Utility functions such as:
  - `authenticate.js` for auth logic
  - `userData.js` for user data handling
- **`store.js`**: State management setup (likely using a library like Redux or Zustand)
- **`public/`**: Static assets including images and data files like `validObjectIDList.json`
- **`styles/`**: CSS files for styling, including Bootstrap and custom styles
- **`pages/api/`**: API routes, e.g., `hello.js`

## How Messages Flow

- When a user interacts with the app, components like `MainNav` or `ArtworkCard` trigger actions.
- For artwork details, `pages/artwork/[objectID].js` loads specific artwork info.
- Authentication is handled via `lib/authenticate.js`, with route protection possibly managed by `components/RouteGuard.js`.
- State is managed centrally in `store.js`, enabling consistent data across components.

## Deployment

This app is ready for deployment on Vercel or any static hosting that supports Next.js. For production, run:

```bash
npm run build
npm start
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Vercel Deployment Guide](https://nextjs.org/docs/deployment)

## Notes

- The app uses `next/font` for font optimization.
- Static data like valid object IDs are stored in `public/data/validObjectIDList.json`.
- For styling, it uses Bootstrap (`styles/bootstrap.min.css`) and custom CSS files.
