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

describe('initial notes in db', () => {
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
})


describe('adding a blog post', () => {
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
})

describe('deleting a blog post', () => {
  test('on valid id, should return status code 204 on deletion', async () => {
    const initialDbBlogs = await helper.blogsInDb()
    const blogToDelete = initialDbBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()
    expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAfterDeletion.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('on non-existing blog, same length on db notes', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .expect(204)
    
    const inDbAfter = await helper.blogsInDb()
    expect(inDbAfter).toHaveLength(helper.initialBlogs.length)

  })
})

describe('updating a blog post', () => {

  test('updating a blog post which exists', async () => {
    const initialInDb = await helper.blogsInDb()
    const validIdFirstElement = initialInDb[0].id
    console.log(validIdFirstElement)
    
    const replacementBlog = {
      title: 'Knowledge is intercourse',
      author: 'Hugh Jass',
      url: 'Joe Mama',
      likes: 420
    }
    
    await api
      .put(`/api/blogs/${validIdFirstElement}`)
      .send(replacementBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const updatedDb = await helper.blogsInDb()
    const updatedElement = updatedDb[0]
    expect(updatedElement).toEqual({...replacementBlog, id: validIdFirstElement})
    expect(updatedDb).toHaveLength(helper.initialBlogs.length)
  })

  test('updating a non-existing object', async () => {
    const nonExistingId = await helper.nonExistingId()
    const dbPreUpdate = await helper.blogsInDb()
    await api
      .put(`/api/blogs/${nonExistingId}`)
      .expect(200)
    const db = await helper.blogsInDb()
    for (let i = 0 ; i < dbPreUpdate.length ; ++i) {
      expect(dbPreUpdate[i]).toEqual(db[i])
    }
  })
})








afterAll(() => {
  mongoose.connection.close()
})

