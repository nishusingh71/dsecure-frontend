import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const blogs = [
  {
    title: "Overwrite Guide – How Many Passes Are Enough?",
    image: "https://picsum.photos/id/1015/1000/400",
    link: "/blog/overwrite-guide",
    tag: "Data Erasure",
  },
  {
    title: "Securely Wiping SSDs & Flash Drives",
    image: "https://picsum.photos/id/1021/1000/400",
    link: "/blog/ssd-wipe-guide",
    tag: "Storage Security",
  },
  {
    title: "Data Erasure vs Data Destruction – What’s the Difference?",
    image: "https://picsum.photos/id/1043/1000/400",
    link: "/blog/erasure-vs-destruction",
    tag: "Compliance",
  },
  {
    title: "Top 5 Myths About Secure Data Deletion",
    image: "https://picsum.photos/id/1060/1000/400",
    link: "/blog/data-deletion-myths",
    tag: "Awareness",
  },
  {
    title: "Data Sanitization & Compliance",
    image: "https://picsum.photos/id/1079/1000/400",
    link: "/blog/data-sanitization-compliance",
    tag: "Compliance",
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            D-Secure Blog
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Insights and practical guides on data erasure, cybersecurity, and IT
            asset lifecycle management.
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
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-3">
                    {blog.tag}
                  </span>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-emerald-600">
                    {blog.title}
                  </h2>
                  <span className="text-emerald-600 font-semibold text-sm group-hover:underline">
                    Read More →
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
            Stay Informed with D-Secure
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
            Subscribe to get updates on secure data erasure best practices and
            cybersecurity insights.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default BlogPage;
