const express = require('express');
const router = express.Router();
const Anime = require('../models/Anime');

// Seed data
const seedAnimes = [
  {
    title: 'Demon Slayer: Kimetsu no Yaiba',
    synopsis: 'A family is attacked by demons and only two members survive—Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.',
    episodes: 26,
    rating: 8.7,
    genre: ['Action', 'Fantasy', 'Adventure'],
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    bannerUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4',
    releaseYear: 2019,
    status: 'Completed',
    reviews: [
      { username: 'ZenitsuFan', comment: 'The animation is breathtaking! Ufotable did an incredible job.', rating: 10 },
      { username: 'AnimeCritic', comment: 'Good action, but story is a bit standard shonen.', rating: 8 }
    ]
  },
  {
    title: 'Attack on Titan',
    synopsis: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    episodes: 87,
    rating: 9.1,
    genre: ['Action', 'Drama', 'Fantasy', 'Mystery'],
    imageUrl: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    bannerUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/LHtdkW5a8mQ',
    releaseYear: 2013,
    status: 'Completed',
    reviews: [
      { username: 'LeviAckerman', comment: 'Masterpiece. The plot twists are insane.', rating: 10 }
    ]
  },
  {
    title: 'Spirited Away',
    synopsis: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    episodes: 1,
    rating: 8.6,
    genre: ['Fantasy', 'Adventure', 'Family'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    bannerUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/ByXuk9QqQkk',
    releaseYear: 2001,
    status: 'Completed',
    reviews: [
      { username: 'GhibliLover', comment: 'One of the best animated films ever made. Magical!', rating: 10 }
    ]
  },
  {
    title: 'Jujutsu Kaisen',
    synopsis: 'A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    episodes: 47,
    rating: 8.6,
    genre: ['Action', 'Fantasy', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1627587012015-ab786b36cfc9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    bannerUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/pmN9r84bB6Y',
    releaseYear: 2020,
    status: 'Ongoing',
    reviews: [
      { username: 'GojoSensei', comment: 'Domain Expansion: Infinite Void. 10/10.', rating: 10 }
    ]
  }
];

// Helper to seed database if empty
const checkAndSeed = async () => {
  try {
    const count = await Anime.countDocuments();
    if (count === 0) {
      await Anime.insertMany(seedAnimes);
      console.log('Database seeded with initial anime list!');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

// GET all anime (supports search & genre filters)
router.get('/', async (req, res) => {
  try {
    await checkAndSeed(); // Ensure there is data
    
    const { search, genre } = req.query;
    let query = {};
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    if (genre && genre !== 'All') {
      query.genre = { $in: [genre] };
    }
    
    const animes = await Anime.find(query).sort({ rating: -1 });
    res.json(animes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single anime
router.get('/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    res.json(anime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new anime
router.post('/', async (req, res) => {
  const { title, synopsis, episodes, rating, genre, imageUrl, bannerUrl, trailerUrl, releaseYear, status } = req.body;
  
  if (!title || !synopsis || !genre || genre.length === 0) {
    return res.status(400).json({ message: 'Title, synopsis, and at least one genre are required' });
  }

  const anime = new Anime({
    title,
    synopsis,
    episodes: episodes || 0,
    rating: rating || 0,
    genre: Array.isArray(genre) ? genre : genre.split(',').map(g => g.trim()),
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600',
    bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200',
    trailerUrl,
    releaseYear: releaseYear || new Date().getFullYear(),
    status: status || 'Ongoing'
  });

  try {
    const newAnime = await anime.save();
    res.status(201).json(newAnime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST add a review
router.post('/:id/reviews', async (req, res) => {
  const { username, comment, rating } = req.body;
  
  if (!username || !comment || !rating) {
    return res.status(400).json({ message: 'Username, comment, and rating are required' });
  }

  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    const review = {
      username,
      comment,
      rating: Number(rating)
    };

    anime.reviews.push(review);

    // Update overall average rating
    const totalReviews = anime.reviews.length;
    const sumRatings = anime.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    anime.rating = Number((sumRatings / totalReviews).toFixed(1));

    await anime.save();
    res.status(201).json(anime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an anime
router.delete('/:id', async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    res.json({ message: 'Anime deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
