import React, { useState } from 'react';
import { ShieldCheck, LogIn, UserPlus, LogOut, CheckCircle2, AlertTriangle, RefreshCw, Award, Smile } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

function App() {
  const [user, setUser] = useState(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Status states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Survey state
  const [surveyResponse, setSurveyResponse] = useState(null); // null, 'YES', 'NO'

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (isRegisterMode && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (isRegisterMode) {
        setSuccess('Registration successful! Please login.');
        setIsRegisterMode(false);
        setPassword('');
        setConfirmPassword('');
      } else {
        setUser(data);
        setSuccess('Login successful!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSurveyResponse(null);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header bar */}
      <header className="glass-panel" style={{
        borderRadius: '0 0 16px 16px',
        borderTop: 'none',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        marginBottom: '30px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'var(--primary)',
              padding: '8px',
              borderRadius: '10px',
              boxShadow: 'var(--shadow-neon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} color="#fff" />
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
              Otaku Survey
            </span>
          </div>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Soldier: <strong style={{ color: '#fff' }}>{user.username}</strong>
              </span>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                  color: '#f87171',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 60px' }}>
        
        {!user ? (
          /* Authentication Screen (Login / Register Card) */
          <div className="glass-panel fade-in" style={{
            width: '100%',
            maxWidth: '420px',
            padding: '32px',
            boxShadow: 'var(--shadow-neon)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '8px',
              fontFamily: 'var(--font-title)'
            }}>
              {isRegisterMode ? 'Enlist / Register' : 'Join the Survey'}
            </h2>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              {isRegisterMode ? 'Create a profile to cast your vote.' : 'Access your survey account.'}
            </p>

            {/* Error alerts */}
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Success alerts */}
            {success && (
              <div style={{
                background: 'rgba(34, 211, 238, 0.1)',
                border: '1px solid rgba(34, 211, 238, 0.2)',
                color: '#22d3ee',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label">Username</label>
                <input
                  type="text"
                  placeholder="e.g. ErenJaeger"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {isRegisterMode && (
                <div>
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  boxShadow: 'var(--shadow-neon)',
                  transition: 'var(--transition)'
                }}
              >
                {isRegisterMode ? <UserPlus size={18} /> : <LogIn size={18} />}
                <span>{isLoading ? 'Processing...' : isRegisterMode ? 'Enlist' : 'Login'}</span>
              </button>
            </form>

            {/* Form switcher link */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>
                {isRegisterMode ? 'Already enlisted? ' : 'New recruit? '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setError('');
                  setSuccess('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {isRegisterMode ? 'Login here' : 'Register here'}
              </button>
            </div>
          </div>
        ) : (
          /* The Ultimate AoT Check Screen */
          <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* The Question Card */}
            {surveyResponse === null ? (
              <div 
                className="glass-panel fade-in"
                style={{
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-neon)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Visual Banner */}
                <div style={{
                  height: '240px',
                  width: '100%',
                  backgroundImage: `linear-gradient(to top, var(--bg-darker) 0%, rgba(7, 7, 11, 0.4) 70%, rgba(0,0,0,0.5) 100%), url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}></div>

                <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{
                    background: 'linear-gradient(135deg, var(--accent-pink), var(--primary))',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '6px 12px',
                    borderRadius: '20px'
                  }}>
                    Decisive Vote
                  </span>
                  
                  <h1 style={{
                    fontSize: '2rem',
                    color: '#fff',
                    fontFamily: 'var(--font-title)',
                    lineHeight: '1.3'
                  }}>
                    Is <span style={{ color: 'var(--accent-cyan)' }}>Attack on Titan</span> the GOAT anime?
                  </h1>

                  <p style={{ color: 'var(--text-muted)', maxWidth: '500px', fontSize: '1rem', lineHeight: '1.6' }}>
                    Cast your final verdict, soldier. Choose wisely—your rank in the scout regiment depends on it.
                  </p>

                  {/* Decision Buttons */}
                  <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '400px', marginTop: '10px' }}>
                    <button
                      onClick={() => setSurveyResponse('YES')}
                      className="survey-btn-yes"
                      style={{
                        flex: 1,
                        padding: '16px',
                        background: 'rgba(34, 211, 238, 0.08)',
                        border: '2px solid rgba(34, 211, 238, 0.4)',
                        borderRadius: '12px',
                        color: '#22d3ee',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      YES
                    </button>

                    <button
                      onClick={() => setSurveyResponse('NO')}
                      className="survey-btn-no"
                      style={{
                        flex: 1,
                        padding: '16px',
                        background: 'rgba(244, 114, 182, 0.08)',
                        border: '2px solid rgba(244, 114, 182, 0.4)',
                        borderRadius: '12px',
                        color: '#f472b6',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            ) : surveyResponse === 'YES' ? (
              /* YES Response Screen */
              <div 
                className="glass-panel fade-in"
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  boxShadow: '0 0 40px rgba(34, 211, 238, 0.3)',
                  border: '2px solid rgba(34, 211, 238, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px'
                }}
              >
                <div style={{
                  background: 'rgba(34, 211, 238, 0.1)',
                  padding: '20px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse-glow 2s infinite'
                }}>
                  <Smile size={60} color="#22d3ee" />
                </div>
                
                <h1 className="glow-text-cyan" style={{
                  fontSize: '2.5rem',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 800
                }}>
                  GOOD!
                </h1>

                <p style={{
                  fontSize: '1.25rem',
                  color: 'var(--text-main)',
                  lineHeight: '1.6',
                  maxWidth: '550px'
                }}>
                  You have excellent taste. Attack on Titan is indeed a masterpiece of storytelling. 
                  <br />
                  <strong style={{ color: 'var(--accent-purple)', fontSize: '1.4rem', display: 'block', marginTop: '16px' }}>
                    Shinzou wo Sasageyo! ⚔️
                  </strong>
                </p>

                <button
                  onClick={() => setSurveyResponse(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    marginTop: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <RefreshCw size={16} />
                  <span>Vote again</span>
                </button>
              </div>
            ) : (
              /* NO Response Screen */
              <div 
                className="glass-panel fade-in shake-animation"
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  boxShadow: '0 0 40px rgba(244, 114, 182, 0.3)',
                  border: '2px solid rgba(244, 114, 182, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px'
                }}
              >
                <div style={{
                  background: 'rgba(244, 114, 182, 0.1)',
                  padding: '20px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <AlertTriangle size={60} color="#f472b6" />
                </div>
                
                <h1 className="glow-text-pink" style={{
                  fontSize: '2.4rem',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  Do not watch cartoon! 😠
                </h1>

                <p style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  maxWidth: '550px'
                }}>
                  It seems you have strayed from the path of enlightenment. Cartoon opinions are not permitted in this regiment.
                </p>

                <button
                  onClick={() => setSurveyResponse(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, var(--accent-pink), var(--primary))',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-neon-pink)',
                    transition: 'var(--transition)',
                    marginTop: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(244, 114, 182, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-neon-pink)';
                  }}
                >
                  <RefreshCw size={16} />
                  <span>Repent & Vote again</span>
                </button>
              </div>
            )}

          </div>
        )}

      </main>
      
      {/* Inline styles for button overlays & animations */}
      <style>{`
        .survey-btn-yes:hover {
          background: var(--accent-cyan) !important;
          color: #000 !important;
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.6) !important;
          transform: scale(1.05) translateY(-2px);
        }
        .survey-btn-no:hover {
          background: var(--accent-pink) !important;
          color: #000 !important;
          box-shadow: 0 0 30px rgba(244, 114, 182, 0.6) !important;
          transform: scale(1.05) translateY(-2px);
        }
        
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}

export default App;
