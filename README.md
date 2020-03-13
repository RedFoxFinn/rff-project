##### Backend

This branch contains applications backend.

###### tests:
[![CI Status](https://github.com/RedFoxFinn/rff-project/workflows/CI:backend/badge.svg)](https://github.com/RedFoxFinn/rff-project/actions)

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

###### breakdown:

legend | 
------ | 
<img src="https://api.iconify.design/mdi-pencil-circle-outline.svg?color=blue"/> - modified | 
<img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/> - done |
<img src="https://api.iconify.design/mdi-progress-wrench.svg?color=orange"/> - ongoing | 
<img src="https://api.iconify.design/mdi-hammer.svg?color=red"/> - upcoming | 
<img src="https://api.iconify.design/mdi-alert-outline.svg?color=orangered"/> - potentially unstable |

 feature | status 
 :------ | -----: 
 Basic project structure | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 Express.js static site server | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 Apollo Server GraphQL-server | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 Configuration-utility | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 Routing (app/api) | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 GraphQL-playground at `/api` endpoint in `development`-mode | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 MongoDB/Mongoose models | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 GraphQL schemas | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/><img src="https://api.iconify.design/mdi-pencil-circle-outline.svg?color=blue"/>
 GraphQL resolvers | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/><img src="https://api.iconify.design/mdi-pencil-circle-outline.svg?color=blue"/>
 JWT used for login | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 BCrypt used for encrypting sensitive user data stored `MongoDB Atlas cloud` | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 `.env` for environmental variables in `development`-mode | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 `.gitignore` | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 `eslint` | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 `Jest` for `testing`-mode | <img src="https://api.iconify.design/mdi-check-circle-outline.svg?color=green"/>
 Webpage | ![CI:stage](https://github.com/RedFoxFinn/rff-project/workflows/CI:stage/badge.svg?branch=staging)
 
###### frameworks & libraries:
- Node.js
- Express.js
- Mongoose.js
- Apollo Server (`-express` & `-testing`)
- EasyGraphQL (`-tester`)
- Bcrypt
- JWT
- Jest
