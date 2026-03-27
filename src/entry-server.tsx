import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import App from './App';
import { ToastProvider } from './components/Toast';
import i18n from './utils/internationalization';
import { I18nextProvider } from 'react-i18next';
import { Writable } from 'node:stream';

export function render(url: string): Promise<{ html: string; helmet: HelmetServerState }> {
  return new Promise((resolve, reject) => {
    let html = '';
    const helmetContext: { helmet?: HelmetServerState } = {};
    
    // Custom writable to capture the stream content
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      }
    });

    writable.on('finish', () => {
      resolve({ html, helmet: helmetContext.helmet! });
    });

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={helmetContext}>
          <I18nextProvider i18n={i18n}>
            <StaticRouter location={url}>
              <ToastProvider>
                <App />
              </ToastProvider>
            </StaticRouter>
          </I18nextProvider>
        </HelmetProvider>
      </React.StrictMode>
    , {
      onAllReady() {
        pipe(writable);
      },
      onError(error) {
        console.error('SSG Render Error:', error);
        reject(error);
      }
    });
  });
}
