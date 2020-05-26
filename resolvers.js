const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}

module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({}).sort({ createdDate: 'desc' }).populate({
        path: 'createdBy',
        model: 'User'
      })
      return [
        {
          title: 'cat 1',
          description: 'description',
          imageUrl: 'https://cdn2.thecatapi.com/images/cs1.jpg',
          createdBy: 'createdBy'
        },
        {
          title: 'cat 2',
          description: 'description 2',
          imageUrl: 'https://cdn2.thecatapi.com/images/cs4.jpg',
          createdBy: 'createdBy2'
        }]
      return posts
    }
  },
  Mutation: {
    addPost: async (_, { title, imageUrl, categories, description, creatorId }, { Post }) => {
      return await new Post({
        title, imageUrl, categories, description, createdBy: creatorId
      }).save()
    },
    signInUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error('User not found')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid password')
      }
      return { token: createToken(user, process.env.SECRET, '1hr')}
    },
    signUpUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username })
      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save()
      return { token: createToken(newUser, process.env.SECRET, '1hr')}
    }
  }
}
