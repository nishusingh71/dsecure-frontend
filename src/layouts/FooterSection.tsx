// [PERF-M2] Extracted from MainLayout.tsx to reduce initial bundle size
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeAwareLogoFooter from "../components/ThemeAwareLogoFooter";

const FooterSection = () => {
  const { t } = useTranslation();
  return (
        <footer className="mt-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.02)_50%,transparent_70%)]"></div>

          <div className="container-app relative">
            {/* Newsletter CTA Section */}
            {/* <div className="py-12 border-b border-slate-700/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-brand/10 text-brand-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          Newsletter
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Stay ahead of data security trends
        </h3>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Get the latest insights on data erasure, compliance updates, and security best practices delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent backdrop-blur-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-brand to-brand-600 text-white font-semibold rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Subscribe
          </button>
        </form>
        <p className="text-slate-400 text-sm mt-4">
          Join 10,000+ security professionals. Unsubscribe anytime.
        </p>
      </div>
    </div> */}

            {/* Main Footer Content */}
            <div className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 xxl:py-20">
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-12 xl:grid-cols-12 xxl:grid-cols-12 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-14 xxl:gap-16">
                {/* Company Info */}
                <div className="sm:col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-4 xxl:col-span-4">
                  <Link
                    to="/"
                    className="flex items-center gap-2 xs:gap-3 font-bold text-white hover:opacity-80 transition-opacity mb-4 xs:mb-5 sm:mb-6"
                    aria-label="D-Secure homepage"
                  >
                    <ThemeAwareLogoFooter
                      className="h-8 xs:h-9 sm:h-10 md:h-11 lg:h-12 xl:h-13 xxl:h-14 w-auto"
                      responsive={true}
                      priority={false}
                    />
                  </Link>
                  <p className="text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base sm:text-base md:text-base lg:text-base xl:text-lg xxl:text-lg">
                    {t("footer.description")}
                  </p>

                  {/* Trust Indicators */}
                  {/* <div className="mb-8">
            <p className="text-slate-400 text-sm mb-3">Trusted by 1000+ companies worldwide</p>
            <div className="flex items-center gap-6 opacity-60">
              <div className="text-slate-400 text-xs font-mono">ISO 27001</div>
              <div className="text-slate-400 text-xs font-mono">SOC 2</div>
              <div className="text-slate-400 text-xs font-mono">GDPR</div>
              <div className="text-slate-400 text-xs font-mono">HIPAA</div>
            </div>
          </div> */}

                  {/* Social Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href="https://twitter.com/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="Follow D-Secure on Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/company/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="Connect with D-Secure on LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="View D-Secure projects on GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="https://youtube.com/dsecuretech"
                      className="text-slate-400 hover:text-brand transition-colors group"
                      aria-label="Subscribe to D-Secure YouTube channel"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {/* Services */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      {t("footer.products")}
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/#products"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/products";
                          }}
                        >
                          {t("footer.allProducts")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/drive-eraser"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.driveErasure")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products/file-eraser"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.fileErasure")}
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/services/cloud-erasure"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Cloud Erasure
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          to="/products/mobile-erasure"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Mobile Erasure
                        </Link>
                      </li> */}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      {t("footer.solutions")}
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/#industries"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = "/#industries";
                          }}
                        >
                          {t("footer.allSolutions")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/healthcare"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.healthcare")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/financial-services"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.financialServices")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/government"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.government")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/education"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.education")}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      {t("footer.resources")}
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="resources/documentation?type=documentation"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.documentation")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/resources/compliance?type=compliance"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.compliance")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.blog")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions?type=case-studies"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.caseStudies")}
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/resources?type=webinars"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Webinars
                        </Link>
                      </li> */}
                    </ul>
                  </div>

                  {/* Company */}
                  <div>
                    <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                      {t("footer.company")}
                    </h4>
                    <ul className="space-y-4 text-slate-300">
                      <li>
                        <Link
                          to="/about"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.aboutUs")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.contact")}
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/careers"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Careers
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/partners"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          {t("footer.partners")}
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/press"
                          className="hover:text-brand transition-colors hover:translate-x-1 transform duration-200 inline-block"
                        >
                          Press
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700/50 py-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-6 items-center text-slate-400 text-sm">
                  <p>
                    © {new Date().getFullYear()} {t("footer.copyright")}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs">
                        {t("footer.systemStatus")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
                  <Link
                    to="/privacy-policy"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Privacy Policy"
                  >
                    {t("footer.privacyPolicy")}
                  </Link>
                  <Link
                    to="/legal-policy"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Legal Policy"
                  >
                    {t("footer.legalPolicy")}
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Terms of Service"
                  >
                    {t("footer.termsOfService")}
                  </Link>
                  <Link
                    to="/cookie-policy"
                    className="hover:text-brand transition-colors"
                    aria-label="Read our Cookie Policy"
                  >
                    {t("footer.cookiePolicy")}
                  </Link>
                  <Link
                    to="/security"
                    className="hover:text-brand transition-colors"
                    aria-label="View our security practices and certifications"
                  >
                    {t("footer.security")}
                  </Link>
                  <Link
                    to="/status"
                    className="hover:text-brand transition-colors"
                    aria-label="Check system status and service availability"
                  >
                    Status
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

  );
};

export default FooterSection;