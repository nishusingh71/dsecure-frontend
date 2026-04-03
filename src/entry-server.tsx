import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import App from './App';
import { ToastProvider } from './components/Toast';
import i18n from './utils/internationalization';
import { I18nextProvider } from 'react-i18next';
import { Writable } from 'node:stream';

// renderToPipeableStream use karo — React.lazy + Suspense ko support karta hai
// Note: react-helmet-async ka context React 19 streaming mein populate nahi hota,
// isliye prerender.js mein body HTML se SEO metadata extract kiya jaata hai
export function render(url: string): Promise<{ html: string; helmet: HelmetServerState | undefined }> {
  return new Promise((resolve, reject) => {
    let html = '';
    const helmetContext: { helmet?: HelmetServerState } = {};
    
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      }
    });

    writable.on('finish', () => {
      resolve({ html, helmet: helmetContext.helmet });
    });

    let didError = false;
    let piped = false;
    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <I18nextProvider i18n={i18n}>
          <StaticRouter location={url}>
            <ToastProvider>
              <App />
            </ToastProvider>
          </StaticRouter>
        </I18nextProvider>
      </HelmetProvider>
    , {
      onAllReady() {
        if (!didError && !piped) {
          piped = true;
          pipe(writable);
        }
      },
      onShellError(error: unknown) {
        didError = true;
        abort();
        reject(error);
      },
      onError(error: unknown) {
        didError = true;
        console.error('SSG Render Error:', error);
        abort();
        reject(error);
      }
    });

    // Promise timeout to prevent hanging build process
    setTimeout(() => {
      if (!didError && !piped) {
        didError = true;
        abort();
        reject(new Error(`Rendering timeout for ${url}`));
      }
    }, 30000);
  });
}
