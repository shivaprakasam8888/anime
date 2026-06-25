import React, { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';

const ReviewSection = ({ animeId, reviews, onReviewAdded }) => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) {
      setError('Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/anime/${animeId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          comment,
          rating
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      const updatedAnime = await response.json();
      
      // Reset form
      setUsername('');
      setComment('');
      setRating(10);
      
      // Callback to parent to update anime data
      if (onReviewAdded) {
        onReviewAdded(updatedAnime);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Leave a review form */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{
          fontSize: '1.2rem',
          color: '#fff',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <MessageSquare size={18} color="var(--primary)" />
          Leave a Review
        </h3>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#f87171',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            width: '100%'
          }}>
            {/* Username */}
            <div>
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="e.g. NarutoLover"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Rating Selector */}
            <div>
              <label className="form-label">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="form-input"
                style={{ appearance: 'none', cursor: 'pointer' }}
              >
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r} style={{ background: '#0f0f16', color: '#fff' }}>
                    {r} / 10 Star{r > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="form-label">Review Comment</label>
            <textarea
              rows={4}
              placeholder="Write your thoughts about this anime..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-input"
              style={{ resize: 'none' }}
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              alignSelf: 'flex-end',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'var(--primary)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'var(--transition)'
            }}
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Posting...' : 'Submit Review'}</span>
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h3 style={{
          fontSize: '1.3rem',
          color: '#fff',
          marginBottom: '20px',
          fontFamily: 'var(--font-title)'
        }}>
          User Reviews ({reviews ? reviews.length : 0})
        </h3>

        {(!reviews || reviews.length === 0) ? (
          <div className="glass-panel" style={{
            padding: '30px',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            No reviews yet. Be the first to share your opinion!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviews.map((rev) => (
              <div 
                key={rev._id}
                className="glass-panel" 
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {/* Review Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>{rev.username}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>
                      {formatDate(rev.createdAt || rev.createdAt)}
                    </span>
                  </div>
                  
                  {/* Stars display */}
                  <div style={{
                    background: 'rgba(251, 191, 36, 0.08)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <span style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}>
                      {rev.rating}/10
                    </span>
                  </div>
                </div>

                {/* Review Comment */}
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-line'
                }}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
