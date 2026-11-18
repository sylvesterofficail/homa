/** Prefix public asset paths with the deploy base path (e.g. /homa on GitHub Pages). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (p) => `${BASE}/${p.replace(/^\//, '')}`;
