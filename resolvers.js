module.exports = {
  Query: {
    getPosts: async (_, args, {Post}) => {
      const posts = await Post.find({}).sort({createdDate: 'desc'}).populate({
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
    addPost: async (_, {title, imageUrl, categories, description, creatorId}, {Post}) => {
      const newPost = await new Post({
        title, imageUrl, categories, description, createdBy: creatorId
      }).save()
      return newPost
    },
    signupUser: async (_, {username, email, password}, {User}) => {
      const user = await User.findOne({username})
      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save()
      return newUser
    }
  }
}
