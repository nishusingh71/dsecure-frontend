import React, { useState, memo } from "react";
import { Helmet } from 'react-helmet-async'
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

interface KnowledgeArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  url: string;
  icon: string;
}

const KnowledgeBasePage: React.FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState("all");

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "getting-started", name: "Getting Started" },
    { id: "data-erasure", name: "Data Erasure" },
    { id: "device-guides", name: "Device Guides" },
    { id: "enterprise", name: "Enterprise" },
    { id: "troubleshooting", name: "Troubleshooting" },
    { id: "compliance", name: "Compliance" }
  ];

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "Beginner", name: "Beginner" },
    { id: "Intermediate", name: "Intermediate" },
    { id: "Advanced", name: "Advanced" }
  ];

  const articles: KnowledgeArticle[] = [
    {
      id: 1,
      title: "How many overwrites should I do on a Hard Drive?",
      description: "Learn about optimal overwrite patterns for different types of hard drives and security requirements.",
      category: "data-erasure",
      difficulty: "Beginner",
      readTime: "5 min read",
      url: "/support/overwrite-guide",
      icon: "🔄"
    },
    {
      id: 2,
      title: "How can I Wipe Hard Drives and SSDs?",
      description: "Complete guide to securely wiping both traditional HDDs and modern SSDs with appropriate methods.",
      category: "device-guides",
      difficulty: "Intermediate",
      readTime: "8 min read",
      url: "/support/wipe-guide",
      icon: "💾"
    },
    {
      id: 3,
      title: "How to Wipe SAS Drives Permanently?",
      description: "Enterprise-grade SAS drive erasure procedures for data centers and high-security environments.",
      category: "enterprise",
      difficulty: "Advanced",
      readTime: "12 min read",
      url: "/support/sas-wipe-guide",
      icon: "🏢"
    },
    {
      id: 4,
      title: "How can I wipe 12 board Mac Machines?",
      description: "Step-by-step guide for wiping older Mac systems with 12-board architecture safely and completely.",
      category: "device-guides",
      difficulty: "Intermediate",
      readTime: "10 min read",
      url: "/support/mac-wipe-guide",
      icon: "🍎"
    },
    {
      id: 5,
      title: "How can I Wipe a MacOS with M1 Chip?",
      description: "Modern Mac M1 and Apple Silicon device erasure using latest security features and firmware controls.",
      category: "device-guides",
      difficulty: "Intermediate",
      readTime: "7 min read",
      url: "/support/m1-mac-wipe-guide",
      icon: "⚡"
    },
    {
      id: 6,
      title: "How to use DSecure Cloud Console?",
      description: "Comprehensive guide to managing remote erasure tasks and monitoring through the cloud console.",
      category: "enterprise",
      difficulty: "Intermediate",
      readTime: "15 min read",
      url: "/support/cloud-console-guide",
      icon: "☁️"
    },
    {
      id: 7,
      title: "How do I Perform Cryptographic Erasure on SSD?",
      description: "Advanced cryptographic erasure techniques for self-encrypting drives and secure key destruction.",
      category: "data-erasure",
      difficulty: "Advanced",
      readTime: "10 min read",
      url: "/support/ssd-cryptographic-erasure-guide",
      icon: "🔐"
    },
    {
      id: 8,
      title: "Secure Erasure for HDD and SSD Devices",
      description: "Understanding the differences and best practices for secure erasure across storage device types.",
      category: "data-erasure",
      difficulty: "Beginner",
      readTime: "6 min read",
      url: "/support/secure-erase-hdd-ssd",
      icon: "🛡️"
    },
    {
      id: 9,
      title: "DSecure File Eraser Complete Guide",
      description: "Master the file-level erasure features for selective data destruction and privacy protection.",
      category: "getting-started",
      difficulty: "Beginner",
      readTime: "8 min read",
      url: "/support/file-eraser-guide",
      icon: "📁"
    },
    {
      id: 10,
      title: "Compliance Standards and Certifications",
      description: "Understanding NIST, DoD, and international standards for data erasure compliance requirements.",
      category: "compliance",
      difficulty: "Intermediate",
      readTime: "12 min read",
      url: "/support/compliance-standards",
      icon: "📜"
    },
    {
      id: 11,
      title: "Troubleshooting Common Erasure Issues",
      description: "Solutions for common problems during data erasure operations and how to resolve them.",
      category: "troubleshooting",
      difficulty: "Intermediate",
      readTime: "9 min read",
      url: "/support/troubleshooting-guide",
      icon: "🔧"
    },
    {
      id: 12,
      title: "Enterprise Deployment Best Practices",
      description: "Large-scale deployment strategies, licensing management, and policy configuration for organizations.",
      category: "enterprise",
      difficulty: "Advanced",
      readTime: "18 min read",
      url: "/support/enterprise-deployment",
      icon: "🏗️"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesDifficulty = activeDifficulty === "all" || article.difficulty === activeDifficulty;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/support/knowledge-base" />
        <title>Knowledge Base | DSecure Data Erasure Guides & Documentation</title>
        <meta
          name="description"
          content="Comprehensive knowledge base with step-by-step guides for secure data wiping on different devices, enterprise deployment, and troubleshooting."
        />
        <meta
          name="keywords"
          content="DSecure knowledge base, data erasure guides, secure deletion tutorials, device wiping instructions"
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
                    Knowledge <span className="text-brand">Base</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
                    Step-by-step guides to securely wipe data on different devices and master DSecure features
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search knowledge base..."
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
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                          activeCategory === category.id
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
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                          activeDifficulty === difficulty.id
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

        {/* Articles Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Articles Found</h3>
                <p className="text-slate-600">Try adjusting your search terms or filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <Reveal key={article.id} delayMs={index * 100}>
                    <Link
                      to={article.url}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 block group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-3xl">{article.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                              {article.difficulty}
                            </span>
                            <span className="text-sm text-slate-500">{article.readTime}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {article.description}
                      </p>
                      <div className="flex items-center text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors">
                        Read Guide
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Quick Access
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Jump to the most popular guides and resources
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Getting Started", icon: "🚀", url: "/support/get-started", color: "bg-blue-500" },
                { title: "Device Guides", icon: "📱", url: "/support/device-guides", color: "bg-green-500" },
                { title: "Troubleshooting", icon: "🔧", url: "/support/troubleshooting", color: "bg-yellow-500" },
                { title: "Enterprise", icon: "🏢", url: "/support/enterprise", color: "bg-purple-500" }
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <Link
                    to={item.url}
                    className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
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
                  Need Additional Help?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our technical support team is ready to assist you with any questions
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Contact Support
                  </Link>
                  <Link
                    to="/support/faqs"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Browse FAQs
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default KnowledgeBasePage;