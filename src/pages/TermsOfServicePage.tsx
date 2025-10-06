import { useEffect } from 'react'
import Head from 'next/head';

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Head>
        <link rel="canonical" href="https://dsecuretech.com/terms-of-service" />
        <title>
          DSecureTech Compliance | Data Erasure Standards & Regulations
        </title>
        <meta
          name="description"
          content="DSecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
        />
        <meta
          name="keywords"
          content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      
      <div className="min-h-screen bg-white light:bg-slate-900 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 xxl:px-16">
          
          {/* Header Section */}
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 xxl:mb-28">
            <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl font-bold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 xxl:mb-14">
              Terms of Service
            </h1>
            <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl xxl:text-2xl text-slate-600 light:text-slate-300">
              Effective Date: October 4, 2025
            </p>
          </div>

          {/* Content Sections */}
          <div className="prose prose-slate light:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                1. Agreement to Terms
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                By accessing or using DSecure's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed">
                These terms apply to all visitors, users, and others who access or use our data security services.
              </p>
            </section>

            {/* Service Description */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                2. Description of Services
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                DSecure provides enterprise-grade data security solutions including:
              </p>
              <ul className="list-disc list-inside text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 xl:space-y-4 xxl:space-y-5">
                <li>Certified data erasure solutions</li>
                <li>Mobile device security and wiping</li>
                <li>Network and server data protection</li>
                <li>Cloud data erasure services</li>
                <li>Compliance reporting and documentation</li>
                <li>ITAD (IT Asset Disposition) services</li>
              </ul>
            </section>

            {/* User Responsibilities */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                3. User Responsibilities
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc list-inside text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 xl:space-y-4 xxl:space-y-5">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not attempt to compromise our security measures</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect intellectual property rights</li>
                <li>Not use our services for unauthorized data access</li>
              </ul>
            </section>

            {/* Service Availability */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                4. Service Availability
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 xl:space-y-4 xxl:space-y-5">
                <li>Perform scheduled maintenance and updates</li>
                <li>Suspend services for emergency repairs</li>
                <li>Modify or discontinue features with notice</li>
                <li>Restrict access for security purposes</li>
              </ul>
            </section>

            {/* Payment and Billing */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                5. Payment and Billing
              </h2>
              <ul className="list-disc list-inside text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 xl:space-y-4 xxl:space-y-5">
                <li>Payment is required before service delivery</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>Prices may change with 30 days notice</li>
                <li>Late payments may result in service suspension</li>
                <li>You are responsible for applicable taxes</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                6. Data Security and Confidentiality
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                We are committed to protecting your data through:
              </p>
              <ul className="list-disc list-inside text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 xl:space-y-4 xxl:space-y-5">
                <li>Industry-standard encryption protocols</li>
                <li>Secure data handling procedures</li>
                <li>Regular security audits and assessments</li>
                <li>Compliance with relevant data protection laws</li>
                <li>Employee confidentiality agreements</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                7. Limitation of Liability
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed">
                In no event shall DSecure be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20">
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                8. Termination
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                We may terminate or suspend your account and access to our services immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed">
                You may terminate your account at any time by contacting our support team.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl xxl:text-5xl font-semibold text-slate-900 light:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
                9. Contact Information
              </h2>
              <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-slate-50 light:bg-slate-800 p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 xxl:p-10 rounded-lg">
                <p className="text-base xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl xxl:text-2xl text-slate-700 light:text-slate-300 leading-relaxed">
                  <strong className="text-slate-900 light:text-white">Email:</strong> legal@dsecuretech.com<br />
                  <strong className="text-slate-900 light:text-white">Phone:</strong> +1 (555) 123-4567<br />
                  <strong className="text-slate-900 light:text-white">Address:</strong> DSecure Technologies<br />
                  Legal Department<br />
                  [Your Business Address]
                </p>
              </div>
            </section>

          </div>

        </div>
      </div>
    </>
  )
}