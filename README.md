# CIPSA App

## About

- This is a quick app I created for a friend who wanted a form that was accessible on the internet.
- They wanted the form data to be written to a Google Sheet, in a specific format, if the user submitting the form entered a specific name and password.
- Access to the Google Sheet is provided via a service account.

## Technologies

I decided to build this with NextJS v15 and React v19 to learn more about:

- NextJS's app router
- React Server Functions and Form Actions
- React Compiler and how it integrates with React Devtools

## Getting Started

- Clone the repo.
- Install the modules: `yarn install`
- Run the server: `yarn dev`
- Go to [http://localhost:3000](http://localhost:3000)

### Environment Vars

You'll need to create a `.env` file to store environment variables:

```bash
GOOGLE_SHEET_ID=
GOOGLE_JWT_PROJECT_ID=
GOOGLE_JWT_PRIVATE_KEY_ID=
GOOGLE_JWT_PRIVATE_KEY=
GOOGLE_JWT_CLIENT_EMAIL=
GOOGLE_JWT_CLIENT_ID=
DOMAIN=http://localhost:3000
```

### Improvements

- Create a proper loading component for React Suspense
- Add Error Boundary
- Do not clear form selections if user authentication fails on submit
