import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Clock, Calendar, CheckCircle2, Trash2, Film, Loader2 } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';

const AnimeDetails = ({ animeId, onBack, onAnimeDeleted }) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAnimeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/anime/${animeId}`);
      if (!response.ok) {
        throw new Error('Anime not found in vault');
      }
      const data = await response.json();
      setAnime(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeDetails();
  }, [animeId]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to remove "${anime.title}" from the vault?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/anime/${animeId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete anime');
      }
      
      if (onAnimeDeleted) {
        onAnimeDeleted();
      }
    } catch (err) {
      alert(err.message);
      setIsDeleting(false);
    }
  };

  const handleReviewAdded = (updatedAnime) => {
    setAnime(updatedAnime);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 0',
        gap: '16px'
      }}>
        <Loader2 size={40} className="glow-text-primary" style={{ animation: 'spin 1s linear infinite' }} />
        <span style={{ color: 'var(--text-muted)' }}>Fetching scroll data...</span>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <button 
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          <ArrowLeft size={16} /> Back to Vault
        </button>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#f87171' }}>
          <h3>Error Loading Details</h3>
          <p>{error || 'Anime not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ paddingBottom: '80px' }}>
      {/* Hero Banner Area */}
      <div style={{
        position: 'relative',
        height: '350px',
        width: '100%',
        background: '#0a0a0f',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(to top, var(--bg-darker) 0%, rgba(7, 7, 11, 0.4) 70%, rgba(0,0,0,0.5) 100%), url(${anime.bannerUrl || anime.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>

        {/* Back button overlay */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          width: 'calc(100% - 48px)'
        }}>
          <button 
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: 'rgba(7, 7, 11, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-glass)',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'var(--transition)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>

      {/* Main Info Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '-120px auto 0', // Pulls content up over the banner
        padding: '0 24px',
        position: 'relative',
        zIndex: 5,
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '40px',
      }}>
        {/* Left Side: Poster and Quick Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Poster image */}
          <div className="glass-panel" style={{
            padding: '8px',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-neon)'
          }}>
            <img 
              src={anime.imageUrl} 
              alt={anime.title} 
              style={{
                width: '100%',
                borderRadius: '10px',
                aspectRatio: '3/4',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Quick Specs Box */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ color: '#fff', fontSize: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '8px' }}>
              Specifications
            </h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <Calendar size={16} color="var(--primary)" />
              <span style={{ color: 'var(--text-muted)' }}>Released:</span>
              <strong style={{ marginLeft: 'auto', color: '#fff' }}>{anime.releaseYear}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <Clock size={16} color="var(--primary)" />
              <span style={{ color: 'var(--text-muted)' }}>Episodes:</span>
              <strong style={{ marginLeft: 'auto', color: '#fff' }}>{anime.episodes || 'N/A'}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <CheckCircle2 size={16} color="var(--primary)" />
              <span style={{ color: 'var(--text-muted)' }}>Status:</span>
              <strong style={{ marginLeft: 'auto', color: '#fff' }}>{anime.status}</strong>
            </div>
            
            {/* Action panel for delete */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                color: '#f87171',
                fontWeight: 600,
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }
              }}
            >
              <Trash2 size={16} />
              <span>{isDeleting ? 'Removing...' : 'Delete Anime'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Title, Details, Synopsis, Trailer, Reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '60px' }}>
          {/* Header text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1 style={{ fontSize: '2.8rem', color: '#fff', fontFamily: 'var(--font-title)', lineHeight: '1.1' }}>
              {anime.title}
            </h1>
            
            {/* Meta details */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={18} color="#fbbf24" fill="#fbbf24" />
                <strong style={{ fontSize: '1.2rem', color: '#fff' }}>
                  {anime.rating > 0 ? anime.rating.toFixed(1) : 'N/A'}
                </strong>
                <span style={{ color: 'var(--text-dark)', fontSize: '0.9rem' }}>/10</span>
              </div>
              <span style={{ color: 'var(--border-glass)' }}>|</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {anime.genre && anime.genre.map((g, idx) => (
                  <span key={idx} className="genre-pill" style={{ cursor: 'default' }}>
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '12px' }}>Synopsis</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
              {anime.synopsis}
            </p>
          </div>

          {/* Video Trailer Iframe */}
          {anime.trailerUrl && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: '1.2rem',
                color: '#fff',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Film size={18} color="var(--primary)" />
                Official Trailer
              </h3>
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%', /* 16:9 aspect ratio */
                height: 0,
                overflow: 'hidden',
                borderRadius: '10px'
              }}>
                <iframe
                  title={`${anime.title} trailer`}
                  src={anime.trailerUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                ></iframe>
              </div>
            </div>
          )}

          {/* Review Section */}
          <ReviewSection 
            animeId={anime._id} 
            reviews={anime.reviews} 
            onReviewAdded={handleReviewAdded}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
