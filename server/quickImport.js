const fs = require('fs').promises
const mongoose = require('mongoose')
const path = require('path')

const Article = require('./models/Article')

// connect environment variable config.env file
require('dotenv').config({
  path: path.join(__dirname, '.', '/.env')
})

const databaseConnectionString = process.env.DATABASE_URI

mongoose
  .connect(databaseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch((error) => console.log(error))

const importArticles = async () => {
  const articles = JSON.parse(
    // await fs.readFile(path.join(__dirname, 'data', 'Data-final.json'), 'utf8')
    await fs.readFile(path.join(__dirname, 'mockArticles.json'), 'utf8')
  )

  const errorArticles = []

  const ArticlesPromises = articles.map((article) =>
    Article.create(article).catch((error) =>
      errorArticles.push({ articles: articles.name, error })
    )
  )

  await Promise.all([...ArticlesPromises]) // , UserPromises]);

  await fs.writeFile(
    'errorArticlesReport.json',
    JSON.stringify({
      errorCount: errorArticles.length,
      result: errorArticles
    })
  )

  console.log('🌟🌟🌟 Finished!!! 🌟🌟🌟')
  process.exit()
}

importArticles()
