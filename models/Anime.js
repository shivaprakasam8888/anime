const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const animeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    episodes: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0.0,
      min: 0,
      max: 10,
    },
    genre: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    bannerUrl: {
      type: String,
      default: '',
    },
    trailerUrl: {
      type: String,
      default: '',
    },
    releaseYear: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['Ongoing', 'Completed'],
      default: 'Ongoing',
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Anime', animeSchema);
