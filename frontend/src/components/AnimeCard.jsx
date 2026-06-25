import React from 'react';
import { Star, PlayCircle, Calendar } from 'lucide-react';

const AnimeCard = ({ anime, onClick }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600';

  return (
    <div 
      className="glass-panel glass-panel-hover fade-in"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%'
      }}
    >
      {/* Thumbnail / Image with overlay */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '135%', // 3:4 aspect ratio
        overflow: 'hidden',
        background: '#0a0a0f'
      }}>
        <img 
          src={anime.imageUrl || defaultImage} 
          alt={anime.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}>
          {anime.status && (
            <span style={{
              background: anime.status === 'Ongoing' ? 'rgba(34, 211, 238, 0.9)' : 'rgba(129, 140, 248, 0.9)',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '4px 8px',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {anime.status}
            </span>
          )}
        </div>

        {/* Rating overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(7, 7, 11, 0.85)',
          backdropFilter: 'blur(4px)',
          border: '1px solid var(--border-glass)',
          padding: '4px 8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 10
        }}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
            {anime.rating > 0 ? anime.rating.toFixed(1) : 'N/A'}
          </span>
        </div>

        {/* Play Icon hover overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '16px',
          zIndex: 5
        }}>
          {/* Quick info at the bottom of thumbnail */}
          <div style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '4px'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Calendar size={12} />
                {anime.releaseYear}
              </span>
              <span>•</span>
              <span>{anime.episodes ? `${anime.episodes} eps` : 'Movie'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info content */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '10px'
      }}>
        <h3 style={{
          fontSize: '1.1rem',
          color: '#fff',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '2.8em',
          fontWeight: 600
        }}>
          {anime.title}
        </h3>

        {/* Genres */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginTop: 'auto'
        }}>
          {anime.genre && anime.genre.slice(0, 3).map((g, idx) => (
            <span key={idx} style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              color: 'var(--text-muted)',
              fontSize: '0.7rem',
              fontWeight: 500,
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
