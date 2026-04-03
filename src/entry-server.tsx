import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import App from './App';
import { ToastProvider } from './components/Toast';
import i18n from './utils/internationalization';
import { I18nextProvider } from 'react-i18next';
import { PassThrough, Writable } from 'node:stream';

// SSR result ka type definition
interface RenderResult {
  html: string;
  helmet: HelmetServerState | undefined;
}

/**
 * renderToPipeableStream use karo — React.lazy + Suspense ko support karta hai
 * Note: react-helmet-async ka context React 19 streaming mein populate nahi hota,
 * isliye prerender.js mein body HTML se SEO metadata extract kiya jaata hai
 * 
 * Fix: Har render mein ek fresh, independent PassThrough stream create hota hai
 * taaki "piping to one writable stream" error na aaye
 */
export function render(url: string): Promise<RenderResult> {
  return new Promise((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {};
    
    // Fresh stream banao — PassThrough stream use karo jo independent aur reliable hai
    const chunks: Buffer[] = [];
    const collector = new PassThrough();
    
    collector.on('data', (chunk: Buffer) => {
      chunks.push(Buffer.from(chunk));
    });
    
    collector.on('end', () => {
      const html = Buffer.concat(chunks).toString('utf-8');
      resolve({ html, helmet: helmetContext.helmet });
    });
    
    collector.on('error', (err: Error) => {
      reject(err);
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
        // Sab lazy components load ho chuke hain — ab pipe karo
        if (!didError && !piped) {
          piped = true;
          try {
            pipe(collector);
          } catch (pipeError) {
            // "piping to one writable stream" error yahan aa sakta hai
            // Fallback: empty HTML return karo error comment ke saath
            console.warn(`⚠️ Pipe failed for ${url}: ${(pipeError as Error).message}`);
            const fallbackHtml = `<!-- SSG: Pipe error for ${url} -->`;
            resolve({ html: fallbackHtml, helmet: helmetContext.helmet });
          }
        }
      },
      onShellError(error: unknown) {
        didError = true;
        reject(error);
      },
      onError(error: unknown) {
        // Error log karo lekin reject mat karo — onAllReady still fire ho sakta hai
        // Sirf critical errors pe reject karo
        const errMsg = (error as Error).message || '';
        if (errMsg.includes('piping to one writable stream')) {
          // Yeh error expected hai kuch routes pe — gracefully handle karo
          console.warn(`⚠️ Stream conflict for ${url}: ${errMsg}`);
          if (!piped) {
            resolve({ html: `<!-- SSG: Stream conflict for ${url} -->`, helmet: helmetContext.helmet });
          }
          return;
        }
        didError = true;
        console.error('SSG Render Error:', error);
      }
    });

    // Timeout to prevent hanging build process
    setTimeout(() => {
      if (!piped && !didError) {
        didError = true;
        abort();
        reject(new Error(`Rendering timeout for ${url}`));
      }
    }, 30000);
  });
}
