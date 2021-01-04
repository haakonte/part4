const listHelper = require('../utils/list_helper')


describe('dummy test', () => {
  test('dummy function returns 1', () => {
    const blogs = []
  
    const res = listHelper.dummy(blogs)
    expect(res).toBe(1)
  }) 
})

describe('total likes', () => {
  const listwithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }, 
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test SKiya',
      author: 'Yeet',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    }
  ]

  test('on empty list return 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('on more than one, return the sum', () => {
    const result = listHelper.totalLikes(listwithTwoBlogs)
    expect(result).toBe(19)
  })

  test('on one blog, return that number of likes', () => {
    listwithTwoBlogs.pop()
    const res = listHelper.totalLikes(listwithTwoBlogs)
    expect(res).toBe(5)
  })

})

describe('favorite blog', () => {
  const listwithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }, 
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test SKiya',
      author: 'Yeet',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    }
  ]

  test('should return 0 on empty bloglist', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(0)
  })


  test('when multiple elements, return with highest likes', () => {
    const shouldBe = {
      title: 'Test SKiya',
      author: 'Yeet',
      likes: 14
    }
    const favoriteBlog = listHelper.favoriteBlog(listwithTwoBlogs)
    expect(favoriteBlog).toEqual(shouldBe)

  })

  test('should return that element, when length is 1', () => {
    listwithTwoBlogs.pop()
    const shouldBe = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    const favoriteBlog = listHelper.favoriteBlog(listwithTwoBlogs)
    expect(favoriteBlog).toEqual(shouldBe)
  })
})

describe('most blogs', () => {
  const listwithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Jimmy',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }, 
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test SKiya',
      author: 'Yeet',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test SKiya',
      author: 'Jimmy',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 40,
      __v: 0
    }

  ]

  test('when list is empty, should return 0', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(0)
  })

  test('multiple elements, return author with most blogs, and amount', () => {
    const result = listHelper.mostBlogs(listwithThreeBlogs)
    const shouldBe = {
      author: 'Jimmy',
      blogs: 2
    }
    expect(result).toEqual(shouldBe)
  })

  test('many elements of same author, should return with most blogs and amount', () => {
    const dummy1 = {
      _id: '5a422aa71b54a676234d17f9',
      title: 'SKibidibabadoo',
      author: 'Jimmy',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 14,
      __v: 0
    }
    const dummy2 = {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test SKiya',
      author: 'Jimmy',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 20,
      __v: 0
    }
    const copy = [...listwithThreeBlogs]
    copy.push(dummy1)
    copy.push(dummy2)

    const shouldBe = {
      author: 'Jimmy',
      blogs: 4
    }

    const result = listHelper.mostBlogs(copy)
    expect(result).toEqual(shouldBe)

  })

  test('one element, return that author', () => {
    const copy = [...listwithThreeBlogs]
    copy.pop()
    copy.pop()
    const shouldBe = {
      author: 'Jimmy',
      blogs: 1
    }
    const result = listHelper.mostBlogs(copy)
    expect(result).toEqual(shouldBe)
  })

})

describe('most likes', () => {
  const listwithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Jimmy',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }, 
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test SKiya',
      author: 'Yeet',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 50,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test SKiya',
      author: 'Jimmy',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 40,
      __v: 0
    }
  ]

  test('when length is 0, should return 0', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(0)
  })

  test('multiple elements, should return highest amount of likes', () => {
    const result = listHelper.mostLikes(listwithThreeBlogs)
    const shouldBe = {
      author: 'Yeet',
      likes: 50
    }
    expect(result).toEqual(shouldBe)
  })

  test('multiple elements, when the sum of elements is larger than one, should return correct one', () => {
    const modifiedCopy = [...listwithThreeBlogs, listwithThreeBlogs[1].likes = 40]
    const result = listHelper.mostLikes(modifiedCopy)
    const shouldBe = {
      author: 'Jimmy',
      likes: 45
    }
    expect(result).toEqual(shouldBe)
  })

  test('one element, should return that element', () => {
    const modified = [...listwithThreeBlogs]
    modified.pop()
    modified.pop()
    const shouldBe = {
      author: 'Jimmy',
      likes: 5
    }
    const result = listHelper.mostLikes(modified)
    expect(result).toEqual(shouldBe)
  })
})
