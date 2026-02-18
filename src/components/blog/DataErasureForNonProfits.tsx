import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  ClipboardIcon,
  ArrowRightIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const DataErasureForNonProfits: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <SEOHead seo={getSEOForPage("blog-data-erasure-non-profit-organizations")} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full mb-4">
              Non-Profit Data Security Guide
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Data Erasure Solutions
              </span>
              <br />
              for Non-Profit Organizations
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A comprehensive guide explaining why secure data erasure is a
              critical responsibility for non-profits, NGOs, and charitable
              organizations handling donor, beneficiary, and operational data.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
          <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-12">
            {/* Section 1 */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-slate-900">
                1. The Role of Data in Non-Profit and NGO Operations
              </h2>

              <p className="text-slate-700 leading-relaxed text-lg">
                Non-profit organizations and NGOs act as the backbone of many
                communities by supporting social welfare, healthcare,
                education, humanitarian aid, and environmental initiatives.
                Unlike commercial enterprises, their primary objective is not
                profit generation but creating long-term positive impact.
              </p>

              <p className="text-slate-700 leading-relaxed">
                To fulfill these missions, non-profits regularly interact with
                donors, beneficiaries, volunteers, partner organizations,
                funding agencies, and sometimes even government bodies. This
                interaction leads to the collection, processing, and storage of
                significant volumes of sensitive information across digital and
                physical systems.
              </p>

              <p className="text-slate-700 leading-relaxed">
                The data handled by non-profits may include personally
                identifiable information (PII), protected health information
                (PHI), donor financial details, grant and funding records,
                payroll data, children’s information, and records related to
                vulnerable individuals. Protecting this data throughout its
                lifecycle—including secure disposal—is not optional; it is a
                core organizational responsibility.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-slate-900">
                2. Regulatory and Governance Expectations for Non-Profits
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Data handled by non-profit organizations is often subject to
                multiple privacy and data protection regulations. Depending on
                the nature of the data and geographic reach, this may include
                laws such as CCPA, HIPAA, COPPA, and international regulations
                like GDPR.
              </p>

              <p className="text-slate-700 leading-relaxed">
                In addition to privacy laws, governance frameworks encourage
                charities and NGOs to establish strong policies around data
                integrity, retention, and destruction. Organizations with
                higher annual receipts are often expected to define structured
                document retention and destruction practices for both physical
                and electronic records.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Failing to implement a clear data disposal strategy can lead to
                regulatory non-compliance, audit challenges, excessive storage
                costs, and unnecessary accumulation of digital debris that
                increases security risks over time.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-slate-900">
                3. Why Data Breaches Are Especially Devastating for Non-Profits
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Trust is the foundation of every non-profit organization.
                Donors, partners, and beneficiaries share their information
                because they believe in the organization’s mission and ethical
                standards.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Unlike commercial businesses where customers may return based
                on convenience or pricing, non-profits rely heavily on long-term
                trust and goodwill. A single data breach involving donor or
                beneficiary information can severely damage credibility,
                discourage future donations, and negatively impact funding.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Secure data erasure plays a critical role in breach prevention
                by ensuring that obsolete, unused, or end-of-life devices do
                not become sources of data leakage.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                4. Building an Effective Data Disposal Policy for Non-Profits
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Non-profit organizations should implement a comprehensive data
                disposal policy that clearly defines how and when data must be
                securely erased. This policy should apply to laptops, desktops,
                servers, storage drives, and mobile devices used across the
                organization.
              </p>

              <ul className="space-y-4 text-slate-700">
                <li>
                  <strong>Lifecycle-Based Erasure:</strong> Ensure data is
                  securely erased when devices are retired, repurposed,
                  donated, or recycled.
                </li>

                <li>
                  <strong>Data Minimization:</strong> Retain only information
                  that actively supports organizational goals and remove data
                  that no longer serves a purpose.
                </li>

                <li>
                  <strong>Audit Readiness:</strong> Maintain records of data
                  destruction to demonstrate governance and compliance during
                  audits or reviews.
                </li>

                <li>
                  <strong>Consistent Implementation:</strong> Apply the same
                  disposal standards across departments and locations.
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* D-Secure Section */}
        <Reveal>
          <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              How D-Secure Enables Non-Profit Data Protection
            </h2>

            <p className="text-slate-700 leading-relaxed mb-6">
              D-Secure provides professional data erasure solutions designed to
              help non-profit organizations permanently remove sensitive
              information from storage devices while supporting compliance,
              audit readiness, and operational efficiency.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldIcon className="w-5 h-5 text-green-600" filled />
                  <h4 className="font-bold">Regulatory Alignment</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Supports secure data disposal aligned with global privacy and
                  governance expectations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardIcon className="w-5 h-5 text-green-600" filled />
                  <h4 className="font-bold">Audit-Ready Documentation</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Generates tamper-proof erasure reports and certificates for
                  internal and external audits.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldIcon className="w-5 h-5 text-green-600" filled />
                  <h4 className="font-bold">Risk Reduction</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Permanently removes unused data, reducing attack surfaces and
                  exposure risks.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardIcon className="w-5 h-5 text-green-600" filled />
                  <h4 className="font-bold">Operational Efficiency</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Helps non-profits reduce storage overhead and focus resources
                  on mission-critical activities.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Conclusion */}
        <Reveal>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 mt-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Secure Data, Stronger Trust, Greater Impact
            </h2>

            <p className="leading-relaxed mb-6">
              For non-profit organizations, secure data erasure is more than an
              IT requirement—it is a governance responsibility tied directly to
              trust, transparency, and sustainability. By implementing robust
              data disposal practices, non-profits can protect sensitive
              information and remain focused on their mission to create
              meaningful change.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg"
            >
              <HoverIcon>
                {(filled) => (
                  <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />
                )}
              </HoverIcon>
              Explore D-Secure Solutions
              <HoverIcon>
                {(filled) => (
                  <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />
                )}
              </HoverIcon>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Engagement */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="data-erasure-non-profit-organizations" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="data-erasure-non-profit-organizations" />
        </Reveal>
        <Reveal>
          <EnquiryForm
            blogId="data-erasure-non-profit-organizations"
            blogTitle="Data Erasure Solutions for Non-Profit Organizations"
          />
        </Reveal>
      </section>
    </div>
  );
};

export default DataErasureForNonProfits;
