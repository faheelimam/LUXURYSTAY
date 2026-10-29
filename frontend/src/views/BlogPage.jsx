import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Share2,
  Heart,
  Bookmark,
  X,
  Crown,
  Quote,
  CheckCircle2,
  Mail,
  Filter
} from 'lucide-react';
import { CATEGORIES, BLOG_POSTS } from '../data/blogData';

export const BlogPage = ({ onOpenAuth, onSelectRoomForBooking, onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const handleShare = (post, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream-bg)', minHeight: '100vh', color: '#12151C' }}>
      {/* ── HERO BANNER ── */}
      <section style={{
        position: 'relative',
        backgroundColor: '#0A0C10',
        padding: '5.5rem 1.5rem 4.5rem',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(197, 168, 128, 0.18) 0%, transparent 65%), linear-gradient(180deg, #0A0C10 0%, #12151C 100%)',
        borderBottom: '1px solid rgba(197, 168, 128, 0.25)',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Rings */}
        <div style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(197, 168, 128, 0.08)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb / Back */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '1.25rem',
            fontSize: '0.75rem',
            color: 'var(--color-gold)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 600
          }}>
            <button
              onClick={onBackToHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(250, 248, 245, 0.7)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(250, 248, 245, 0.7)')}
            >
              Palace Home
            </button>
            <ChevronRight size={13} color="var(--color-gold)" />
            <span>The Grand Chronicles</span>
          </div>

          {/* Prestige Badge */}
          <div className="animate-float gold-shimmer-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            border: '1px solid rgba(197, 168, 128, 0.45)',
            padding: '0.45rem 1.4rem',
            borderRadius: '50px',
            color: 'var(--color-gold)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}>
            <Crown size={15} color="var(--color-gold)" />
            <span>The Palace Journal • Curated Chronicles</span>
          </div>

          <h1 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem'
          }}>
            Stories of Grandeur & <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Timeless Coastal Splendor
            </span>
          </h1>

          <p style={{
            color: 'rgba(250, 248, 245, 0.82)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.75,
            fontFamily: 'var(--font-body)',
            fontWeight: 300
          }}>
            Immerse yourself in insider perspectives from our master chefs, guild butlers, and fleet commanders. A window into the refined soul of LuxuryStay Palace & Resort.
          </p>

          {/* Search Bar */}
          <div style={{
            maxWidth: '560px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <Search size={18} color="var(--color-gold)" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search chronicles by title, author, or keyword (e.g. Michelin, Butler, Yacht)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'rgba(22, 26, 35, 0.95)',
                border: '1px solid rgba(197, 168, 128, 0.35)',
                borderRadius: '50px',
                padding: '0.9rem 1.4rem 0.9rem 3.2rem',
                color: '#FAF8F5',
                fontSize: '0.88rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(197, 168, 128, 0.3)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.35)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.35)';
              }}
            />
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER TABS ── */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(197, 168, 128, 0.2)',
        padding: '1.1rem 1.5rem',
        position: 'sticky',
        top: '60px',
        zIndex: 90,
        boxShadow: '0 4px 20px rgba(10, 12, 16, 0.04)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '2px',
          scrollbarWidth: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7A808C', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginRight: '0.5rem', flexShrink: 0 }}>
            <Filter size={14} color="var(--color-gold)" /> Filter:
          </div>

          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #0D0F14 0%, #1A1E29 100%)' : 'rgba(197, 168, 128, 0.08)',
                  color: isActive ? 'var(--color-gold)' : '#333742',
                  border: isActive ? '1px solid var(--color-gold)' : '1px solid rgba(197, 168, 128, 0.25)',
                  borderRadius: '50px',
                  padding: '0.5rem 1.15rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.8px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.18)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '3.5rem 1.5rem 6rem' }}>
        {/* Spotlight Editorial (Only if 'All' and no search) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Sparkles size={16} color="var(--color-gold)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Spotlight Chronicle
              </span>
            </div>

            <div
              className="card-luxury animate-fade-up"
              onClick={() => setActiveArticle(featuredPost)}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                backgroundColor: '#0D0F14',
                color: '#FAF8F5',
                border: '1px solid rgba(197, 168, 128, 0.35)',
                boxShadow: '0 25px 65px rgba(10, 12, 16, 0.35)'
              }}
            >
              <div style={{ position: 'relative', minHeight: '340px', overflow: 'hidden' }}>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  background: 'rgba(10, 12, 16, 0.85)',
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-gold)',
                  padding: '0.35rem 0.95rem',
                  borderRadius: '50px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(8px)'
                }}>
                  {featuredPost.category}
                </div>
              </div>

              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#8E94A0', fontSize: '0.76rem', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} color="var(--color-gold)" /> {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={13} color="var(--color-gold)" /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
                  lineHeight: 1.25,
                  marginBottom: '1.1rem'
                }}>
                  {featuredPost.title}
                </h2>

                <p style={{
                  color: 'rgba(250, 248, 245, 0.78)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem',
                  fontFamily: 'var(--font-body)'
                }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(197, 168, 128, 0.2)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-gold)' }}
                    />
                    <div>
                      <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.84rem' }}>{featuredPost.author.name}</div>
                      <div style={{ color: 'var(--color-gold)', fontSize: '0.7rem', textTransform: 'uppercase' }}>{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <button
                    className="btn-gold"
                    style={{ fontSize: '0.75rem', padding: '0.65rem 1.25rem' }}
                  >
                    Read Full Story <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ALL BLOG ARTICLES GRID ── */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', color: '#12151C', margin: 0 }}>
              {selectedCategory === 'All' ? 'All Published Chronicles' : `${selectedCategory} Chronicles`}
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#7A808C' }}>
              Showing {filteredPosts.length} bespoke stories curated by our palace historians
            </span>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-gold-dark)',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #EAE5DC'
          }}>
            <BookOpen size={40} color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#12151C' }}>No Chronicles Found</h3>
            <p style={{ color: '#7A808C', fontSize: '0.9rem' }}>Try searching with a different term or clearing your category filters.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="btn-gold"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '2.25rem'
          }}>
            {filteredPosts.map((post, idx) => {
              const isLiked = !!likedPosts[post.id];
              const isBookmarked = !!bookmarkedPosts[post.id];

              return (
                <article
                  key={post.id}
                  className="card-luxury animate-fade-up"
                  onClick={() => setActiveArticle(post)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    animationDelay: `${idx * 0.08}s`
                  }}
                >
                  {/* Image Container with Badges */}
                  <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      background: 'rgba(10, 12, 16, 0.85)',
                      border: '1px solid rgba(197, 168, 128, 0.5)',
                      color: 'var(--color-gold)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(8px)'
                    }}>
                      {post.category}
                    </div>

                    {/* Action pill (Like / Bookmark) */}
                    <div style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      display: 'flex',
                      gap: '0.4rem'
                    }}>
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        style={{
                          background: 'rgba(10, 12, 16, 0.75)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: isLiked ? '#ef4444' : '#FAF8F5',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(6px)',
                          transition: 'transform 0.2s'
                        }}
                        title="Like this story"
                      >
                        <Heart size={14} fill={isLiked ? '#ef4444' : 'none'} />
                      </button>
                      <button
                        onClick={(e) => handleBookmark(post.id, e)}
                        style={{
                          background: 'rgba(10, 12, 16, 0.75)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: isBookmarked ? 'var(--color-gold)' : '#FAF8F5',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(6px)',
                          transition: 'transform 0.2s'
                        }}
                        title="Save to reading list"
                      >
                        <Bookmark size={14} fill={isBookmarked ? 'var(--color-gold)' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', color: '#7A808C', fontSize: '0.74rem', marginBottom: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} color="var(--color-gold-dark)" /> {post.date}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={13} color="var(--color-gold-dark)" /> {post.readTime}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.18rem',
                      lineHeight: 1.35,
                      color: '#12151C',
                      marginBottom: '0.65rem'
                    }}>
                      {post.title}
                    </h3>

                    <p style={{
                      color: '#555A64',
                      fontSize: '0.86rem',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                      flexGrow: 1
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Author & Read More Bar */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid #EFEAE0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#333742' }}>
                          {post.author.name}
                        </span>
                      </div>

                      <span style={{
                        color: 'var(--color-gold-dark)',
                        fontWeight: 700,
                        fontSize: '0.76rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Read <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ── VIP NEWSLETTER DISPATCH SECTION ── */}
        <section style={{
          marginTop: '6rem',
          backgroundColor: '#0A0C10',
          borderRadius: '24px',
          border: '1px solid rgba(197, 168, 128, 0.35)',
          padding: '3.5rem 2.5rem',
          color: '#FAF8F5',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 25px 65px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <Crown size={28} color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
            <span style={{ color: 'var(--color-gold)', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>
              The Imperial Gazette
            </span>
            <h2 style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1rem' }}>
              Receive Sovereign Chronicles & Private Invitations
            </h2>
            <p style={{ color: 'rgba(250, 248, 245, 0.8)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Subscribe to our monthly editorial dispatch. Delivered directly from the desk of the General Manager, featuring private tasting previews, secret villa offers, and seasonal itineraries.
            </p>

            {newsletterSubscribed ? (
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#6EE7B7',
                padding: '1rem',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={18} />
                <span>You are now inscribed in The Imperial Gazette. Welcome to the circle.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{
                display: 'flex',
                gap: '0.75rem',
                maxWidth: '480px',
                margin: '0 auto',
                flexWrap: 'wrap'
              }}>
                <div style={{ position: 'relative', flexGrow: 1, minWidth: '240px' }}>
                  <Mail size={16} color="var(--color-gold)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    required
                    placeholder="vip.patron@luxurystay.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(22, 26, 35, 0.95)',
                      border: '1px solid rgba(197, 168, 128, 0.35)',
                      borderRadius: '8px',
                      padding: '0.8rem 1rem 0.8rem 2.8rem',
                      color: '#FAF8F5',
                      fontSize: '0.86rem',
                      outline: 'none',
                      fontFamily: 'var(--font-body)'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: '0.8rem 1.6rem', fontSize: '0.8rem', flexShrink: 0 }}
                >
                  Join Gazette
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* ── FULL ARTICLE READER MODAL (HIGH LUXURY) ── */}
      {activeArticle && (
        <div
          className="modal-overlay"
          onClick={() => setActiveArticle(null)}
          style={{ padding: '1rem', zIndex: 2000 }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '860px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid rgba(197, 168, 128, 0.45)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Modal Hero Banner */}
            <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(10, 12, 16, 0.3) 0%, rgba(10, 12, 16, 0.85) 100%)'
              }} />

              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  backgroundColor: 'rgba(10, 12, 16, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FAF8F5',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#000')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(10, 12, 16, 0.75)')}
              >
                <X size={18} />
              </button>

              {/* Header Details over image */}
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', color: '#FAF8F5' }}>
                <span style={{
                  background: 'var(--color-gold)',
                  color: '#0A0C10',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '50px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '0.85rem'
                }}>
                  {activeArticle.category}
                </span>

                <h1 style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)',
                  lineHeight: 1.25,
                  marginBottom: '0.5rem'
                }}>
                  {activeArticle.title}
                </h1>
                <p style={{ color: 'rgba(250, 248, 245, 0.85)', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                  {activeArticle.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2.5rem' }}>
              {/* Author Meta Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid #EFEAE0',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }}
                  />
                  <div>
                    <div style={{ color: '#12151C', fontWeight: 700, fontSize: '0.9rem' }}>{activeArticle.author.name}</div>
                    <div style={{ color: 'var(--color-gold-dark)', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600 }}>{activeArticle.author.role}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: '#7A808C', fontSize: '0.78rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} color="var(--color-gold)" /> {activeArticle.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} color="var(--color-gold)" /> {activeArticle.readTime}
                  </span>
                  <button
                    onClick={(e) => handleShare(activeArticle, e)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(197, 168, 128, 0.4)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '50px',
                      color: 'var(--color-gold-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <Share2 size={13} /> Share
                  </button>
                </div>
              </div>

              {/* Pull Quote Box */}
              <div style={{
                backgroundColor: 'rgba(197, 168, 128, 0.08)',
                borderLeft: '4px solid var(--color-gold)',
                padding: '1.4rem 1.75rem',
                borderRadius: '0 12px 12px 0',
                marginBottom: '2rem',
                display: 'flex',
                gap: '1rem'
              }}>
                <Quote size={28} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{
                  color: '#2A2E39',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {activeArticle.quote}
                </p>
              </div>

              {/* Story Paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', color: '#3A3E4A', fontSize: '0.96rem', lineHeight: 1.85, fontFamily: 'var(--font-body)' }}>
                {activeArticle.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div style={{
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #EFEAE0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#7A808C', textTransform: 'uppercase', letterSpacing: '1px' }}>Tags:</span>
                {activeArticle.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      backgroundColor: '#F3EFEA',
                      color: '#4B5160',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '50px',
                      fontSize: '0.74rem',
                      fontWeight: 500
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Experience Booking CTA */}
              <div style={{
                marginTop: '2.5rem',
                backgroundColor: '#0D0F14',
                color: '#FAF8F5',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(197, 168, 128, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.25rem'
              }}>
                <div>
                  <h4 style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', margin: '0 0 0.35rem', fontSize: '1.2rem' }}>
                    Experience The Luxury In Person
                  </h4>
                  <p style={{ color: 'rgba(250, 248, 245, 0.75)', fontSize: '0.84rem', margin: 0 }}>
                    Reserve your sanctuary suite or presidential villa at LuxuryStay Palace today.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onBackToHome();
                  }}
                  className="btn-gold"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.8rem' }}
                >
                  Explore Suites & Villas <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
