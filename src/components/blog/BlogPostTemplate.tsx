import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import Reveal from "@/components/Reveal";
import OptimizedImage from "@/components/OptimizedImage";

interface BlogPostTemplateProps {
  title: string;
  description: string;
  publishDate?: string;
  author?: string;
  image: string;
  keywords: string;
  canonicalUrl: string;
  tag?: string;
  children: React.ReactNode;
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  title,
  description,
  publishDate,
  author = "D-Secure Team",
  image,
  keywords,
  canonicalUrl,
  tag,
  children,
}) => {
  const seoData = {
    title: `${title} | D-Secure Tech Blog`,
    description,
    keywords,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    author,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead seo={seoData} />

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-slate-900/90 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        
        <Reveal>
          <div className="relative z-20 max-w-4xl mx-auto text-center text-white">
            {tag && (
              <span className="inline-block py-1 px-3 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-sm font-semibold mb-6">
                {tag}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              {description}
            </p>
            {publishDate && (
              <div className="mt-6 text-slate-400 text-sm flex items-center justify-center gap-4">
                <span>{publishDate}</span>
                <span>•</span>
                <span>{author}</span>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="max-w-[95%] lg:max-w-7xl mx-auto px-2 lg:px-8 py-12">
          <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-12 border border-slate-200">
            <div className="prose prose-lg md:prose-xl prose-slate max-w-none text-justify prose-headings:font-extrabold prose-p:leading-loose">
              {children}
            </div>
          </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
        <Reveal>
            <h2 className="text-3xl font-bold text-white mb-6">Need Professional Data Security?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
                Explore our certified erasure solutions compliant with global standards.
            </p>
             <a href="/solutions/enterprise" className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-brand-500/20">
                View Solutions
            </a>
        </Reveal>
      </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="blog-post-template" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="blog-post-template" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="blog-post-template" 
            blogTitle="Blog Post Template" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default BlogPostTemplate;



