import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/data/blogPosts";
import { 
  ShieldIcon, 
  ServerIcon, 
  GlobeIcon, 
  ClipboardIcon, 
  DatabaseIcon,
  MobileIcon,
  LightningIcon,
  ArrowRightIcon,
  CheckIcon,
  BriefcaseIcon,
  DollarIcon,
  HeartIcon,
  StarIcon
} from "@/components/FlatIcons";

const blogs = blogPosts;

// Get unique tags from blogs for filter
const uniqueTags = Array.from(new Set(blogs.map(b => b.tag)));

// Category configuration with icons and colors - mapping ALL actual blog tags
const categoryConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string; borderColor: string }> = {
  // Technical related
  "Data Erasure": { icon: DatabaseIcon, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  "Storage Security": { icon: ServerIcon, color: "text-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
  "Technical": { icon: ServerIcon, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  "Core Erasure": { icon: DatabaseIcon, color: "text-cyan-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
  "Best Practices": { icon: CheckIcon, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  "Automation": { icon: LightningIcon, color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
  
  // Mobile & Security
  "Mobile Security": { icon: MobileIcon, color: "text-pink-600", bgColor: "bg-pink-50", borderColor: "border-pink-200" },
  "Zero Trust": { icon: ShieldIcon, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  "Security Awareness": { icon: ShieldIcon, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  
  // Compliance & Regulatory
  "Strategic Compliance": { icon: ClipboardIcon, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  "Regulatory Frameworks": { icon: ClipboardIcon, color: "text-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
  "Finance": { icon: DollarIcon, color: "text-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
  "Privacy": { icon: ShieldIcon, color: "text-violet-600", bgColor: "bg-violet-50", borderColor: "border-violet-200" },
  
  // Business & MSP
  "MSP Growth": { icon: BriefcaseIcon, color: "text-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
  "MSP": { icon: BriefcaseIcon, color: "text-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
  "ITAM": { icon: DatabaseIcon, color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  "Procurement": { icon: ClipboardIcon, color: "text-slate-600", bgColor: "bg-slate-50", borderColor: "border-slate-200" },
  "Brand": { icon: StarIcon, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  "Refurbishing": { icon: ServerIcon, color: "text-lime-600", bgColor: "bg-lime-50", borderColor: "border-lime-200" },
  "GovTech": { icon: GlobeIcon, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  
  // Sustainability
  "ESG": { icon: GlobeIcon, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  "Circular Economy": { icon: GlobeIcon, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  "Green Tech": { icon: GlobeIcon, color: "text-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
  "Scope 3": { icon: GlobeIcon, color: "text-cyan-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
  
  // Risk & Others
  "Risk Mgmt": { icon: ShieldIcon, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  "Dark Data": { icon: DatabaseIcon, color: "text-slate-600", bgColor: "bg-slate-50", borderColor: "border-slate-200" },
};

const getTagConfig = (tag: string) => {
  return categoryConfig[tag] || { icon: ShieldIcon, color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" };
};

// Estimate reading time
const getReadTime = (excerpt: string) => {
  const wordsPerMinute = 200;
  const wordCount = excerpt.split(/\s+/).length * 8;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// Featured category cards - these filter by category field which groups related tags
const featuredCategories = [
  { 
    icon: ServerIcon, 
    title: "Technical Guides", 
    description: "In-depth erasure methods, SSD wiping, and storage sanitization techniques",
    color: "bg-emerald-500",
    filterFn: (b: typeof blogs[0]) => ["Data Erasure", "Storage Security", "Technical", "Core Erasure", "Automation"].includes(b.tag)
  },
  { 
    icon: ClipboardIcon, 
    title: "Compliance & Regulatory", 
    description: "NIST 800-88, GDPR, SEC, HIPAA compliance insights and requirements",
    color: "bg-blue-500",
    filterFn: (b: typeof blogs[0]) => ["Strategic Compliance", "Regulatory Frameworks", "Finance", "Privacy", "Best Practices"].includes(b.tag)
  },
  { 
    icon: GlobeIcon, 
    title: "Sustainability & ESG", 
    description: "Carbon footprint reduction, circular economy, and green IT practices",
    color: "bg-green-500",
    filterFn: (b: typeof blogs[0]) => ["ESG", "Circular Economy", "Green Tech", "Scope 3"].includes(b.tag)
  },
  { 
    icon: BriefcaseIcon, 
    title: "MSP & Enterprise", 
    description: "Managed services, enterprise security, and large-scale operations",
    color: "bg-purple-500",
    filterFn: (b: typeof blogs[0]) => ["MSP Growth", "MSP", "ITAM", "Procurement", "Refurbishing", "Brand"].includes(b.tag)
  },
];

// Filter tabs with actual tag groups
const filterTabs = [
  { label: "All", tags: [] as string[] },
  { label: "Technical", tags: ["Data Erasure", "Storage Security", "Technical", "Core Erasure", "Automation"] },
  { label: "Compliance", tags: ["Strategic Compliance", "Regulatory Frameworks", "Finance", "Privacy", "Best Practices"] },
  { label: "Sustainability", tags: ["ESG", "Circular Economy", "Green Tech", "Scope 3"] },
  { label: "Security", tags: ["Mobile Security", "Zero Trust", "Security Awareness", "Risk Mgmt", "Dark Data"] },
  { label: "Business", tags: ["MSP Growth", "MSP", "ITAM", "Procurement", "Refurbishing", "Brand", "GovTech"] },
];

const BlogPage: React.FC = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);

  // Get the filter config
  const activeFilterConfig = filterTabs.find(f => f.label === activeFilter);

  // Filter blogs based on active filter AND search query
  const filteredBlogs = useMemo(() => {
    let result = blogs;
    
    // Apply category filter
    if (activeFilter !== "All" && activeFilterConfig?.tags.length) {
      result = result.filter(b => activeFilterConfig.tags.includes(b.tag));
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(query) ||
        b.excerpt.toLowerCase().includes(query) ||
        b.tag.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.keywords.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeFilter, activeFilterConfig, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleBlogs < filteredBlogs.length && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleBlogs((prev) => Math.min(prev + 6, filteredBlogs.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleBlogs, isLoading, filteredBlogs.length]);

  // Reset visible blogs when filter or search changes
  useEffect(() => {
    setVisibleBlogs(9);
  }, [activeFilter, searchQuery]);

  // Featured blogs (first 3)
  const featuredBlogs = blogs.slice(0, 3);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive via searchQuery state
  };

  // Handle category card click
  const handleCategoryClick = (idx: number) => {
    const labels = ["Technical", "Compliance", "Sustainability", "Business"];
    setActiveFilter(labels[idx] || "All");
    // Scroll to all articles section
    document.getElementById("all-articles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 border-b border-slate-100">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                D-Secure
              </span>{" "}
              Technical Blog
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              D-Secure is a leading provider of data erasure and IT asset lifecycle management solutions. Our blog provides expert insights and practical guides on data erasure, cybersecurity, and IT asset lifecycle management from our security professionals.
            </p>
          </div>
        </Reveal>
      </section>


      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">{blogs.length}+</div>
                <div className="text-sm text-slate-600 font-medium">Expert Articles</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">15+</div>
                <div className="text-sm text-slate-600 font-medium">Topics Covered</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">98%</div>
                <div className="text-sm text-slate-600 font-medium">Reader Satisfaction</div>
              </div>
            </Reveal>
            <Reveal>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">24/7</div>
                <div className="text-sm text-slate-600 font-medium">Access Available</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-3">
                  FEATURED
                </span>
                <h2 className="text-3xl font-bold text-slate-900">Featured Articles</h2>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map((blog, idx) => {
              const tagConfig = getTagConfig(blog.tag);
              const IconComponent = tagConfig.icon;
              return (
                <Reveal key={idx}>
                  <Link to={blog.link} className="group block h-full">
                    <article className={`h-full bg-white rounded-xl border-2 ${tagConfig.borderColor} hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1`}>
                      {/* Icon Header */}
                      <div className={`${tagConfig.bgColor} p-6 border-b ${tagConfig.borderColor}`}>
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm`}>
                            <IconComponent className={`w-6 h-6 ${tagConfig.color}`} filled={true} />
                          </div>
                          <span className={`px-3 py-1 text-xs font-semibold ${tagConfig.color} ${tagConfig.bgColor} rounded-full border ${tagConfig.borderColor}`}>
                            {blog.tag}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{getReadTime(blog.excerpt)}</span>
                          <span className="flex items-center gap-1 text-emerald-600 text-sm font-semibold group-hover:gap-2 transition-all">
                            Read <ArrowRightIcon className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Articles Section with Filters */}
      <section id="all-articles" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-3">
                ALL ARTICLES
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Browse All Resources</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Filter by category to find exactly what you're looking for
              </p>
            </div>
          </Reveal>

          {/* Filter Tabs */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {filterTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveFilter(tab.label)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === tab.label
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.slice(0, visibleBlogs).map((blog, idx) => {
              const tagConfig = getTagConfig(blog.tag);
              const IconComponent = tagConfig.icon;
              return (
                <Reveal key={idx}>
                  <Link to={blog.link} className="group block h-full">
                    <article className="h-full bg-white rounded-xl border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col hover:-translate-y-1">
                      {/* Header with icon and tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 ${tagConfig.bgColor} rounded-lg flex items-center justify-center`}>
                          <IconComponent className={`w-5 h-5 ${tagConfig.color}`} filled={true} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 text-xs font-medium ${tagConfig.bgColor} ${tagConfig.color} rounded-full`}>
                            {blog.tag}
                          </span>
                          <span className="text-xs text-slate-400">
                            {getReadTime(blog.excerpt)}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
                        {blog.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-slate-700">{blog.author}</span>
                          <span className="text-xs text-slate-400">{blog.publishDate}</span>
                        </div>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          Read <ArrowRightIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Infinite Scroll Loader */}
          {visibleBlogs < filteredBlogs.length && (
            <div ref={loaderRef} className="flex justify-center py-12">
              {isLoading ? (
                <div className="flex items-center gap-3 text-emerald-600">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-medium text-sm">Loading more articles...</span>
                </div>
              ) : (
                <div className="h-8"></div>
              )}
            </div>
          )}

          {visibleBlogs >= filteredBlogs.length && filteredBlogs.length > 9 && (
            <div className="text-center py-8">
              <p className="text-slate-500 font-medium text-sm">You've explored all articles in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-white" filled={true} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Informed with D-Secure
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get the latest insights on secure data erasure, compliance requirements,
              and IT asset lifecycle management delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
              >
                <ShieldIcon className="w-5 h-5" filled={true} />
                Contact Our Experts
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <ClipboardIcon className="w-5 h-5" />
                Browse Resources
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );

};

export default BlogPage;
