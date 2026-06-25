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
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/VQGCKyvzIM4',
    releaseYear: 2019,
    status: 'Completed',
    reviews: [{ username: 'ZenitsuFan', comment: 'The animation is breathtaking! Ufotable did an incredible job.', rating: 10 }]
  },
  {
    title: 'Attack on Titan',
    synopsis: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    episodes: 87,
    rating: 9.1,
    genre: ['Action', 'Drama', 'Fantasy', 'Mystery'],
    imageUrl: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/LHtdkW5a8mQ',
    releaseYear: 2013,
    status: 'Completed',
    reviews: [{ username: 'LeviAckerman', comment: 'Masterpiece. The plot twists are insane.', rating: 10 }]
  },
  {
    title: 'Spirited Away',
    synopsis: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    episodes: 1,
    rating: 8.6,
    genre: ['Fantasy', 'Adventure', 'Family'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/ByXuk9QqQkk',
    releaseYear: 2001,
    status: 'Completed',
    reviews: [{ username: 'GhibliLover', comment: 'One of the best animated films ever made. Magical!', rating: 10 }]
  },
  {
    title: 'Jujutsu Kaisen',
    synopsis: 'A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    episodes: 47,
    rating: 8.6,
    genre: ['Action', 'Fantasy', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1627587012015-ab786b36cfc9?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/pmN9r84bB6Y',
    releaseYear: 2020,
    status: 'Ongoing',
    reviews: [{ username: 'GojoSensei', comment: 'Domain Expansion: Infinite Void. 10/10.', rating: 10 }]
  },
  {
    title: 'One Piece',
    synopsis: 'Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who will never give up.',
    episodes: 1100,
    rating: 8.9,
    genre: ['Action', 'Adventure', 'Fantasy'],
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/P6aY77O179E',
    releaseYear: 1999,
    status: 'Ongoing',
    reviews: [{ username: 'ZoroLost', comment: 'The scale and world-building of this story are second to none.', rating: 10 }]
  },
  {
    title: 'Naruto Shippuden',
    synopsis: 'Naruto Uzumaki wants to be the best ninja in the land. He\'s done well so far, but with the looming danger posed by the mysterious Akatsuki organization, Naruto detects he must train harder than ever.',
    episodes: 500,
    rating: 8.7,
    genre: ['Action', 'Adventure', 'Fantasy'],
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/1y_KdC2R1B4',
    releaseYear: 2007,
    status: 'Completed',
    reviews: [{ username: 'HokageDreamer', comment: 'The fights and emotional beats in Shippuden are legendary.', rating: 9 }]
  },
  {
    title: 'Death Note',
    synopsis: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written in it.',
    episodes: 37,
    rating: 9.0,
    genre: ['Mystery', 'Supernatural', 'Drama'],
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/NlJZ-YgAt-c',
    releaseYear: 2006,
    status: 'Completed',
    reviews: [{ username: 'L_Lawliet', comment: 'A spectacular battle of wits. Kept me on the edge of my seat!', rating: 10 }]
  },
  {
    title: 'Fullmetal Alchemist: Brotherhood',
    synopsis: 'Two brothers search for the Philosopher\'s Stone after an attempt to revive their deceased mother goes horribly wrong, leaving them physically damaged.',
    episodes: 64,
    rating: 9.1,
    genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/dq5xQ-Y7r_o',
    releaseYear: 2009,
    status: 'Completed',
    reviews: [{ username: 'ElricAlchemist', comment: 'The most complete and satisfying anime story ever told.', rating: 10 }]
  },
  {
    title: 'Hunter x Hunter',
    synopsis: 'Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends, Gon embarks on a journey that takes him through wild, dangerous worlds.',
    episodes: 148,
    rating: 9.0,
    genre: ['Action', 'Adventure', 'Fantasy'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/d6kBeJjR07A',
    releaseYear: 2011,
    status: 'Completed',
    reviews: [{ username: 'KilluaZ', comment: 'Chimera Ant arc is pure peak anime writing.', rating: 10 }]
  },
  {
    title: 'One Punch Man',
    synopsis: 'Saitama is a hero who only became a hero for fun. After three years of "special" training, he finds that he can defeat even the strongest opponents with a single punch.',
    episodes: 24,
    rating: 8.7,
    genre: ['Action', 'Comedy', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/2JAEl3LDYKI',
    releaseYear: 2015,
    status: 'Completed',
    reviews: [{ username: 'GenosCyborg', comment: 'Hilarious concept combined with top-tier action animation.', rating: 9 }]
  },
  {
    title: 'My Hero Academia',
    synopsis: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.',
    episodes: 138,
    rating: 7.9,
    genre: ['Action', 'Adventure', 'Fantasy'],
    imageUrl: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/EPVKu1V-W40',
    releaseYear: 2016,
    status: 'Ongoing',
    reviews: [{ username: 'DekuOneForAll', comment: 'Inspirational! Plus Ultra!', rating: 8 }]
  },
  {
    title: 'Steins;Gate',
    synopsis: 'A self-proclaimed mad scientist and his friends discover a way to send messages to the past, triggering a sequence of events that alters the timeline and threatens their lives.',
    episodes: 24,
    rating: 9.1,
    genre: ['Sci-Fi', 'Mystery', 'Drama'],
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/27OZc-ku6is',
    releaseYear: 2011,
    status: 'Completed',
    reviews: [{ username: 'OkabeRintarou', comment: 'El Psy Kongroo. Mind-bending time travel thriller!', rating: 10 }]
  },
  {
    title: 'Sword Art Online',
    synopsis: 'In the year 2022, thousands of players are trapped in a revolutionary new virtual reality MMORPG where dying in the game means dying in the real world.',
    episodes: 97,
    rating: 7.5,
    genre: ['Action', 'Adventure', 'Fantasy'],
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/6ohYYtxfDCg',
    releaseYear: 2012,
    status: 'Completed',
    reviews: [{ username: 'KiritoBeater', comment: 'Great music and visuals, first arc was outstanding.', rating: 8 }]
  },
  {
    title: 'Bleach: Thousand-Year Blood War',
    synopsis: 'The peace is suddenly broken when warning sirens wail through the Soul Society. Residents are disappearing without a trace, and a new shadow forces Ichigo Kurosaki back into action.',
    episodes: 26,
    rating: 9.0,
    genre: ['Action', 'Fantasy', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/e8yV5L511Q0',
    releaseYear: 2022,
    status: 'Ongoing',
    reviews: [{ username: 'IchigoBankai', comment: 'The return of Bleach is spectacular! Stunning visuals.', rating: 10 }]
  },
  {
    title: 'Your Name.',
    synopsis: 'Two strangers find themselves linked in a bizarre way. When a connection is formed, will distance be the only thing to keep them apart?',
    episodes: 1,
    rating: 8.8,
    genre: ['Drama', 'Supernatural', 'Family'],
    imageUrl: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/hRfHcp2G65E',
    releaseYear: 2016,
    status: 'Completed',
    reviews: [{ username: 'MitsuhaT', comment: 'Beautiful animation, emotional music, legendary story.', rating: 10 }]
  },
  {
    title: 'Code Geass: Lelouch of the Rebellion',
    synopsis: 'After receiving a mysterious power called Geass, an exiled prince named Lelouch Lamperouge leads a rebellion against the all-powerful Empire of Britannia.',
    episodes: 50,
    rating: 8.9,
    genre: ['Action', 'Drama', 'Sci-Fi'],
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/cZ7zQbMxm18',
    releaseYear: 2006,
    status: 'Completed',
    reviews: [{ username: 'ZeroRebellion', comment: 'The ending is arguably the greatest in anime history.', rating: 10 }]
  },
  {
    title: 'Spy x Family',
    synopsis: 'A spy on an undercover mission marries a professional assassin and adopts a telepathic child, all while keeping their true identities secret from one another.',
    episodes: 37,
    rating: 8.4,
    genre: ['Action', 'Comedy', 'Family'],
    imageUrl: 'https://images.unsplash.com/photo-1541560052-5e137f229371?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/ofXigq9aIpo',
    releaseYear: 2022,
    status: 'Ongoing',
    reviews: [{ username: 'AnyaWakuWaku', comment: 'Anya is so adorable! Super wholesome show.', rating: 9 }]
  },
  {
    title: 'Chainsaw Man',
    synopsis: 'Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a bottom-of-the-barrel life while repaying his debt by harvesting devil corpses with Pochita.',
    episodes: 12,
    rating: 8.5,
    genre: ['Action', 'Fantasy', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/v4yZO1ch9EU',
    releaseYear: 2022,
    status: 'Completed',
    reviews: [{ username: 'PochitaBestBoy', comment: 'Dark, violent, and beautifully animated by Mappa.', rating: 9 }]
  },
  {
    title: 'Kaguya-sama: Love Is War',
    synopsis: 'Two geniuses at a prestigious student council will not confess their feelings because in the game of love, the first one to confess is the loser!',
    episodes: 37,
    rating: 8.6,
    genre: ['Comedy', 'Drama', 'Family'],
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/2tB7E7G69fE',
    releaseYear: 2019,
    status: 'Completed',
    reviews: [{ username: 'ChikaDance', comment: 'The funniest romantic comedy anime. Perfect execution.', rating: 10 }]
  },
  {
    title: 'Mob Psycho 100',
    synopsis: 'A middle school boy with powerful psychic abilities tries to live a normal life while keeping his emotional levels under control to prevent his powers from running wild.',
    episodes: 37,
    rating: 8.7,
    genre: ['Action', 'Comedy', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/01t8fCRLocM',
    releaseYear: 2016,
    status: 'Completed',
    reviews: [{ username: 'ReigenMaster', comment: 'Incredible growth, great messages, and unmatched animation.', rating: 10 }]
  },
  {
    title: 'Cyberpunk: Edgerunners',
    synopsis: 'A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner.',
    episodes: 10,
    rating: 8.6,
    genre: ['Action', 'Sci-Fi', 'Drama'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/JtqIas3bYhg',
    releaseYear: 2022,
    status: 'Completed',
    reviews: [{ username: 'DavidSandevistan', comment: 'A wild, neon-soaked ride that broke my heart.', rating: 10 }]
  },
  {
    title: 'Tokyo Ghoul',
    synopsis: 'A college student is attacked by a ghoul and barely survives, receiving transplant surgery that transforms him into a half-ghoul who must navigate both human and ghoul worlds.',
    episodes: 24,
    rating: 7.8,
    genre: ['Action', 'Mystery', 'Supernatural'],
    imageUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/vGuQeQ060tM',
    releaseYear: 2014,
    status: 'Completed',
    reviews: [{ username: 'KanekiWhite', comment: 'Season 1 was fantastic. The soundtrack is iconic.', rating: 8 }]
  },
  {
    title: 'Frieren: Beyond Journey\'s End',
    synopsis: 'Elf mage Frieren and her fellow adventurers have defeated the Demon King and brought peace to the land. But Frieren will long outlive the rest of her former party. How will she learn what life means to the humans around her?',
    episodes: 28,
    rating: 9.3,
    genre: ['Fantasy', 'Adventure', 'Drama'],
    imageUrl: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/qgQunxF0qRc',
    releaseYear: 2023,
    status: 'Completed',
    reviews: [{ username: 'HimmelTheHero', comment: 'A beautiful, melancholic masterpiece about time and relationships.', rating: 10 }]
  },
  {
    title: 'Vinland Saga',
    synopsis: 'Young Thorfinn grows up listening to the stories of old sailors that have traveled the ocean and reached the land of legend, Vinland. When his father is killed, Thorfinn joins the crew of his killer, waiting for a duel.',
    episodes: 48,
    rating: 8.8,
    genre: ['Action', 'Adventure', 'Drama'],
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/f8JrG9SS4MA',
    releaseYear: 2019,
    status: 'Completed',
    reviews: [{ username: 'ThorfinnS', comment: 'I have no enemies. One of the greatest redemption stories ever.', rating: 10 }]
  },
  {
    title: 'Cowboy Bebop',
    synopsis: 'The futuristic misadventures of an easygoing bounty hunter and his partners as they travel the galaxy searching for criminals to collect rewards.',
    episodes: 26,
    rating: 8.9,
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    trailerUrl: 'https://www.youtube.com/embed/qig4K68y1a4',
    releaseYear: 1998,
    status: 'Completed',
    reviews: [{ username: 'SpikeSpiegel', comment: 'See you Space Cowboy. Legendary jazz-soaked space adventure.', rating: 10 }]
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
