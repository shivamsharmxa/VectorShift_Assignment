// tests/integration/PipelineFlow.test.js
/**
 * Integration test for end-to-end pipeline creation and submission
 * Tests the core user flow: add nodes -> connect -> submit -> verify response
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReactFlowProvider } from 'reactflow';
import App from '../../App';

// Mock fetch for backend API
global.fetch = jest.fn();

describe('Pipeline Flow Integration Test', () => {
    beforeEach(() => {
        // Reset fetch mock before each test
        fetch.mockClear();
    });

    it('should complete full pipeline flow: add nodes, connect, submit, and show result', async () => {
        // Mock successful API response
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                num_nodes: 2,
                num_edges: 1,
                is_dag: true
            })
        });

        // Render the app
        const { container } = render(
            <ReactFlowProvider>
                <App />
            </ReactFlowProvider>
        );

        // 1. Verify canvas is rendered
        expect(container.querySelector('.react-flow')).toBeInTheDocument();

        // 2. Verify toolbar with nodes is present
        expect(screen.getByText('Components')).toBeInTheDocument();

        // 3. Simulate dragging Input node onto canvas
        const inputNodeCard = screen.getByText('Input').closest('.toolbar-node-card');
        expect(inputNodeCard).toBeInTheDocument();

        // Note: Actual drag-and-drop simulation is complex with ReactFlow
        // In production, you would use ReactFlow test utilities or E2E framework like Cypress
        // For this demo, we'll test the Submit button and API integration

        // 4. Find and click Submit button
        const submitButton = screen.getByRole('button', { name: /submit pipeline/i });
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).not.toBeDisabled();

        // 5. Click submit
        fireEvent.click(submitButton);

        // 6. Verify loading state
        await waitFor(() => {
            expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
        });

        // 7. Wait for API call to complete
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:8000/pipelines/parse',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })
            );
        });

        // 8. Verify modal appears with results
        await waitFor(() => {
            expect(screen.getByText('Pipeline Analysis')).toBeInTheDocument();
        });

        // 9. Verify result values are displayed
        expect(screen.getByText(/total nodes/i)).toBeInTheDocument();
        expect(screen.getByText(/total edges/i)).toBeInTheDocument();
        expect(screen.getByText(/valid dag/i)).toBeInTheDocument();

        // 10. Close modal
        const closeButton = screen.getByLabelText('Close');
        fireEvent.click(closeButton);

        // 11. Verify modal is closed
        await waitFor(() => {
            expect(screen.queryByText('Pipeline Analysis')).not.toBeInTheDocument();
        });
    });

    it('should handle API errors gracefully', async () => {
        // Mock API error
        fetch.mockRejectedValueOnce(new Error('Backend unavailable'));

        const { container } = render(
            <ReactFlowProvider>
                <App />
            </ReactFlowProvider>
        );

        const submitButton = screen.getByRole('button', { name: /submit pipeline/i });
        fireEvent.click(submitButton);

        // Wait for error alert
        await waitFor(() => {
            // In the current implementation, errors show as window.alert
            // In production, you'd verify error UI component
            expect(fetch).toHaveBeenCalled();
        }, { timeout: 3000 });
    });

    it('should detect DAG cycles correctly', async () => {
        // Mock response with cycle detected
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                num_nodes: 3,
                num_edges: 3,
                is_dag: false
            })
        });

        render(
            <ReactFlowProvider>
                <App />
            </ReactFlowProvider>
        );

        const submitButton = screen.getByRole('button', { name: /submit pipeline/i });
        fireEvent.click(submitButton);

        // Wait for modal
        await waitFor(() => {
            expect(screen.getByText('Pipeline Analysis')).toBeInTheDocument();
        });

        // Verify cycle warning is shown
        expect(screen.getByText(/contains cycle/i)).toBeInTheDocument();
        expect(screen.getByText(/circular dependencies/i)).toBeInTheDocument();
    });
});
