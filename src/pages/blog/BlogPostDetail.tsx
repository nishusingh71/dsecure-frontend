import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { 
  ShieldIcon, 
  ArrowLeftIcon,
} from "@/components/FlatIcons";

// Local Icons for Blog Detail
const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
  </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find the relevant blog post
  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug);
  }, [slug]);

  // If post not found, redirect to blog listing
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Generate dynamic SEO if it's not explicitly in the registry
  const seoData = getSEOForPage(`blog/${post.slug}`, {
    title: `${post.title} | D-Secure Blog`,
    description: post.excerpt,
    keywords: post.keywords || `data erasure, ${post.tag}`,
    canonicalUrl: `https://dsecuretech.com/blog/${post.slug}`,
    ogType: 'article'
  });

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={seoData} />

      {/* Progress Bar (Subtle) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
        <div className="h-full bg-emerald-500 w-1/3 transition-all duration-300"></div>
      </div>

      {/* Hero Header */}
      <header className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Reveal>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium mb-8 transition-colors group"
            >
              <ArrowLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Technical Blog
            </Link>
          </Reveal>

          <Reveal delayMs={100}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
                {post.tag}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                <ClockIcon className="w-4 h-4" />
                {post.readTime || '5 min read'}
              </span>
            </div>
          </Reveal>

          <Reveal delayMs={200}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="flex flex-wrap items-center gap-6 text-slate-300 border-t border-white/10 pt-8 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{post.author}</div>
                  <div className="text-xs text-slate-400">Security Research</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">{post.publishDate}</span>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Share Article">
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-16">
        <Reveal>
          <article className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-emerald-600 prose-strong:text-slate-900">
            {/* Lead Excerpt */}
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-emerald-500 pl-6 mb-12">
              {post.excerpt}
            </p>

            {/* Main Body (Placeholder for actual content if missing) */}
            <div className="text-slate-700 leading-relaxed space-y-8">
              {post.content ? (
                /* In a real app, this would be dangerouslySetInnerHTML or a Markdown renderer */
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <>
                  <p>
                    Ensuring data security in the modern enterprise landscape requires more than just standard deletion. As storage technologies evolve, particularly with the widespread adoption of SSDs and NVMe drives, traditional overwriting methods often fall short of meeting global compliance standards.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Strategic Importance</h2>
                  <p>
                    Data sanitization is not just a technical requirement—it's a critical component of risk management. Organizations that fail to implement compliance-verified erasure protocols remain vulnerable to data breaches even after assets have left their physical control. This is especially true for sectors like <strong>Finance, Healthcare, and Government</strong> where regulatory scrutiny is highest.
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 my-12">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-800">
                      <ShieldIcon className="w-6 h-6" filled />
                      The D-Secure Advantage
                    </h3>
                    <p className="text-slate-700 mb-0">
                      Our proprietary erasure engines support 20+ international standards, providing audit-proof reports that guarantee 100% data destruction across all media types. By combining hardware acceleration with cryptographic sanitization, we deliver the industry's fastest and most secure decommissioning workflow.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Compliance Standards Mapping</h2>
                  <p>
                    Whether it's <strong>NIST 800-88, GDPR, or India's DPDP Act 2023</strong>, D-Secure maps technical erasure methods directly to regulatory obligations. Our platform generates digitally signed certificates that provide a complete chain of custody for every sanitized asset.
                  </p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Key Takeaways:</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Factory resets are insufficient for modern SSD wear-leveling algorithms.</li>
                    <li>Cryptographic erasure offers a rapid and highly secure alternative to multi-pass overwriting.</li>
                    <li>Centralized audit trails are essential for proving compliance during data protection audits.</li>
                  </ul>
                </>
              )}
            </div>
          </article>
        </Reveal>

        {/* Footer Navigation */}
        <footer className="mt-20 pt-10 border-t border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <ShieldIcon className="w-8 h-8 text-emerald-800" filled />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Secure Your Data Lifecycle</h4>
                <p className="text-sm text-slate-500">Learn how D-Secure protects your business.</p>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Consult an Expert
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default BlogPostDetail;
