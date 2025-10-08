import React from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

const blogs = [
  {
    title: "Overwrite Guide – How Many Passes Are Enough?",
    image: "https://res.cloudinary.com/dhwi5wevf/image/upload/v1759939004/zmeyhnzz2zsp2y9byyik.png",
    link: "/blog/overwrite-guide",
    tag: "Data Erasure",
    excerpt: "Understanding the science behind data overwriting and determining the optimal number of passes for complete data erasure following NIST and DoD standards.",
  },
  {
    title: "Securely Wiping SSDs & Flash Drives",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1000&h=400&fit=crop&crop=center",
    link: "/blog/ssd-wipe-guide",
    tag: "Storage Security",
    excerpt: "Learn the special considerations and techniques required for securely erasing solid-state drives and flash storage devices, including wear-leveling challenges.",
  },
  {
    title: "Data Erasure vs Data Destruction – What’s the Difference?",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1000&h=400&fit=crop&crop=center",
    link: "/blog/erasure-vs-destruction",
    tag: "Compliance",
    excerpt: "Compare the advantages and use cases of data erasure versus physical destruction for secure data disposal and compliance requirements.",
  },
  {
    title: "Top 5 Myths About Secure Data Deletion",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1000&h=400&fit=crop&crop=center",
    link: "/blog/data-deletion-myths",
    tag: "Awareness",
    excerpt: "Debunking common misconceptions about data deletion and revealing the truth about secure data erasure practices in modern IT environments.",
  },
  {
    title: "Data Sanitization & Compliance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1000&h=400&fit=crop&crop=center",
    link: "/blog/data-sanitization-compliance",
    tag: "Compliance",
    excerpt: "Navigate the complex landscape of compliance requirements and ensure your data sanitization meets GDPR, HIPAA, and other industry standards.",
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            DSecure Technical Blog
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Expert insights and practical guides on data erasure, cybersecurity, and IT
            asset lifecycle management from our security professionals.
          </p>
        </Reveal>
      </section>

      {/* Blog Cards Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <Reveal key={idx}>
              <Link
                to={blog.link}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="overflow-hidden flex-shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-3 w-fit flex-shrink-0">
                    {blog.tag}
                  </span>
                  <h2 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-emerald-600 line-clamp-2 flex-shrink-0 min-h-[3.5rem]">
                    {blog.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>
                  <span className="text-emerald-600 font-semibold text-sm group-hover:underline mt-auto flex-shrink-0">
                    Read Full Article →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Optional CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Informed with DSecure
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
            Subscribe to get updates on secure data erasure best practices,
            cybersecurity insights, and compliance requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <Link
              to="/contact"
              className="inline-block bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Our Experts
            </Link>
            <Link
              to="/resources"
              className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
            >
              Browse Resources
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default BlogPage;
