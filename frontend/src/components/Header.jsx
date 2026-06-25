import React from 'react';
import { Tv, PlusCircle } from 'lucide-react';

const Header = ({ onHomeClick, onAddAnimeClick, currentTab }) => {
  return (
    <header className="glass-panel" style={{
      borderRadius: '0 0 16px 16px',
      borderTop: 'none',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      marginBottom: '30px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div 
          onClick={onHomeClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            background: 'var(--primary)',
            padding: '8px',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-neon)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Tv size={20} color="#fff" />
          </div>
          <span 
            className="glow-text-primary"
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1.4rem',
              fontWeight: 800,
              background: 'linear-gradient(to right, #ffffff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            OtakuVault
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onAddAnimeClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-neon)',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(129, 140, 248, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-neon)';
          }}
        >
          <PlusCircle size={18} />
          <span>Add Anime</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
