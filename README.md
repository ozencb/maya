<h2 align="center">🚧 Work in progress 🚧</h2>


Maya (Turkish word for "yeast") is a fullstack web application boilerplate. The main goal of this repo is to present a good project structure that is easy to work on and easy to scale. 

### Disclaimer
This is a work in progress and I am still learning some of the technologies I have used in this repo. So, some of the approaches you see might not be the best or might be up for debate. Feedbacks are greatly appreciated!


### Tech Stack:

- React
- Next.js
- TypeScript
- Node.js
- Express
- JWT
- MikroORM
- PostgreSQL
- Redux + Toolkit
- Tailwind CSS
- Yup
- Helmet
- JOI
- Winston
- Husky
- Eslint
- Prettier
- Lint Staged

## Get Started

You must have Node, PostgreSQL, Redis, and Yarn installed. Use `dotenv.example` as a template to create a `.env` file and fill-in/change all the values.

To install all the dependencies, run `yarn install-dependencies` on root folder.

For server, `cd` into `server` folder and run `yarn run db:migrate` and `yarn run start`. On a separate terminal, `cd` into `client` folder and run `yarn dev`.

## Todo

- [x] Refresh token on app initialization
- [ ] Add roles/authorities on backend for admin etc.
- [ ] Add protected routes with user auth checks
- [ ] Admin page for kicking/banning users
- [ ] Profile page for updates/settings/acc deletion
- [ ] Themes
- [ ] Avatars generated randomly or with seeds
