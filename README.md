##### Backend

This branch contains applications backend.

###### tests:
[![Actions Status](https://github.com/RedFoxFinn/rff-project/workflows/CI:backend:tests/badge.svg)](https://github.com/RedFoxFinn/rff-project/actions)

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

###### breakdown:
 feature | status 
 :------ | -----: 
 Basic project structure | `done`
 Express.js static site server | `done`
 Apollo Server GraphQL-server | `done`
 Configuration-utility | `done`
 Routing (app/api) | `done`
 GraphQL-playground at `/api` endpoint in `development`-mode | `done`
 MongoDB/Mongoose models | `done`
 GraphQL schemas | `done`
 GraphQL resolvers | `done`
 JWT used for login | `done`
 BCrypt used for encrypting sensitive user data stored `Atlas mongo-cloud` | `done`
 `.env` for environmental variables in `development`-mode | `done`
 `.gitignore` | `done`
 `eslint` | `done`
 `Jest` for `testing`-mode | `done`
 Webpage | ![CI:build](https://github.com/RedFoxFinn/rff-project/workflows/CI:build/badge.svg?branch=staging)
 
###### frameworks & libraries:
- Node.js
- Express.js
- Mongoose.js
- Apollo Server (`-express` & `-testing`)
- EasyGraphQL (`-tester`)
- Bcrypt
- JWT
- Jest
