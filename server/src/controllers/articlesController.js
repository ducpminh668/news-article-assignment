const Article = require('../models/Article')
const asyncHandler = require('express-async-handler')

const createArticle = asyncHandler(async (req, res) => {
  try {
    const { title, summary, publisher } = req.body

    if (!title || !summary || !publisher) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const article = await Article.create({ title, summary, publisher })

    return res.status(200).json({
      article: article.toArticleResponse()
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

const deleteArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    const article = await Article.findOneAndDelete({ _id: id }).exec()

    if (!article) {
      return res.status(401).json({
        message: 'Article Not Found'
      })
    }

    return res.status(200).json({
      message: 'Article successfully deleted!!!'
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

const getArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params

    const article = await Article.findOne({ _id: id }).exec()

    if (!article) {
      return res.status(401).json({
        message: 'Article Not Found'
      })
    }

    return res.status(200).json({
      article: article.toArticleResponse()
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

const updateArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    const { title, summary, publisher } = req.body

    const article = await Article.findByIdAndUpdate(
      id,
      { $set: { title, summary, publisher } },
      { new: true }
    )

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    return res.status(200).json({
      article: article.toArticleResponse()
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

const listArticles = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 20, keySearch } = req?.query || {}

    const skip = (page - 1) * limit

    // const searchQuery = keySearch
    //   ? { $text: { $search: keySearch, $caseSensitive: false } }
    //   : {}

    let searchQuery = {}

    if (keySearch) {
      // Create a regular expression to match partial substrings
      const searchTerm = keySearch.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      const regex = new RegExp(searchTerm, 'i') // 'i' for case-insensitive

      // Construct the search query using $or for multiple fields
      searchQuery = {
        $or: [
          { title: { $regex: regex } },
          { summary: { $regex: regex } },
          { publisher: { $regex: regex } }
        ]
      }
    }

    const [filteredArticles, articleCount] = await Promise.all([
      Article.find(searchQuery)
        .limit(Number(limit))
        .skip(Number(skip))
        .sort({ createdAt: 'desc' })
        .exec(),
      Article.countDocuments(searchQuery)
    ])

    const articles = filteredArticles.map((article) =>
      article.toArticleResponse()
    )

    return res.status(200).json({
      articles,
      articlesCount: articleCount
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = {
  createArticle,
  deleteArticle,
  getArticle,
  updateArticle,
  listArticles
}
