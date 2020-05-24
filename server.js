const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose')

require('dotenv').config({path: 'dev.env'})
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'typeDefs.graphql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

const User = require('./models/User')
const Post = require('./models/Post')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
  .then(() => console.log('DB connected'))
  .catch(e => console.log(e))


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
})

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
});
