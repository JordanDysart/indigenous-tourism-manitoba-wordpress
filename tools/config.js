/**
 * Shared configuration for ITM Theme (kiwatinook) Agentic Tooling
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const themeRoot = path.resolve(__dirname, '..');
export const docsDir = path.resolve(themeRoot, 'docs');
export const screenshotsDir = path.resolve(docsDir, 'screenshots');
export const styleguideDir = path.resolve(docsDir, 'styleguide');

// Base URL for the local Lando WordPress development environment
export const BASE_URL = process.env.WP_BASE_URL || 'https://indigenous-tourism-manitoba-wordpress.lndo.site';
export const FALLBACK_URL = 'http://localhost:60618';

// Target pages for visual capture, style audit, and regression testing
export const PAGES = [
  { id: 'home', name: 'Home Page', path: '/', priority: 'high' },
  { id: 'about', name: 'About Indigenous Tourism Manitoba', path: '/about-itm/', priority: 'high' },
  { id: 'operators', name: 'Operators Directory', path: '/operators/', priority: 'high' },
  { id: 'operator-single', name: 'Single Operator (Prairie Berry)', path: '/operator/prairie-berry/', priority: 'high' },
  { id: 'experience-map', name: 'Experience Map', path: '/experience-map/', priority: 'high' },
  { id: 'reconciliation', name: 'Reconciliation', path: '/reconciliation/', priority: 'high' },
  { id: 'things-to-do', name: 'Things To Do', path: '/things-to-do/', priority: 'high' },
  { id: 'our-team', name: 'Our Team', path: '/our-team/', priority: 'high' },
  { id: 'become-a-member', name: 'Become a Member', path: '/become-a-member/', priority: 'high' },
  { id: 'member-benefits', name: 'Member Benefits', path: '/member-benefits/', priority: 'high' },
  { id: 'contact', name: 'Contact Us', path: '/contact-us/', priority: 'high' },
  { id: 'privacy-policy', name: 'Privacy Policy', path: '/privacy-policy/', priority: 'medium' },
  { id: 'new-account-request', name: 'New Account Request', path: '/new-account-request/', priority: 'medium' },
  { id: 'guide-training-inquiry', name: 'Guide Training Inquiry Form', path: '/itm-indigenous-guide-training-program-inquiry-form/', priority: 'medium' },
  { id: 'guide-training', name: 'Guide Training Program (Hub)', path: '/guide-training-program/', priority: 'high' },
  { id: 'guide-training-step-1', name: 'Guide Training Step 1', path: '/indigenous-guide-training-program-step-1/', priority: 'medium' },
  { id: 'guide-training-step-2', name: 'Guide Training Step 2', path: '/indigenous-guide-training-program-step-2/', priority: 'medium' },
  { id: 'guide-training-step-3', name: 'Guide Training Step 3', path: '/indigenous-guide-training-program-step-3/', priority: 'medium' },
  { id: 'guide-training-more-ops', name: 'Guide Training More Opportunities', path: '/indigenous-guide-training-program-more-learning-opportunities/', priority: 'medium' },
  { id: 'not-found', name: '404 Error Page', path: '/non-existent-page-404', priority: 'low' },
];

// Responsive Breakpoints
export const BREAKPOINTS = {
  desktop: { name: 'Desktop', width: 1280, height: 800, deviceScaleFactor: 1 },
  tablet: { name: 'Tablet', width: 768, height: 1024, deviceScaleFactor: 1 },
  mobile: { name: 'Mobile', width: 375, height: 812, deviceScaleFactor: 2, isMobile: true },
};

// Canonical Design System Tokens
export const CANONICAL_TOKENS = {
  colors: {
    primaryAccent: { name: 'Orange Accent', hex: '#da5225', less: '@color-orange', role: 'Primary accent, region tags, CTA buttons' },
    gold: { name: 'Gold Highlight', hex: '#e0ac0f', less: '@color-gold', role: 'Selected states, highlights, nav active' },
    goldDark: { name: 'Dark Gold', hex: '#dca12b', less: '@color-gold-dark', role: 'Accent lines, decorative borders' },
    maroon: { name: 'Maroon', hex: '#610000', less: '@color-maroon', role: 'Desktop nav links, dark headings' },
    blue: { name: 'Deep Ocean Blue', hex: '#116e95', less: '@color-blue', role: 'Hover states, secondary links' },
    dark: { name: 'Charcoal Dark', hex: '#212b36', less: '@color-dark', role: 'Dark UI backgrounds, headings, dark buttons' },
    bodyText: { name: 'Body Charcoal', hex: '#404040', less: '@color-body-text', role: 'Default body paragraph text' },
    mapBg: { name: 'Map Olive', hex: '#605e43', less: '@color-map-bg', role: 'Operator map panel background' },
    midGray: { name: 'Mid Gray', hex: '#637381', less: '@color-mid-gray', role: 'Secondary text, muted elements' },
    lightGray: { name: 'Light Gray', hex: '#919eab', less: '@color-light-gray', role: 'Placeholders, disabled borders' },
    offWhite: { name: 'Off White', hex: '#f9f9f9', less: '@color-off-white', role: 'Light section backgrounds' },
  },
  typography: {
    fontPrimary: 'Nunito Sans',
    fontSecondary: 'Ubuntu',
    headings: {
      h1: { size: '2.5rem', sizePx: 40, weight: 700, font: 'Ubuntu', color: '#212b36' },
      h2: { size: '2rem', sizePx: 32, weight: 700, font: 'Ubuntu', color: '#212b36' },
      h3: { size: '1.5rem', sizePx: 24, weight: 700, font: 'Ubuntu', color: '#212b36' },
      h4: { size: '1.25rem', sizePx: 20, weight: 700, font: 'Ubuntu', color: '#212b36' },
      h5: { size: '1.125rem', sizePx: 18, weight: 700, font: 'Ubuntu', color: '#212b36' },
      h6: { size: '1rem', sizePx: 16, weight: 700, font: 'Ubuntu', color: '#212b36' },
    },
    body: {
      size: '1rem',
      sizePx: 16,
      lineHeight: 1.5,
      weight: 400,
      font: 'Nunito Sans',
      color: '#404040',
    },
  },
  borderRadius: {
    sm: '5px',
    md: '8px',
    lg: '16px',
    xl: '40px',
    full: '100%',
  },
  layout: {
    contentWidth: '1244px',
    contentWidthNarrow: '1140px',
    gap: '20px',
    headerHeight: '110px',
  },
};

/**
 * Launch Playwright browser with Chrome fallback and ignore TLS certificate errors for local Lando HTTPS
 */
export async function createBrowser() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(chromePath)) {
    try {
      return await chromium.launch({
        headless: true,
        executablePath: chromePath,
      });
    } catch (err) {
      // Continue to other fallbacks
    }
  }

  const launchOptions = {
    headless: true,
    channel: 'chrome',
  };

  try {
    return await chromium.launch(launchOptions);
  } catch (err) {
    // Try standard chromium
    return await chromium.launch({ headless: true });
  }
}

/**
 * Helper to normalize hex colors for comparison
 */
export function normalizeHex(colorStr) {
  if (!colorStr) return '';
  colorStr = colorStr.trim().toLowerCase();
  
  if (colorStr.startsWith('rgb')) {
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
  }
  
  if (colorStr.startsWith('#')) {
    if (colorStr.length === 4) {
      return `#${colorStr[1]}${colorStr[1]}${colorStr[2]}${colorStr[2]}${colorStr[3]}${colorStr[3]}`;
    }
    return colorStr.slice(0, 7);
  }
  
  return colorStr;
}
