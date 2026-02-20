// File: CommonCriteriaCertifiedDataWipingBlog.tsx

import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const CommonCriteriaCertifiedDataWipingBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50">
      <SEOHead seo={getSEOForPage("common-criteria-certified-data-wiping")} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow">
        <Reveal>
          <div className="text-center px-6 max-w-5xl mx-auto">
            <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
              Security Certification
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Common Criteria Certified Data Erasure Software
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Why enterprises and service providers rely on independently validated, globally
              recognized certification for assured data sanitization.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
          <div className="bg-white rounded-xl shadow border p-10 space-y-8 text-lg leading-loose text-slate-700">

            <p>
              With data protection regulations tightening across regions and industries,
              organizations increasingly prefer security solutions that have been evaluated by
              internationally accredited certification bodies. Selecting a data erasure platform
              that guarantees irreversible removal of information is a responsibility that lies
              with IT Asset Managers (ITAMs), Information System Security Managers (ISSMs),
              compliance teams, and CISOs. Such tools must demonstrate not only functional
              effectiveness but also architectural security validated through formal assessment.
            </p>

            <p>
              The Common Criteria (CC) framework is one of the most widely accepted international
              standards for evaluating the security of IT products. Solutions that achieve CC
              certification are trusted across highly regulated sectors such as government,
              defense, financial services, critical infrastructure, and healthcare.
            </p>

            <p>
              Although the market offers numerous data wiping tools, only a small number qualify
              for Common Criteria certification due to the depth of technical scrutiny and
              assurance requirements involved. D-Secure Drive Eraser is among the few solutions
              that have successfully completed this process and has been certified at Evaluation
              Assurance Level (EAL) 2, confirming its design integrity and data sanitization
              reliability.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              Understanding Common Criteria Certification
            </h2>

            <p>
              A product evaluated under Common Criteria is assessed by an authorized Common
              Criteria Testing Laboratory (CCTL). These laboratories operate under national
              certification schemes that are members of the Common Criteria Recognition
              Arrangement (CCRA), an international agreement that enables mutual acceptance of
              security evaluations.
            </p>

            <p>
              The CCRA includes leading economies such as India, Germany, France, the Netherlands,
              Canada, Australia, Japan, and several others. A certificate issued by any accredited
              national body within this framework is recognized across all participating
              countries.
            </p>

            <p>
              In India, Common Criteria certification is administered by the Indian Common
              Criteria Certification Scheme (IC3S), operating under the Standardization Testing
              and Quality Certification (STQC) Directorate of the Ministry of Electronics and
              Information Technology. In Europe, organizations such as TrustCB B.V. in the
              Netherlands perform similar roles under their national accreditation systems.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              Evaluation of D-Secure Drive Eraser Under Common Criteria
            </h2>

            <p>
              D-Secure Drive Eraser underwent formal evaluation in accordance with Common Criteria
              Version 3.1, Revision 5. The assessment was carried out by an accredited CCTL and
              targeted compliance with EAL2 assurance requirements.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Functional and security testing performed by the product developer</li>
              <li>Independent validation by the evaluation laboratory</li>
              <li>Comprehensive vulnerability analysis and penetration testing</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900">
              Developer Verification
            </h3>
            <p>
              The evaluation team reviewed the developer’s test plans, coverage reports, and
              functional specifications, confirming alignment between the implemented erasure
              algorithms, security architecture, and the defined Security Target (ST).
            </p>

            <h3 className="text-xl font-semibold text-slate-900">
              Independent Laboratory Testing
            </h3>
            <p>
              Evaluators reproduced the functional tests in a controlled environment, verified
              configuration and operational guidance, and inspected the implementation of
              sanitization mechanisms to ensure conformity with documented security claims.
            </p>

            <h3 className="text-xl font-semibold text-slate-900">
              Vulnerability & Penetration Assessment
            </h3>
            <p>
              A detailed vulnerability search and penetration exercise confirmed that no
              exploitable weaknesses existed within the scope of Basic Attack Potential. The
              product demonstrated resilience against known misuse and attack scenarios.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              Certification Outcome
            </h2>

            <p>
              Based on documentation review, functional validation, and security testing,
              D-Secure Drive Eraser was found to satisfy all assurance and security functional
              requirements defined in its Security Target for EAL2.
            </p>

            <blockquote className="border-l-4 border-emerald-500 pl-6 italic text-slate-600">
              “The evaluation confirms that the Target of Evaluation fulfills all specified
              security functional and assurance requirements and is therefore recommended for
              Common Criteria EAL2 certification.”
            </blockquote>

            <h2 className="text-2xl font-bold text-slate-900">
              Why Common Criteria Matters for Enterprises and EAAS Providers
            </h2>

            <p>
              For organizations operating under strict regulatory oversight and for Managed
              Service Providers delivering Erasure as a Service (EAAS), Common Criteria
              certification delivers measurable assurance:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Internationally recognized validation of security design</li>
              <li>Independent confirmation of resistance to forensic recovery</li>
              <li>Eligibility for government and defense procurement programs</li>
              <li>Audit-ready support for GDPR, HIPAA, ISO 27001, NIST, CCPA, and similar frameworks</li>
              <li>Demonstrated adherence to structured security engineering practices</li>
            </ul>

            <p>
              With EAL2 certification under the Common Criteria framework, D-Secure Drive Eraser
              stands as a globally trusted, independently verified, and compliance-ready data
              sanitization platform for enterprises, ITADs, cloud providers, and MSPs seeking
              provable and irreversible data destruction.
            </p>

            <div className="pt-6">
              <Link
                to="/#products"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                Explore D-Secure Certified Erasure Solutions
              </Link>
            </div>

          </div>
        </Reveal>

        {/* Engagement, Comments & Enquiry Section */}
        <Reveal>
          <EngagementSection blogId="common-criteria-certified-data-wiping" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="common-criteria-certified-data-wiping" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="common-criteria-certified-data-wiping" 
            blogTitle="Common Criteria Certified Data Erasure Software" 
          />
        </Reveal>
      </section>
    </div>
  );
};

export default CommonCriteriaCertifiedDataWipingBlog;
