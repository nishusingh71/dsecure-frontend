import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import React, { useState, memo } from "react";
import { Helmet } from 'react-helmet-async'
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  videoUrl: string;
  views: number;
  publishDate: string;
}

const ProductVideosPage: React.FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Videos" },
    { id: "getting-started", name: "Getting Started" },
    { id: "tutorials", name: "Tutorials" },
    { id: "advanced", name: "Advanced Features" },
    { id: "troubleshooting", name: "Troubleshooting" },
    { id: "enterprise", name: "Enterprise" }
  ];

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "Beginner", name: "Beginner" },
    { id: "Intermediate", name: "Intermediate" },
    { id: "Advanced", name: "Advanced" }
  ];

  const videos: Video[] = [
    {
      id: 1,
      title: "D-Secure Quick Start Guide",
      description: "Get started with D-Secure in under 10 minutes. Learn the basics of installation, setup, and your first data erasure.",
      duration: "9:42",
      category: "getting-started",
      difficulty: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video1",
      views: 15420,
      publishDate: "2024-10-15"
    },
    {
      id: 2,
      title: "Complete Windows PC Erasure Walkthrough",
      description: "Step-by-step guide to securely wiping Windows computers, including different drive types and erasure methods.",
      duration: "15:33",
      category: "tutorials",
      difficulty: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video2",
      views: 12850,
      publishDate: "2024-10-12"
    },
    {
      id: 3,
      title: "Mac M1 and Apple Silicon Erasure",
      description: "Learn how to securely wipe modern Mac computers with M1, M2, and M3 chips using D-Secure's advanced features.",
      duration: "12:15",
      category: "tutorials",
      difficulty: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video3",
      views: 8940,
      publishDate: "2024-10-10"
    },
    {
      id: 4,
      title: "Enterprise Cloud Console Overview",
      description: "Comprehensive guide to managing remote erasure operations through D-Secure's cloud-based management console.",
      duration: "22:47",
      category: "enterprise",
      difficulty: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video4",
      views: 6720,
      publishDate: "2024-10-08"
    },
    {
      id: 5,
      title: "Cryptographic Erasure for SSDs",
      description: "Understanding and implementing cryptographic erasure techniques for solid-state drives and self-encrypting devices.",
      duration: "18:24",
      category: "advanced",
      difficulty: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video5",
      views: 5830,
      publishDate: "2024-10-05"
    },
    {
      id: 6,
      title: "Mobile Device Erasure - iOS & Android",
      description: "Complete guide to securely wiping smartphones and tablets running iOS and Android operating systems.",
      duration: "14:56",
      category: "tutorials",
      difficulty: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video6",
      views: 9150,
      publishDate: "2024-10-03"
    },
    {
      id: 7,
      title: "Troubleshooting Common Erasure Issues",
      description: "Identify and resolve the most common problems encountered during data erasure operations.",
      duration: "16:38",
      category: "troubleshooting",
      difficulty: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video7",
      views: 7420,
      publishDate: "2024-10-01"
    },
    {
      id: 8,
      title: "Batch Operations and Automation",
      description: "Learn how to automate large-scale erasure operations using D-Secure's batch processing and scripting capabilities.",
      duration: "25:12",
      category: "advanced",
      difficulty: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video8",
      views: 4680,
      publishDate: "2024-09-28"
    },
    {
      id: 9,
      title: "Compliance and Regulatory Reports",
      description: "Generate tamper-proof regulatory documents and compliance reports for audit purposes and regulatory requirements.",
      duration: "11:29",
      category: "enterprise",
      difficulty: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video9",
      views: 6340,
      publishDate: "2024-09-25"
    },
    {
      id: 10,
      title: "Understanding Erasure Standards (NIST, DoD)",
      description: "Deep dive into international data erasure standards and when to use each method for maximum security.",
      duration: "19:45",
      category: "advanced",
      difficulty: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/video10",
      views: 3920,
      publishDate: "2024-09-22"
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = activeCategory === "all" || video.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "all" || video.difficulty === activeDifficulty;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-product-videos")} />

      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/support/product-videos" />
        <title>Product Videos | D-Secure Tutorials & Walkthroughs</title>
        <meta
          name="description"
          content="Watch comprehensive video tutorials and walkthroughs for D-Secure data erasure solutions. Learn through visual guides and step-by-step demonstrations."
        />
        <meta
          name="keywords"
          content="D-Secure videos, tutorials, walkthroughs, video guides, data erasure tutorials, product demonstrations"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <Link to="/support" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                    Product <span className="text-brand">Videos</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
                    Watch comprehensive tutorials and walkthroughs to master D-Secure data erasure solutions
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search videos..."
                      className="w-full px-6 py-4 pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-lg"
                    />
                    <svg
                      className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container-responsive">
            <Reveal>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {videos.length}
                  </div>
                  <div className="text-slate-600">Total Videos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {Math.round(videos.reduce((total, video) => {
                      const [minutes, seconds] = video.duration.split(':').map(Number);
                      return total + minutes + (seconds / 60);
                    }, 0) / 60)}h
                  </div>
                  <div className="text-slate-600">Total Content</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {formatViews(videos.reduce((total, video) => total + video.views, 0))}
                  </div>
                  <div className="text-slate-600">Total Views</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    4K
                  </div>
                  <div className="text-slate-600">Video Quality</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container-responsive">
            <Reveal>
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">CATEGORIES</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${activeCategory === category.id
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">DIFFICULTY LEVEL</h3>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <button
                        key={difficulty.id}
                        onClick={() => setActiveDifficulty(difficulty.id)}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${activeDifficulty === difficulty.id
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                      >
                        {difficulty.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Videos Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Videos Found</h3>
                <p className="text-slate-600">Try adjusting your search terms or filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video, index) => (
                  <Reveal key={video.id} delayMs={index * 100}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                      {/* Video Thumbnail */}
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelectedVideo(video.id)}
                            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 text-white hover:bg-opacity-30 transition-colors"
                          >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                            {video.difficulty}
                          </span>
                          <span className="text-sm text-slate-500">{formatViews(video.views)} views</span>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                          {video.title}
                        </h3>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{formatDate(video.publishDate)}</span>
                          <button
                            onClick={() => setSelectedVideo(video.id)}
                            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                          >
                            Watch Video →
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Playlists Section */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Curated Playlists
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Follow structured learning paths for different use cases
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Complete Beginner Course",
                  description: "Everything you need to know to get started with D-Secure",
                  videoCount: 5,
                  duration: "45 min",
                  thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop"
                },
                {
                  title: "Enterprise Deployment",
                  description: "Advanced features for large-scale organizational use",
                  videoCount: 8,
                  duration: "2h 15min",
                  thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop"
                },
                {
                  title: "Mobile Device Management",
                  description: "Comprehensive mobile erasure and MDM integration",
                  videoCount: 4,
                  duration: "1h 10min",
                  thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop"
                }
              ].map((playlist, index) => (
                <Reveal key={playlist.title} delayMs={index * 100}>
                  <div className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src={playlist.thumbnail}
                        alt={playlist.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="text-sm font-medium">{playlist.videoCount} videos</div>
                        <div className="text-xs opacity-80">{playlist.duration}</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {playlist.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {playlist.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Request a Custom Video
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Need a specific tutorial that's not in our library? Let us know what you'd like to see.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Request Video
                  </Link>
                  <a
                    href="mailto:videos@dsecuretech.com"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Email Video Team
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  {videos.find(v => v.id === selectedVideo)?.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-video bg-slate-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-lg">Video Player Coming Soon</p>
                  <p className="text-sm opacity-80 mt-2">Integration with video hosting platform in development</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

export default ProductVideosPage;