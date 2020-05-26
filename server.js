const { ApolloServer, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')

require('dotenv').config({ path: 'dev.env' })
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const filePath = path.join(__dirname, 'typeDefs.graphql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

const User = require('./models/User')
const Post = require('./models/Post')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
  .then(() => console.log('DB connected'))
  .catch(e => console.log(e))

const getUser = async (token) => {
  if (token) {
    try {
      let user = await jwt.verify(token, process.env.SECRET)
      console.log(user)
    } catch (e) {
      throw new AuthenticationError('Your session has ended. Please sign in again.')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers['authorization'] || ''

    return { User, Post, currentUser: await getUser(token) }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
