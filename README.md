## Disclaimer

This application has been created only for training purposes. Thus it should never be deployed to production environments without prior audit.

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

After downloading the repository, install all required dependencies:

```bash
npm isntall
# or
yarn install
```

Next, provide the following env files:

- `.env.local` for successfull local run; you can copy-paste-adjust the provided `.env.local.example` file
- `.env.test` for successfull tests run; you can copy-paste-adjust the provided `.env.test.example` file

### Run the server locally

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### How to login to the application?

As the application utilises [Platzi Fake Store API](https://fakeapi.platzi.com/en/about/introduction/),
use the following credentials:

- email: `john@mail.com`
- password: `changeme`

as as described in [the API's documentation](https://fakeapi.platzi.com/en/rest/auth-jwt/#login).

### Run tests

Just run the appropriate `test` task like this:

```bash
npm run test
# or
yarn test
```

## Project description

The purpose of this project is to showcase a React-based UI application that utilizes the [Platzi Fake Store API](https://fakeapi.platzi.com/en/about/introduction/)
to:

- provide authentication capabilities
- allow to manipulate (fake) store products (CRUD actions)

## Technical overview

From the technical perspective the aim is to use following technologies:

- React 18
- Nextjs for routing and code-splitting (using TypeScript)
- [Tailwind](https://tailwindcss.com/) styling library for styling the UI and providing responsive layouts
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) for data fetching and caching backed-up by [axios](https://axios-http.com/) library

to serve following requirements:

- provide sensible app routing
- cache data-fetching queries
- provide code-splitting for optimal code loading
- effectively style UI and provide responsive layouts
- implement common and optimal UX patterns (data presentation, form validation, actions feedback etc.)

## Project management

### Unmet requirements

- table sorting by title/price

### Improvement suggestions

- [Products list][Filter section] improve price min/max range handling
  - provide more intuitive UI in the filters section
  - provide validation of the range
  - review default values for min/max range in the api call
- [Products list] adjust long title text displaying in table on small devices (current solution is not bulletproof)
- [Products list][Delete product] fix dialog styling for small devices
- [Dialog component] fix interface of Dialog component
  - Dialog component interface should have a more relaxed api (e.g. provide slots which would allow for more elastic data presentation)
  - provide dedicated confirmation dialog components based on purpose (different styling for info/warning/error)
- [Add/Edit product] allow for uploading product image
- [Add/Edit product] use dedicated library for robust form handling and validation (e.g. [react-hook-form](https://react-hook-form.com/))
- [Add/Edit product] more robust form validation criteria should be introduced (however, current solution meets the API's requirements)
- [Add/Edit product] destructure `NewProductForm` component
  - extract common logic to a separate component
  - provide separate form components for add/edit product
- [UX] general UX improvements:
  - breadcrumbs and/or additional navigation (for better experience when going from Add/Edit product back to products)
  - logout button (the utility/route is already prepared)
- [General] improve code splitting, e.g. in main route `/` the `ProductsList` component can be lazy loaded

### Bugs

- [major] filtering - should take place on input value change (with debounce) instead of Search/Reset
- [major] no images support when adding/editing product (however it's not clear if this is a tangible project requirement)
- [minor] add/edit product - confirmation boxes instead of toast/snack bars --> to decide which is better (there is no requirement that add/edit product view should be in the form of e.g. a modal; in current implementation it is a separate page thus confirmation boxes seem more natural)
