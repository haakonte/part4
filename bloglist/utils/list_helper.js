
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0]
  for (let i = 1 ; i < blogs.length; ++i) {
    if (favorite.likes < blogs[i].likes) {
      favorite = blogs[i]
    }
  }
  return blogs.length === 0 ? 0 : 
  {
    title: favorite.title, 
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  let authors = []
  blogs.forEach((blog) => {
    const obj = {
      author: blog.author,
      blogs: 1
    }
    const sameAuthor = authors.filter(auth => auth.author === obj.author)
    if (sameAuthor.length > 0) {
      const index = authors.findIndex(i => i.author === obj.author)
      authors[index].blogs += sameAuthor.length
    } else {
      authors.push(obj)
    }
  })
  let biggestBlog = authors[0]
  for (let i = 1 ; i < authors.length ; ++i) {
    if (biggestBlog.blogs < authors[i].blogs) {
      biggestBlog = authors[i]
    }
  }
  return blogs.length === 0 ? 0 : biggestBlog

}

const mostLikes = (blogs) => {
  let authors = []
  blogs.forEach((blog) => {
    const obj = {
      author: blog.author,
      likes: blog.likes
    }
    const sameAuthor = authors.filter(blog => blog.author === obj.author)
    if (sameAuthor.length > 0) {
      const index = authors.findIndex(i => i.author === obj.author)
      authors[index].likes += obj.likes
    } else {
      authors.push(obj)
    }
  })

  let biggestLikes = authors[0]
  for (let i = 1 ; i < authors.length ; ++i) {
    if (biggestLikes.likes < authors[i].likes) {
      biggestLikes = authors[i]
    }
  }
  return blogs.length === 0 ? 0 : biggestLikes
   
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

