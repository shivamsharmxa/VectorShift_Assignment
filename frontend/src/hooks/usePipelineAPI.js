// hooks/usePipelineAPI.js
import { useState } from 'react';
import { API_BASE_URL } from '../utils/config';
import { logger } from '../utils/logger';

export const usePipelineAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const analyzePipeline = async (nodes, edges) => {
        if (loading) return null;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
            logger.info('Pipeline analysis completed:', data);

            return data;
        } catch (err) {
            logger.error('Error analyzing pipeline:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setResult(null);
        setError(null);
    };

    return {
        loading,
        error,
        result,
        analyzePipeline,
        reset,
    };
};
