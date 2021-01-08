const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'I am an entrepreneur',
    author: 'Hugh Jass',
    url: 'http://joe_mama.com/skiya',
    likes: 69
  },
  {
    title: 'Trancend',
    author: 'Moe Lester',
    url: 'http://facebook.com/skiya',
    likes: 420
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Books',
    author: 'Entrepreneur',
    url: 'http://facebook.com/skiya',
    likes: 690
  })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}