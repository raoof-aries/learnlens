/**
 * Dynamic Basename Utility for Apache Deployment
 * 
 * Dynamically resolves the base URL/path regardless of whether the app is 
 * deployed at the server root ('/') or inside any subdirectory (e.g., '/subfolder/').
 */

/**
 * Returns the current dynamic base path derived from window.location.pathname.
 * @returns {string} E.g. '/' or '/subfolder/'
 */
export const getBasename = () => {
  if (typeof window === 'undefined') return '/';
  
  const pathname = window.location.pathname;
  
  // If path ends with a file (e.g. /index.html or /page.php), strip the filename
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return pathname.substring(0, pathname.lastIndexOf('/') + 1) || '/';
  }
  
  // Ensure trailing slash
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
};

/**
 * Constructs a fully dynamic asset path relative to the current deployment root.
 * @param {string} path - Relative asset path (e.g., 'logo.svg' or '/logo.svg')
 * @returns {string} Fully prefixed path
 */
export const getDynamicAssetUrl = (path) => {
  const base = getBasename();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

export const getDynamicBasename = getBasename;

export default getBasename;


