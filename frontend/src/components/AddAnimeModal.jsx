import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const AddAnimeModal = ({ isOpen, onClose, onAnimeAdded }) => {
  const [title, setTitle] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [episodes, setEpisodes] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const [status, setStatus] = useState('Ongoing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !synopsis.trim() || !genre.trim()) {
      setError('Title, synopsis, and genres are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Parse genres
    const genreArray = genre.split(',').map((g) => g.trim()).filter((g) => g !== '');

    const animeData = {
      title,
      synopsis,
      episodes: episodes ? Number(episodes) : 0,
      rating: rating ? Number(rating) : 0,
      genre: genreArray,
      imageUrl,
      bannerUrl,
      trailerUrl,
      releaseYear: Number(releaseYear),
      status
    };

    try {
      const response = await fetch(`${API_BASE}/api/anime`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(animeData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to add anime');
      }

      const newAnime = await response.json();
      
      // Clear inputs
      setTitle('');
      setSynopsis('');
      setEpisodes('');
      setRating('');
      setGenre('');
      setImageUrl('');
      setBannerUrl('');
      setTrailerUrl('');
      setReleaseYear(new Date().getFullYear());
      setStatus('Ongoing');

      if (onAnimeAdded) {
        onAnimeAdded(newAnime);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      {/* Modal Box */}
      <div 
        className="glass-panel fade-in" 
        style={{
          width: '100%',
          maxWidth: '650px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
          }}
        >
          <X size={18} />
        </button>

        <h2 style={{
          fontSize: '1.6rem',
          color: '#fff',
          marginBottom: '24px',
          fontFamily: 'var(--font-title)',
          background: 'linear-gradient(to right, #fff, var(--primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Add New Anime
        </h2>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#f87171',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Row 1: Title & Genres */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Anime Title *</label>
              <input
                type="text"
                placeholder="e.g. Demon Slayer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">Genres (comma separated) *</label>
              <input
                type="text"
                placeholder="e.g. Action, Fantasy, Adventure"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label className="form-label">Synopsis / Description *</label>
            <textarea
              rows={3}
              placeholder="Provide a brief summary of the anime story..."
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="form-input"
              style={{ resize: 'none' }}
              required
            ></textarea>
          </div>

          {/* Image & Banner URL */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="form-label">Poster Image URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Banner Image URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Details Row: Year, Episodes, Rating, Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            <div>
              <label className="form-label">Year</label>
              <input
                type="number"
                placeholder={new Date().getFullYear()}
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Episodes</label>
              <input
                type="number"
                placeholder="e.g. 12"
                value={episodes}
                onChange={(e) => setEpisodes(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Rating (0-10)</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 8.5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-input"
                style={{ appearance: 'none', cursor: 'pointer' }}
              >
                <option value="Ongoing" style={{ background: '#07070b' }}>Ongoing</option>
                <option value="Completed" style={{ background: '#07070b' }}>Completed</option>
              </select>
            </div>
          </div>

          {/* Trailer URL */}
          <div>
            <label className="form-label">Trailer Embed URL (YouTube embed link)</label>
            <input
              type="text"
              placeholder="e.g. https://www.youtube.com/embed/VQGCKyvzIM4"
              value={trailerUrl}
              onChange={(e) => setTrailerUrl(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Form Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '10px'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                boxShadow: 'var(--shadow-neon)',
                transition: 'var(--transition)'
              }}
            >
              <Save size={16} />
              <span>{isSubmitting ? 'Saving...' : 'Save Anime'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnimeModal;
