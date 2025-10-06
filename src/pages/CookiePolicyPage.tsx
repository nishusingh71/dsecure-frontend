import React from "react";
import Head from "next/head";

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://dsecuretech.com/cookie-policy" />
        <title>
          Cookie Policy | DSecure Data Usage & Privacy Settings
        </title>
        <meta
          name="description"
          content="DSecure Cookie Policy explaining how we use cookies and tracking technologies on our website. Learn about cookie types, purposes, and your control options."
        />
        <meta
          name="keywords"
          content="cookie policy, website cookies, tracking technologies, privacy settings, DSecure cookies, data usage"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 light:bg-gray-900 text-gray-800 light:text-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Cookies Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">1. Use of cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer by websites you visit. 
            They are widely used to make websites work more efficiently and to provide web services 
            and functionalities for users.
          </p>
          <p className="mt-4">
            Cookies may be either <strong>persistent</strong> or <strong>session</strong> cookies. 
            Persistent cookies remain valid until their expiry date (unless deleted earlier), 
            while session cookies expire when you close your browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">2. Site cookies</h2>
          <p className="mb-4">The following cookies are used on this site:</p>
          <table className="w-full border border-gray-600 text-left text-sm">
            <thead>
              <tr className="bg-gray-200 light:bg-gray-800">
                <th className="border border-gray-600 p-2">Cookies Source</th>
                <th className="border border-gray-600 p-2">Name</th>
                <th className="border border-gray-600 p-2">Function</th>
                <th className="border border-gray-600 p-2">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-600 p-2">Optimizely</td>
                <td className="border border-gray-600 p-2">—</td>
                <td className="border border-gray-600 p-2">
                  Used to store user behavior on this site and track actions performed by visitors.
                </td>
                <td className="border border-gray-600 p-2">30 days from the date of tracking</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">3. Third party cookies</h2>
          <p>
            The following third-party cookies are used to collect anonymous information about how visitors use the site:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Google Analytics cookies: <code>_utma</code>, <code>_utmb</code>, <code>_utmc</code>, <code>_utmz</code></li>
          </ul>
          <p className="mt-4">
            These collect information such as the number of visitors, where visitors come from, and which pages are visited.
            Learn more about privacy at{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Google Privacy Policy
            </a>.
          </p>
          <ul className="mt-4 list-disc list-inside">
            <li>_utmb: 30 mins from set date</li>
            <li>_utma: 2 years from set date</li>
            <li>_utmc: end of session</li>
            <li>_utmz: 6 months from set date</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">4. Don't Accept Cookies</h2>
          <p>
            If you do not want to accept cookies, please end your browsing session on this site. 
            The options above do not block third-party cookies. You can delete or manage them 
            through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">5. Change cookie settings in your browser</h2>
          <p>
            Most web browsers allow control of cookies through their settings. 
            To learn more, visit{" "}
            <a
              href="https://www.aboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              www.aboutcookies.org
            </a>{" "}
            or{" "}
            <a
              href="https://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              www.allaboutcookies.org
            </a>.
          </p>
          <p className="mt-4">
            To opt out of Google Analytics tracking, visit{" "}
            <a
              href="http://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              http://tools.google.com/dlpage/gaoptout
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">6. Cookies and personal information</h2>
          <p>
            Cookies do not contain personal information that identifies you directly. 
            However, information stored in Avangate tracking cookies may be linked to 
            data we hold about you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">7. Privacy policy and cookies policy</h2>
          <p>
            This Cookies Policy forms an integral part of our Terms of Use and Privacy Policy. 
            Please refer to those documents for more details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">8. Contact us</h2>
          <p>
            This website is owned and operated by <strong>D-Secure Technology Pvt. Ltd.</strong>
          </p>
        </section>

        {/* <p className="text-sm text-gray-600 light:text-gray-400 mt-12 text-center">
          © {new Date().getFullYear()} D-Secure Technology Pvt. Ltd. All Rights Reserved.
        </p> */}
      </div>
    </div>
    </>
  );
};

export default CookiePolicyPage;
