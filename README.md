This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# Do poprawy

- loading statey (np. na liscie produktow - ladniej uzywac uzywac spinnera, zeby cos pokazywac podczas ladownia, a nie zastepowac calej strony )
- extract common components (primary button, secondary button, pagination)
- price min/max range handling (filters UI, validation of the range, api call)
- adjust text displaying in table on small devices (handle long texts)
- fix dialog styling for small devices
- fix loading data for product delete (make the dialog display non blocking)
- fix interface of Dialog - Dialog should be more relaxed api and particular confirmation dialog components (different styling for info/warning/error) should be provided
- displaying images of products
- uploading image when adding new product
- introduce validation lib for validation (react-validation)
- more robust validation criteria should be introduced (however as it is now - meets the reqs of API)
- destructure NewProductForm - extract form component (common logic), provide separate EditProductForm

# Unmet requirements

- table sorting by title/price

# BUGS

- [major] filtering - shoudl be debounced on change instead of Search/Reset
- [major] when adding product - no images support; however it's not clear if this is a requirement thus "major"
- [minor] new/edit product - confirmation boxes instead of toast/snack bars --> to decide which is better; there is no requirement that new/edit should be in e.g. a modal; in current impl it is a separate page thus confirmation boxes make more sense
-
