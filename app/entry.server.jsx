import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

/**
 * @param {Request} request
 * @param {number} responseStatusCode
 * @param {Headers} responseHeaders
 * @param {EntryContext} remixContext
 * @param {AppLoadContext} context
 */
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  context,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    styleSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://some-custom-css.cdn',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://use.typekit.net',
      'https://p.typekit.net',
    ],
    fontSrc: [
      "'self'",
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://use.typekit.net',
      'https://p.typekit.net',
    ],
    mediaSrc: ["'self'", 'https://salonvertnyc.myshopify.com'],
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://formspree.io/',
      "'unsafe-eval'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://eu2-api.eng.bloomreach.com',
      'https://widgets.resy.com', // Add this line to allow the Resy script
      // Include other allowed domains for script loading
    ],
    frameSrc: [
      "'self'",
      'https://cdn.shopify.com',
      "'unsafe-eval'",
      'https://widgets.resy.com', // Allow framing from Resy
      // Add any other domains you need to allow framing from
    ],
    connectSrc: [
      'https://eu2-api.eng.bloomreach.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://formspree.io/',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/** @typedef {import('@shopify/remix-oxygen').EntryContext} EntryContext */
/** @typedef {import('@shopify/remix-oxygen').AppLoadContext} AppLoadContext */
