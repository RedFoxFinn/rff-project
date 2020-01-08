// rff-demo Server.js
// project backend main file, responsible of running backend,
// starting GraphQL-server and serving frontend application

// imports
const config = require('./utils/config.js');
let express = require('express'),
  app = express(),
  PORT = config.port;
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apolloServer = require('./graphql/gql_server');

// mongoose options
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

// app usages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connecting to cloud mongo
mongoose.connect(config.mongo).then(res => {
  if (res.error) {
    console.error('Mongoose connection - failure');
  } else {
    console.log('Mongoose connection - success');
  }
});

// defining routes
app.use('/', express.static(path.join(__dirname, '/build/index.html')));
apolloServer.applyMiddleware({ app, path: '/graphql' });
const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

// starting server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, listening....now?`);
});
