// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();

            // Display results in a user-friendly alert
            const dagStatus = data.is_dag ? '✓ Yes' : '✗ No';
            alert(
                `Pipeline Analysis:\n\n` +
                `• Total Nodes: ${data.num_nodes}\n` +
                `• Total Edges: ${data.num_edges}\n` +
                `• Is DAG: ${dagStatus}`
            );
        } catch (error) {
            console.error('Error:', error);
            alert('Error analyzing pipeline. Please ensure the backend is running.');
        }
    };

    return (
        <div className="submit-container">
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}
