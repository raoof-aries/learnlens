/**
 * Computes the dynamic base path for the application at runtime.
 * Works seamlessly whether the app is hosted at root ('/') or inside any Apache subfolder ('/my-folder/').
 *
 * @returns {string} The dynamic base path (e.g., '/' or '/subfolder')
 */
export const getDynamicBasename = () => {
  // Get window location pathname
  const pathname = window.location.pathname;

  // Strip trailing file name if present (e.g., /index.html)
  let base = pathname.replace(/\/[^/]*\.[^/]*$/, '');

  // Strip trailing slash if not root '/'
  if (base.length > 1 && base.endsWith('/')) {
    base = base.slice(0, -1);
  }

  return base || '/';
};

export default getDynamicBasename;
