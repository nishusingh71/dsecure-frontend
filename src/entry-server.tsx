import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import App from './App';
import { ToastProvider } from './components/Toast';
import './utils/internationalization';
import { Writable } from 'stream';

export function render(url: string, helmetContext: { helmet?: HelmetServerState }): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    
    // Custom writable to capture the stream content
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        resolve(html);
        callback();
      }
    });

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <ToastProvider>
              <App />
            </ToastProvider>
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>
    , {
      // onAllReady is for SSG/Crawlers - waits for all lazy components/Suspense to resolve
      onAllReady() {
        pipe(writable);
        writable.end(); // Trigger the 'final' callback
      },
      onError(error) {
        console.error('SSG Render Error:', error);
        reject(error);
      }
    });
  });
}
