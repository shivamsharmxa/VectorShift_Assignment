// config.js
// Centralized configuration

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const APP_CONFIG = {
    defaultNodeWidth: 240,
    minNodeWidth: 240,
    maxNodeWidth: 600,
    defaultNodeHeight: 150,
    textNodeCharWidth: 8, // Approximate character width for dynamic sizing
};
