// utils/logger.js
// Centralized logging utility

export const logger = {
    error: (message, error) => {
        if (process.env.NODE_ENV === 'development') {
            console.error(message, error);
        }
        // In production, this could send to error tracking service (Sentry, LogRocket, etc.)
    },

    info: (message, data) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(message, data);
        }
    },

    warn: (message, data) => {
        if (process.env.NODE_ENV === 'development') {
            console.warn(message, data);
        }
    },
};
