import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data } = await axios.get('/api/feedback');
        setFeedbacks(data);
      } catch (err) {
        setError('Failed to load guest impressions');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem 0', color: 'var(--color-gold)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: '16px', height: '16px', border: '2px solid var(--color-gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        Retrieving guest impressions...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '1rem', background: '#fdf2f2', border: '1px solid #f8b4b4', color: '#991b1b', borderRadius: '10px', fontSize: '0.9rem' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
          <MessageSquareQuote size={18} />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', margin: 0, color: 'var(--color-obsidian)' }}>
            Verified Guest Impressions & Accolades
          </h3>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#777' }}>Reflections from recent distinguished stays</p>
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--color-ivory)', borderRadius: '12px', border: '1px dashed var(--color-gold-border)' }}>
          <p style={{ margin: 0, color: '#888', fontStyle: 'italic' }}>No guest impressions recorded yet. Be the first to share your experience.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid var(--color-gold-border)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '3px', color: 'var(--color-gold)' }}>
                    {[...Array(fb.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--color-gold)" strokeWidth={0} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.05em', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Verified Stay
                  </span>
                </div>

                <p style={{ margin: '0 0 1rem', fontSize: '0.92rem', lineHeight: 1.6, color: '#333', fontStyle: 'italic' }}>
                  "{fb.comment}"
                </p>
              </div>

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#777' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-obsidian)' }}>
                  {fb.guestName || 'Anonymous Guest'}
                </span>
                <span>
                  {new Date(fb.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
