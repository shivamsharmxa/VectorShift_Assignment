// components/common/SubmitButton.js

import { useState } from 'react';
import { useStore } from '../../store/pipelineStore';
import { ResultModal } from './ResultModal';
import { usePipelineAPI } from '../../hooks';
import { API_BASE_URL } from '../../utils';

export const SubmitButton = () => {
    const [showModal, setShowModal] = useState(false);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const { loading, result, analyzePipeline } = usePipelineAPI();

    const handleSubmit = async () => {
        try {
            await analyzePipeline(nodes, edges);
            setShowModal(true);
        } catch (error) {
            alert(
                `❌ Error Analyzing Pipeline\n\n` +
                `${error.message}\n\n` +
                `Please ensure:\n` +
                `• Backend is running on ${API_BASE_URL}\n` +
                `• CORS is properly configured`
            );
        }
    };

    return (
        <>
            <div className="submit-container">
                <button
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Analyzing...
                        </>
                    ) : (
                        'Submit Pipeline'
                    )}
                </button>
            </div>

            {result && (
                <ResultModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    result={result}
                />
            )}
        </>
    );
};
