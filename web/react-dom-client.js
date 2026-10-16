/**
 * Named ESM exports for Vite.
 * react-dom/client is CJS and only exposes `default` after pre-bundling.
 */
import impl from 'react-dom-client-impl';

export const createRoot = impl.createRoot;
export const hydrateRoot = impl.hydrateRoot;
export const version = impl.version;
export default impl;
