// hooks/useNodeData.js
import { useCallback } from 'react';
import { useStore } from '../store/pipelineStore';

/**
 * Custom hook for managing node data with Zustand store
 * @param {string} nodeId - The ID of the node
 * @returns {Object} - Node data and update function
 */
export const useNodeData = (nodeId) => {
    const updateNodeField = useStore((state) => state.updateNodeField);
    const nodes = useStore((state) => state.nodes);

    const nodeData = nodes.find(node => node.id === nodeId)?.data || {};

    const updateField = useCallback((fieldName, fieldValue) => {
        updateNodeField(nodeId, fieldName, fieldValue);
    }, [nodeId, updateNodeField]);

    return {
        data: nodeData,
        updateField,
    };
};
