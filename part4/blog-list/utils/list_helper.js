const dummy = (blogs) =>
{
  return 1
}

const totalLikes = (blogs) =>
{
  const reducer = (total, cur) =>
  {
    return total + cur.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) =>
{
  const reducer = (prev, cur) =>
  {
    return prev.likes < cur.likes ? cur : prev
  }

  return blogs.reduce(reducer)
}

module.exports =
{
  dummy,
  totalLikes,
  favoriteBlog
}