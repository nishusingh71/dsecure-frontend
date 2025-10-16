import Reveal from "@/components/Reveal";
import SearchBar from "@/components/SearchBar";
import SEOHead from "@/components/SEOHead";
import { useSearch } from "@/hooks/useSearch";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  tags: string;
}

export default function SearchDemoPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const products: Product[] = [
    { id: 1, name: "DoD 5220.22-M Erasure", category: "Security", description: "Military-grade data sanitization", price: 299, tags: "dod military secure" },
    { id: 2, name: "NIST 800-88 Compliance", category: "Security", description: "NIST certified erasure methods", price: 399, tags: "nist compliance certified" },
    { id: 3, name: "HIPAA Data Protection", category: "Healthcare", description: "Healthcare data security solution", price: 499, tags: "hipaa healthcare phi" },
    { id: 4, name: "SSD Secure Erase", category: "Hardware", description: "Optimized SSD erasure technology", price: 199, tags: "ssd hardware fast" },
    { id: 5, name: "HDD Wiping Tool", category: "Hardware", description: "Traditional hard drive sanitization", price: 149, tags: "hdd hardware legacy" },
    { id: 6, name: "Enterprise License", category: "Licensing", description: "Multi-device enterprise solution", price: 2999, tags: "enterprise bulk business" },
    { id: 7, name: "Verification Reports", category: "Compliance", description: "Automated compliance reporting", price: 99, tags: "reports audit compliance" },
    { id: 8, name: "Physical Destruction", category: "Hardware", description: "Hardware destruction services", price: 599, tags: "physical destruction shredding" },
    { id: 9, name: "Cloud Data Erasure", category: "Cloud", description: "Cloud storage sanitization", price: 349, tags: "cloud aws azure" },
    { id: 10, name: "Mobile Device Wipe", category: "Mobile", description: "iOS and Android data erasure", price: 249, tags: "mobile ios android" },
    { id: 11, name: "Gutmann Method", category: "Security", description: "35-pass overwrite algorithm", price: 449, tags: "gutmann secure thorough" },
    { id: 12, name: "Quick Format Tool", category: "Basic", description: "Fast formatting utility", price: 49, tags: "quick format basic" },
  ];

  const categories = ["All", "Security", "Healthcare", "Hardware", "Compliance", "Cloud", "Mobile", "Basic", "Licensing"];

  const suggestions = [
    { text: "DoD 5220.22-M standard", category: "Security", type: "suggestion" as const },
    { text: "NIST 800-88 guidelines", category: "Security", type: "suggestion" as const },
    { text: "HIPAA compliance", category: "Healthcare", type: "suggestion" as const },
    { text: "SSD secure erase", category: "Hardware", type: "trending" as const },
    { text: "Enterprise licensing", category: "Licensing", type: "trending" as const },
    { text: "Verification reports", category: "Compliance", type: "suggestion" as const },
    { text: "Cloud data erasure", category: "Cloud", type: "trending" as const },
    { text: "Mobile device wipe", category: "Mobile", type: "suggestion" as const },
    { text: "Physical destruction", category: "Hardware", type: "suggestion" as const },
    { text: "Gutmann method", category: "Security", type: "suggestion" as const },
  ];

  const { filteredItems, filters, updateFilter } = useSearch(
    products,
    ['name', 'description', 'category', 'tags'],
    {
      category: (item, value) => value === "All" || item.category === value,
      priceRange: (item, value) => {
        if (value === "all") return true;
        if (value === "low") return item.price < 200;
        if (value === "medium") return item.price >= 200 && item.price < 500;
        if (value === "high") return item.price >= 500;
        return true;
      }
    },
    {
      fuzzySearch: true,
      fieldWeights: { name: 2, tags: 1.5, description: 1, category: 1 },
      minScore: 30
    }
  );

  const displayProducts = searchQuery.trim() 
    ? filteredItems.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredItems;

  return (
    <>
      <SEOHead 
        seo={{
          title: "Advanced Search Demo - DSecure",
          description: "Experience our advanced search functionality with autocomplete, suggestions, and smart filtering",
          keywords: "search, demo, advanced search, autocomplete",
          canonicalUrl: "/search-demo"
        }} 
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Advanced Search
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  Experience
                </span>
              </h1>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-xl text-slate-600 mb-8">
                Amazon-style search with autocomplete, suggestions, recent searches, and smart filtering
              </p>
            </Reveal>
            <Reveal delayMs={200}>
              <SearchBar
                placeholder="Search products, features, or solutions..."
                onSearch={setSearchQuery}
                suggestions={suggestions}
                categories={categories.slice(1)}
                showRecentSearches={true}
                showTrending={true}
                maxSuggestions={8}
                autoFocus={true}
                className="max-w-3xl mx-auto"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container-responsive">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-semibold text-slate-700">Filter by:</span>
            
            {/* Category Filter */}
            <select
              value={filters.category || "All"}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <select
              value={filters.priceRange || "all"}
              onChange={(e) => updateFilter("priceRange", e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $200</option>
              <option value="medium">$200 - $500</option>
              <option value="high">$500+</option>
            </select>

            {/* Results Count */}
            <span className="ml-auto text-sm text-slate-600">
              {displayProducts.length} {displayProducts.length === 1 ? 'result' : 'results'}
            </span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container-responsive">
          {displayProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product, i) => (
                <Reveal key={product.id} delayMs={i * 50}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all hover:border-emerald-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                      <span className="text-emerald-600 font-bold text-lg">${product.price}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                        Learn More →
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.tags.split(' ').map(tag => (
                        <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container-responsive">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Search Features
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔍", title: "Fuzzy Search", desc: "Smart matching even with typos" },
              { icon: "⚡", title: "Instant Results", desc: "Real-time search as you type" },
              { icon: "🎯", title: "Smart Suggestions", desc: "Autocomplete with categories" },
              { icon: "🕐", title: "Recent Searches", desc: "Quick access to past queries" },
              { icon: "📊", title: "Trending Items", desc: "Popular search suggestions" },
              { icon: "⌨️", title: "Keyboard Nav", desc: "Arrow keys and shortcuts" },
              { icon: "🏷️", title: "Category Filter", desc: "Filter by product category" },
              { icon: "💾", title: "Search History", desc: "Persistent search memory" },
            ].map((feature, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
