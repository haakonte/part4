const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper_api')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const noteObjects = helper.initialBlogs
  .map(blog => new Blog(blog))
  const promiseArr = noteObjects.map(blogObj => blogObj.save())
  await Promise.all(promiseArr)

})

test('blog posts are returned as json', async () => {
  await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs posts are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

