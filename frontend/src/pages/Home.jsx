import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import AnimeCard from '../components/AnimeCard';

const genres = ['All', 'Action', 'Adventure', 'Fantasy', 'Drama', 'Mystery', 'Family', 'Supernatural'];

const Home = ({ onAnimeSelect, refreshTrigger }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const fetchAnimes = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (selectedGenre && selectedGenre !== 'All') query.append('genre', selectedGenre);

      const response = await fetch(`/api/anime?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch anime database');
      }
      const data = await response.json();
      setAnimes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly
    const delayDebounceFn = setTimeout(() => {
      fetchAnimes();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedGenre, refreshTrigger]);

  // Use the first high rating anime as the featured hero banner
  const featuredAnime = animes.length > 0 ? animes[0] : null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px' }}>
      
      {/* Featured Banner Hero Section */}
      {featuredAnime && !search && selectedGenre === 'All' && (
        <div 
          className="glass-panel fade-in" 
          style={{
            position: 'relative',
            height: '420px',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'flex-end',
            boxShadow: 'var(--shadow-neon)'
          }}
        >
          {/* Background Image overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(to top, rgba(7, 7, 11, 0.95) 0%, rgba(7, 7, 11, 0.4) 60%, rgba(7, 7, 11, 0.2) 100%), url(${featuredAnime.bannerUrl || featuredAnime.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}></div>

          {/* Banner Details */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: '40px',
            maxWidth: '700px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-pink), var(--primary))',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '6px 12px',
              borderRadius: '20px',
              alignSelf: 'flex-start'
            }}>
              Featured Anime
            </span>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'var(--font-title)',
              lineHeight: '1.2'
            }}>
              {featuredAnime.title}
            </h1>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1rem',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {featuredAnime.synopsis}
            </p>
            <button 
              onClick={() => onAnimeSelect(featuredAnime._id)}
              style={{
                alignSelf: 'flex-start',
                marginTop: '10px',
                padding: '12px 28px',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Explore Details
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar controls */}
      <div 
        className="glass-panel" 
        style={{
          padding: '20px',
          borderRadius: '16px',
          marginBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 10
        }}
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Search container */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px'
          }}>
            <Search 
              size={18} 
              color="var(--text-dark)" 
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
            <input 
              type="text"
              placeholder="Search anime title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
            Found {animes.length} titles
          </div>
        </div>

        {/* Genre pills list */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          whiteSpace: 'nowrap'
        }}>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Anime Grid List */}
      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 0',
          gap: '16px'
        }}>
          <Loader2 size={40} className="glow-text-primary" style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading Otaku Vault...</span>
        </div>
      ) : error ? (
        <div className="glass-panel" style={{
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          background: 'rgba(239, 68, 68, 0.05)',
          color: '#f87171'
        }}>
          <p style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '8px' }}>Error Loading Database</p>
          <p>{error}</p>
          <button 
            onClick={fetchAnimes}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              background: 'var(--primary)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      ) : animes.length === 0 ? (
        <div className="glass-panel" style={{
          padding: '60px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '1.1rem'
        }}>
          No anime matches your criteria. Try adjusting your filters or add a new anime!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: '24px'
        }}>
          {animes.map((anime) => (
            <AnimeCard 
              key={anime._id}
              anime={anime}
              onClick={() => onAnimeSelect(anime._id)}
            />
          ))}
        </div>
      )}
      
      {/* Dynamic inline keyframes for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;
