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

test('every blog post has identifier ID', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(blog => blog.id)
  for (id in ids) {
    expect(id).toBeDefined()
  }
})

test('successfully create a new blog post', async () => {
  const newBlog = {
    title: 'You wanna know how early i got up this morning',
    author: 'Entrepreneur',
    url: 'Joe Mama',
    likes: 69
  }

  await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
  const updatedBlogList = await helper.blogsInDb()
  const authors = updatedBlogList.map(b => b.author)

  expect(updatedBlogList).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toContain('Entrepreneur')
})

test('if likes property is missing, should default to 0', async () => {
  const newBlog = {
    title: 'I got up yesterday at noon, but like for today',
    author: 'Hugh Jass',
    url: 'Joe Mama',
  }
  const response = await api
                        .post('/api/blogs')
                        .send(newBlog)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
  const returnedObj = {
    title: response.body.title,
    author: response.body.author,
    url: response.body.url,
    likes: response.body.likes
  }
  const updatedDB = await helper.blogsInDb()
  expect(updatedDB).toHaveLength(helper.initialBlogs.length + 1)
  expect(returnedObj).toEqual({...newBlog, likes: 0})
})

test('on missing title and url, should return 400 bad request', async () => {
  const newBlog = {
    author: 'Hugh Jass',
    likes: 69
  }
  await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  const db = await helper.blogsInDb()
  expect(db).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

