const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    publisher: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

articleSchema.plugin(uniqueValidator)

// Create a text search index on 'title' and 'summary' fields with custom weights
articleSchema.index(
  { title: 'text', summary: 'text', publisher: 'text' },
  { weights: { title: 10, summary: 5, publisher: 2 } }
)

// user is the logged-in user
articleSchema.methods.toArticleResponse = function () {
  return {
    _id: this._id,
    title: this.title,
    summary: this.summary,
    date: this.createdAt,
    publisher: this.publisher
  }
}

module.exports = mongoose.model('Article', articleSchema)
