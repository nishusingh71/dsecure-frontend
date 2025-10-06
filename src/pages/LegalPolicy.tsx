import React from "react";
import Head from "next/head";
import { useNavigate } from "react-router-dom"; // If using React Router (optional)

const LegalPolicy: React.FC = () => {
  const navigate = useNavigate?.();

  const handleBack = () => {
    if (navigate) navigate("/");
    else window.location.href = "/";
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://dsecuretech.com/legal-policy" />
        <title>
          Legal Policy | DSecure Terms & Regulations
        </title>
        <meta
          name="description"
          content="DSecure Legal Policy outlining our terms, conditions, and legal framework for data erasure services and enterprise compliance solutions."
        />
        <meta
          name="keywords"
          content="legal policy, terms of service, data erasure regulations, compliance framework, DSecure legal terms"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      
      <div className="min-h-screen flex flex-col bg-gray-50 light:bg-gray-900 text-black-800 light:text-gray-200">
      {/* Header */}
      {/* <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          D-Secure
        </h1>
        <button
          onClick={handleBack}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          Back to Home
        </button>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto p-8">
        <h2 className="text-3xl text-black-800 font-bold mb-6 text-center">Legal Policy</h2>

        <p className="mb-6 text-center text-lg text-gray-600 dark:text-gray-400">
          D-Secure — Legal Policy
        </p>

        <section className="space-y-6">
          <div>
            <p>
              D-Secure is a product of <strong>D-Secure Technologies Pvt. Ltd.</strong>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Copyright</h3>
            <p>
              © {new Date().getFullYear()} D-Secure Technologies Pvt. Ltd. All Rights Reserved.
            </p>
            <p className="mt-2">
              The information contained in this site is copyrighted and may not be
              distributed, modified, or reproduced in whole or in part without the prior
              written permission of D-Secure Technologies Pvt. Ltd. The images from this
              site may not be reproduced in any form without prior written consent.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Trademarks</h3>
            <p>
              D-Secure, D-Shield, and all related logos are trademarks or registered
              trademarks of D-Secure Technologies Pvt. Ltd. in India and/or other
              countries. All other brand or product names referenced on this website are
              either trademarks or registered trademarks of their respective owners.
            </p>
            <p className="mt-2">
              The absence of a brand or product name or logo from this list does not
              constitute a waiver of any D-Secure or other intellectual property rights
              concerning that name or logo.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Content Copyright</h3>
            <p>
              The entire content of this website is copyrighted to D-Secure Technologies
              Pvt. Ltd., India, and should never be reproduced or copied to another
              website without written authorization from the owners of D-Secure
              Technologies Pvt. Ltd.
            </p>
            <p className="mt-2">
              Websites that scrape content using RSS feeds, bots, or manual methods will
              be reported to their web host with a DMCA takedown notice.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Electronic Communication</h3>
            <p>
              When you visit our website or send emails to us, you are communicating with
              us electronically. You consent to receive communications from us
              electronically. We will communicate with you by email or by posting notices
              on this site. You agree that all agreements, notices, disclosures, and
              other communications that we provide to you electronically satisfy any
              legal requirement that such communications be in writing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Applicable Law</h3>
            <p>
              By visiting{" "}
              <a
                href="https://www.dsecuretech.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                www.dsecuretech.com
              </a>
              , you agree that the laws of the state of Delhi, without regard to
              principles of conflict of laws, will govern these Conditions of Use and any
              dispute that might arise between you and D-Secure Technologies Pvt. Ltd.
            </p>
            <p className="mt-2">
              Any disputes must be settled in the courts of Delhi, India, and you agree
              to jurisdiction in such courts.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="bg-white dark:bg-gray-800 text-center py-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} D-Secure Technologies Pvt. Ltd. | All Rights Reserved.
        </p>
      </footer> */}
    </div>
    </>
  );
};

export default LegalPolicy;
