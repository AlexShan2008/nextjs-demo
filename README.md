# Next.js Demo with MUI v5

## [Demo](https://nextjs-demo-bice.vercel.app/)

> This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), featuring [MUI v5](https://mui.com/) (Material-UI) for modern and responsive UI components.

## Features

- Next.js 13+ with TypeScript
- MUI v5 integration with styled-components approach
- Internationalization (i18n) support
- Responsive Material Design
- Modern styling with Emotion
- Server-Side Rendering (SSR) support

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Styling Approach

This project uses MUI v5's modern styling solution with the following features:

- `styled` API from `@mui/material/styles` for component customization
- Emotion as the default styling engine
- Theme customization through MUI's theming system
- Responsive design utilities

Example of styled component:

```tsx
import { styled } from '@mui/material/styles';

const StyledComponent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [MUI v5 Documentation](https://mui.com/getting-started/overview/) - Comprehensive guide for MUI v5
- [Emotion Documentation](https://emotion.sh/docs/introduction) - Learn about Emotion styled components
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing) - Learn about i18n features

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
