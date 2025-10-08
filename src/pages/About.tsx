import Reveal from "@/components/Reveal";
import { useState } from "react";
import { 
  ShieldIcon, 
  LightningIcon, 
  CheckIcon, 
  StarIcon,
  ChatIcon,
  HeartIcon,
  HoverIcon 
} from '@/components/FlatIcons';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';

export default function AboutPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('about')} />
      
      <AboutPageContent />
    </>
  );
}

function AboutPageContent() {
  const [activeYear, setActiveYear] = useState("2025");

  const timeline = [
    {
      year: "2025",
      title: "Company Founded",
      description:
        "DSecure was established by technology enthusiasts with a vision to modernize data sanitization solutions.",
      icon: "🚀",
    },
    // {
    //   year: 'Q1 2025',
    //   title: 'Product Development',
    //   description: 'Built our core platform with cutting-edge AI technology and modern security protocols.',
    //   icon: '⚡'
    // },
    // {
    //   year: 'Q2 2025',
    //   title: 'Beta Launch',
    //   description: 'Successfully launched beta version with select enterprise clients for testing and feedback.',
    //   icon: '🧪'
    // },
    // {
    //   year: 'Q3 2025',
    //   title: 'First Commercial Release',
    //   description: 'Officially launched DSecure platform with comprehensive data erasure and compliance features.',
    //   icon: '📱'
    // },
    // {
    //   year: 'Q4 2025',
    //   title: 'Customer Growth',
    //   description: 'Onboarded initial enterprise customers and processed first 10,000+ devices successfully.',
    //   icon: '📈'
    // },
    // {
    //   year: 'Q1 2025',
    //   title: 'Series A Funding',
    //   description: 'Secured $15M Series A funding to accelerate growth and expand our engineering team.',
    //   icon: '💰'
    // },
    // {
    //   year: '2025',
    //   title: 'Market Recognition',
    //   description: 'Gaining industry recognition as an innovative new player in the data security space.',
    //   icon: '🏆'
    // }
  ];

  const leadership = [
    {
      name: "Dhruv Rai",
      position: "Founder & CEO",
      // bio: "Serial entrepreneur with under decade in cybersecurity, previously founded two successful startups.",
      // image: "",
      // education: "Stanford, MBA & Computer Science",
      // specialties: ["Startup Leadership", "Product Strategy", "Fundraising"],
    },
    {
      name: "Soorya",
      position: "Product Designer",
      // bio: "Former Lead Engineer at major tech companies, expert in AI and data security algorithms.",
      // image: "",
      // education: "MIT, Computer Science & AI",
      // specialties: ["AI/ML", "System Architecture", "Data Security"],
    },
    {
      name: "Deepak",
      position: "Research & Development Head",
      // bio: "Product leader from enterprise security companies, focused on user experience and market fit.",
      // image: "",
      // education: "Berkeley, Product Management",
      // specialties: ["Product Strategy", "UX Design", "Market Research"],
    },
    // {
    //   name: "Maria Rodriguez",
    //   position: "Head of Operations",
    //   bio: "Operations expert from scaling startups, ensures smooth execution and customer success.",
    //   image: "�‍🔧",
    //   education: "Wharton, Operations Management",
    //   specialties: ["Operations", "Customer Success", "Process Optimization"],
    // },
  ];

  const values = [
    {
      title: "Security First",
      description:
        "We prioritize data security in everything we do, ensuring your sensitive information is protected with military-grade protocols.",
      icon: (
        <HoverIcon>
          {(filled) => <ShieldIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Innovation",
      description:
        "We continuously evolve our solutions to stay ahead of emerging security challenges and technological advances.",
      icon: (
        <HoverIcon>
          {(filled) => <LightningIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest standards of professional ethics, transparency, and accountability in all operations.",
      icon: (
        <HoverIcon>
          {(filled) => <CheckIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      color: "from-green-500 to-green-600",
    },
    {
      title: "Excellence",
      description:
        "We deliver exceptional quality in our products and services, exceeding customer expectations consistently.",
      icon: (
        <HoverIcon>
          {(filled) => <StarIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and partnerships to achieve extraordinary results together.",
      icon: (
        <HoverIcon>
          {(filled) => <ChatIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Sustainability",
      description:
        "We promote responsible data disposal practices that protect the environment and support circular economy.",
      icon: (
        <HoverIcon>
          {(filled) => <HeartIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  // const awards = [
  //   {
  //     year: '2025',
  //     title: 'Rising Star Award',
  //     organization: 'TechCrunch Startup Awards',
  //     description: 'Most promising new cybersecurity startup of the year'
  //   },
  //   {
  //     year: '2025',
  //     title: 'Innovation Spotlight',
  //     organization: 'RSA Conference',
  //     description: 'Recognized for breakthrough AI-powered data erasure technology'
  //   },
  //   {
  //     year: '2025',
  //     title: 'Best New Product',
  //     organization: 'InfoSec Awards',
  //     description: 'Outstanding new solution in data protection category'
  //   },
  //   {
  //     year: '2025',
  //     title: 'Startup to Watch',
  //     organization: 'CyberSeek Magazine',
  //     description: 'Featured as one of the top emerging cybersecurity companies'
  //   }
  // ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container-app py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                The New Standard in{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand/80">
                  Data Security
                </span>
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Founded in 2025, DSecure is revolutionizing the data erasure
                industry with cutting-edge technology, bringing fresh innovation
                and modern solutions to data protection and compliance
                challenges.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#story" className="btn-primary">
                  Our Story
                </a>
                <a href="#team" className="btn-secondary">
                  Meet the Team
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "2025", label: "Year Founded", icon: "📅" },
              { number: "25K+", label: "Devices Secured", icon: "🔒" },
              { number: "99.8%", label: "Success Rate", icon: "✅" },
              { number: "15+", label: "Countries Served", icon: "🌍" },
            ].map((stat, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="text-center p-6 rounded-2xl bg-white shadow-xl border border-slate-200/60">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-brand mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section
        id="story"
        className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50"
      >
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Journey
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                From a small startup to a global leader in data security,
                discover the milestones that shaped our company.
              </p>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 mb-12 max-w-3xl mx-auto">
              {timeline.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setActiveYear(item.year)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeYear === item.year
                      ? "bg-brand text-white shadow-lg"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>

            <Reveal key={activeYear}>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 md:p-8 lg:p-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="text-4xl sm:text-5xl flex-shrink-0">
                    {timeline.find((t) => t.year === activeYear)?.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-brand font-semibold">{activeYear}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {timeline.find((t) => t.year === activeYear)?.title}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  {timeline.find((t) => t.year === activeYear)?.description}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Reveal>
              <div className="bg-gradient-to-br from-brand to-brand/80 rounded-2xl p-8 md:p-12 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-xl leading-relaxed opacity-90 mb-6">
                  To revolutionize data security with modern, AI-powered
                  solutions that make data erasure more accessible, efficient,
                  and reliable for organizations of all sizes.
                </p>
                <div className="space-y-3">
                  {[
                    "Modernize data erasure with AI technology",
                    "Simplify compliance with automated reporting",
                    "Deliver enterprise-grade security at startup speed",
                    "Make data protection accessible to all businesses",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-white/80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="opacity-90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={20}>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8 md:p-12">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  To become the go-to platform for modern data erasure, setting
                  new industry standards with innovative technology and
                  exceptional user experience.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      2027 Goals
                    </h4>
                    <ul className="text-slate-600 text-sm space-y-1">
                      <li>• Process 500K+ devices annually</li>
                      <li>• Expand to  countries globally</li>
                      <li>• Achieve 100% automated compliance</li>
                      <li>• Lead in AI-powered data discovery</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Core Values
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The principles that guide our decisions, shape our culture, and
                drive our commitment to excellence.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, i) => (
              <Reveal key={i} delayMs={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/60 hover:shadow-2xl transition-shadow duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white mb-6`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Leadership Team
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Meet the experienced leaders driving DSecure's innovation and
                growth across the globe.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <Reveal key={i} delayMs={i * 150}>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/60 text-center hover:shadow-2xl transition-shadow duration-300">
                  {/* <div className="text-6xl mb-4">{leader.image}</div> */}
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-brand font-medium text-sm mb-3">
                    {leader.position}
                  </p>
                  {/* <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {leader.bio}
                  </p> */}

                  {/* <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-slate-900 mb-1">
                        Education
                      </div>
                      <div className="text-slate-600">{leader.education}</div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-slate-900 mb-2">
                        Specialties
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {leader.specialties.map((specialty, j) => (
                          <span
                            key={j}
                            className="px-2 py-1 bg-brand/10 text-brand rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div> */}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      {/* <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Awards & Recognition</h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our commitment to excellence has been recognized by leading industry organizations worldwide.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {awards.map((award, i) => (
              <Reveal key={i} delayMs={i*100}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium">
                        {award.year}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{award.title}</h3>
                    <p className="text-brand font-medium text-sm mb-2">{award.organization}</p>
                    <p className="text-slate-600 text-sm">{award.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* Careers CTA */}
      {/* <section className="py-16 md:py-24">
        <div className="container-app">
          <Reveal>
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join Our Mission
                </h2>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  We're always looking for passionate individuals who want to
                  make a difference in data security. Join our team and help
                  shape the future of digital protection.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/careers"
                    className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                  >
                    View Open Positions
                  </a>
                  <a
                    href="/contact"
                    className="border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    Contact HR
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold mb-1">2,500+</div>
                      <div className="text-sm opacity-90">
                        Enterprise Clients
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">15M+</div>
                      <div className="text-sm opacity-90">Devices Wiped</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">30+</div>
                      <div className="text-sm opacity-90">Countries Served</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">100%</div>
                      <div className="text-sm opacity-90">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section> */}
    </>
  );
}
